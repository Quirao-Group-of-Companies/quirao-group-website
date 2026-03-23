import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── CONFIG ────────────────────────────────────────────────────────────────
const COMPONENTS_ROOT = path.resolve(__dirname, '../src/components');
const API_ROOT = path.resolve(__dirname, '../src/api');
const OUTPUT_FILE = path.resolve(__dirname, '../../web/src/lib/services/strapi-services.ts');
// ───────────────────────────────────────────────────────────────────────────

// ─── TYPES ─────────────────────────────────────────────────────────────────

interface StrapiAttribute {
  type: string;
  required?: boolean;
  repeatable?: boolean;
  multiple?: boolean;
  component?: string;
  relation?: string;
  target?: string;
  allowedTypes?: string[];
  enum?: string[];
  singularName?: string;
}

interface StrapiSchema {
  collectionName: string;
  info: {
    displayName: string;
    singularName?: string;
    pluralName?: string;
    icon?: string;
  };
  kind?: string; // "singleType" | "collectionType"
  attributes: Record<string, StrapiAttribute>;
  _componentKey?: string;
  _apiSlug?: string; // e.g. "paluto-page"
}

// ─── HELPERS ───────────────────────────────────────────────────────────────

function toPascalCase(str: string): string {
  return str
    .replace(/[-_./]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

const SYSTEM_FIELDS = new Set([
  'createdAt',
  'updatedAt',
  'publishedAt',
  'createdBy',
  'updatedBy',
  'locale',
  'localizations',
]);

// ─── POPULATE BUILDER ──────────────────────────────────────────────────────

/**
 * Recursively builds a populate object for a set of attributes.
 * Media fields → true
 * Component fields → recurse into component schema
 * Scalar fields → skipped (not needed in populate)
 */
function buildPopulate(
  attributes: Record<string, StrapiAttribute>,
  allComponentSchemas: Map<string, StrapiSchema>,
  depth: number = 0,
): Record<string, unknown> | null {
  const populate: Record<string, unknown> = {};
  let hasAny = false;

  for (const [fieldName, attr] of Object.entries(attributes)) {
    if (SYSTEM_FIELDS.has(fieldName)) {
      continue;
    }

    if (attr.type === 'media') {
      populate[fieldName] = true;
      hasAny = true;
    } else if (attr.type === 'component' && attr.component) {
      const refSchema = allComponentSchemas.get(attr.component);
      if (refSchema && depth < 3) {
        const nested = buildPopulate(refSchema.attributes, allComponentSchemas, depth + 1);
        if (nested && Object.keys(nested).length > 0) {
          populate[fieldName] = { populate: nested };
        } else {
          populate[fieldName] = true;
        }
      } else {
        populate[fieldName] = true;
      }
      hasAny = true;
    } else if (attr.type === 'relation') {
      populate[fieldName] = true;
      hasAny = true;
    }
  }

  return hasAny ? populate : null;
}

/**
 * Serializes a populate object into a formatted TypeScript object literal string.
 */
function serializePopulate(obj: Record<string, unknown>, indent: number = 4): string {
  const pad = ' '.repeat(indent);
  const outerPad = ' '.repeat(indent - 2);
  const lines: string[] = ['{'];

  for (const [key, val] of Object.entries(obj)) {
    if (val === true) {
      lines.push(`${pad}${key}: true,`);
    } else if (typeof val === 'object' && val !== null && 'populate' in val) {
      const nested = (val as { populate: Record<string, unknown> }).populate;
      lines.push(`${pad}${key}: {`);
      lines.push(`${pad}  populate: ${serializePopulate(nested, indent + 4)},`);
      lines.push(`${pad}},`);
    }
  }

  lines.push(`${outerPad}}`);
  return lines.join('\n');
}

// ─── SERVICE FUNCTION GENERATOR ────────────────────────────────────────────

function generateServiceFunction(
  schema: StrapiSchema,
  allComponentSchemas: Map<string, StrapiSchema>,
): string {
  const fnName = `get${toPascalCase(schema.info.displayName)}`;
  const typeName = `${toPascalCase(schema.info.displayName)}Data`;
  const apiSlug =
    schema._apiSlug ?? schema.info.singularName ?? toCamelCase(schema.info.displayName);
  const populate = buildPopulate(schema.attributes, allComponentSchemas);
  const lines: string[] = [];

  lines.push(`/** Auto-generated service for: ${schema.info.displayName} */`);
  lines.push(`export async function ${fnName}(): Promise<${typeName} | null> {`);

  if (populate && Object.keys(populate).length > 0) {
    lines.push(`  const query = qs.stringify(`);
    lines.push(`    {`);
    lines.push(`      populate: ${serializePopulate(populate, 8)},`);
    lines.push(`    },`);
    lines.push(`    { encodeValuesOnly: true },`);
    lines.push(`  );`);
    lines.push(``);
    lines.push(`  const res = await fetch(\`\${STRAPI_URL}/api/${apiSlug}?\${query}\`, {`);
  } else {
    lines.push(`  const res = await fetch(\`\${STRAPI_URL}/api/${apiSlug}\`, {`);
  }

  lines.push(`    headers: {`);
  lines.push(`      Authorization: \`Bearer \${STRAPI_TOKEN}\`,`);
  lines.push(`    },`);
  lines.push(`    next: { revalidate: 60 },`);
  lines.push(`  } as RequestInit);`);
  lines.push(``);
  lines.push(`  if (!res.ok) {`);
  lines.push(`    const errorData = await res.json().catch(() => ({}));`);
  lines.push(`    console.error('Strapi Fetch Error [${schema.info.displayName}]:', errorData);`);
  lines.push(
    `    throw new Error(\`Failed to fetch ${schema.info.displayName}: \${res.status}\`);`,
  );
  lines.push(`  }`);
  lines.push(``);
  lines.push(`  const json = await res.json();`);
  lines.push(`  return json.data as ${typeName};`);
  lines.push(`}`);

  return lines.join('\n');
}

// ─── FILE SCANNERS ─────────────────────────────────────────────────────────

async function findComponentSchemas(dir: string): Promise<Array<{ file: string; key: string }>> {
  const results: Array<{ file: string; key: string }> = [];

  if (!existsSync(dir)) {
    console.error(`❌ Components directory not found: ${dir}`);
    process.exit(1);
  }

  const categories = await readdir(dir, { withFileTypes: true });
  for (const category of categories) {
    if (!category.isDirectory()) {
      continue;
    }
    const categoryPath = path.join(dir, category.name);
    const files = await readdir(categoryPath, { withFileTypes: true });
    for (const file of files) {
      if (!file.isFile() || !file.name.endsWith('.json')) {
        continue;
      }
      const name = file.name.replace('.json', '');
      const key = `${category.name}.${name}`;
      results.push({ file: path.join(categoryPath, file.name), key });
    }
  }

  return results;
}

async function findContentTypeSchemas(dir: string): Promise<Array<{ file: string; slug: string }>> {
  const results: Array<{ file: string; slug: string }> = [];

  if (!existsSync(dir)) {
    console.error(`❌ API directory not found: ${dir}`);
    process.exit(1);
  }

  async function walk(current: string): Promise<void> {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (
        entry.isFile() &&
        entry.name === 'schema.json' &&
        current.includes('content-types')
      ) {
        // Derive slug from the api folder name e.g. apps/cms/src/api/paluto-page/...
        const parts = fullPath.split(path.sep);
        const apiIndex = parts.lastIndexOf('api');
        const slug = apiIndex !== -1 ? parts[apiIndex + 1] : '';
        results.push({ file: fullPath, slug });
      }
    }
  }

  await walk(dir);
  return results;
}

// ─── MAIN ──────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('🔍 Scanning Strapi schemas for service generation...');
  console.log(`   Components: ${COMPONENTS_ROOT}`);
  console.log(`   API:        ${API_ROOT}`);
  console.log(`   Output:     ${OUTPUT_FILE}\n`);

  // ── 1. Load component schemas ──
  const componentFiles = await findComponentSchemas(COMPONENTS_ROOT);
  const allComponentSchemas = new Map<string, StrapiSchema>();

  console.log(`📦 Found ${componentFiles.length} component schema(s)`);
  for (const { file, key } of componentFiles) {
    const raw = await readFile(file, 'utf-8');
    const schema: StrapiSchema = JSON.parse(raw);
    schema._componentKey = key;
    allComponentSchemas.set(key, schema);
  }

  // ── 2. Load content type schemas ──
  const contentTypeFiles = await findContentTypeSchemas(API_ROOT);
  const allPageSchemas: StrapiSchema[] = [];

  console.log(`📄 Found ${contentTypeFiles.length} content type schema(s)`);
  for (const { file, slug } of contentTypeFiles) {
    const raw = await readFile(file, 'utf-8');
    const schema: StrapiSchema = JSON.parse(raw);
    schema._apiSlug = slug;
    allPageSchemas.push(schema);
    console.log(`   ✓ ${schema.info.displayName} → get${toPascalCase(schema.info.displayName)}()`);
  }

  // ── 3. Build service file ──
  const typeImports = allPageSchemas
    .map((s) => `  ${toPascalCase(s.info.displayName)}Data,`)
    .join('\n');

  const banner = `/**
 * ⚠️  AUTO-GENERATED — DO NOT EDIT MANUALLY
 * Source: apps/cms/scripts/generate-services.ts
 * Regenerate: bun run generate-services (from apps/cms)
 * Generated: ${new Date().toISOString()}
 */

`;

  const header = `import qs from 'qs';
import type {
${typeImports}
} from '../../types/strapi-types';

const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;
`;

  const serviceFunctions = allPageSchemas
    .map((schema) => generateServiceFunction(schema, allComponentSchemas))
    .join('\n\n');

  // ── 4. Write file ──
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  await writeFile(
    OUTPUT_FILE,
    `${banner + header}\n//·───·Services·${'─'.repeat(58)}\n\n${serviceFunctions}\n`,
    'utf-8',
  );

  console.log(`\n✅ Done!`);
  console.log(`   ${allPageSchemas.length} service function(s) generated`);
  console.log(`   → ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error('❌ Service generation failed:', err);
  process.exit(1);
});
