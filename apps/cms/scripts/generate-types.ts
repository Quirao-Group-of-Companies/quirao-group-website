#!/usr/bin/env bun
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── CONFIG ────────────────────────────────────────────────────────────────
const COMPONENTS_ROOT = path.resolve(__dirname, '../src/components');
const API_ROOT = path.resolve(__dirname, '../src/api');
const OUTPUT_FILE = path.resolve(__dirname, '../../web/src/types/strapi-types.ts');
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
}

interface StrapiSchema {
  collectionName: string;
  info: {
    displayName: string;
    icon?: string;
  };
  attributes: Record<string, StrapiAttribute>;
  _componentKey?: string;
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

function getComponentTypeName(schema: StrapiSchema): string {
  return `Strapi${toPascalCase(schema.info.displayName)}`;
}

function getPageTypeName(schema: StrapiSchema): string {
  return `${toPascalCase(schema.info.displayName)}Data`;
}

// Private Strapi system fields to exclude from page types
const SYSTEM_FIELDS = new Set([
  'createdAt',
  'updatedAt',
  'publishedAt',
  'createdBy',
  'updatedBy',
  'locale',
  'localizations',
]);

// ─── ATTRIBUTE TYPE MAPPING ────────────────────────────────────────────────

function mapAttributeType(
  attr: StrapiAttribute,
  allComponentSchemas: Map<string, StrapiSchema>,
): string {
  switch (attr.type) {
    case 'string':
    case 'text':
    case 'richtext':
    case 'email':
    case 'password':
    case 'uid':
      return 'string';

    case 'integer':
    case 'biginteger':
    case 'float':
    case 'decimal':
      return 'number';

    case 'boolean':
      return 'boolean';

    case 'date':
    case 'datetime':
    case 'time':
      return 'string';

    case 'json':
      return 'Record<string, unknown>';

    case 'enumeration':
      if (attr.enum && attr.enum.length > 0) {
        return attr.enum.map((v) => `"${v}"`).join(' | ');
      }
      return 'string';

    case 'media':
      return attr.multiple ? 'StrapiMedia[]' : 'StrapiMedia';

    case 'component': {
      if (!attr.component) {
        return 'unknown';
      }
      const refSchema = allComponentSchemas.get(attr.component);
      const refTypeName = refSchema
        ? getComponentTypeName(refSchema)
        : `Strapi${toPascalCase(attr.component.split('.').pop() ?? attr.component)}`;
      return attr.repeatable ? `${refTypeName}[]` : refTypeName;
    }

    case 'dynamiczone':
      return 'unknown[]';

    case 'relation':
      return 'number | null';

    default:
      return 'unknown';
  }
}

// ─── TYPE BLOCK GENERATORS ─────────────────────────────────────────────────

function generateComponentTypeBlock(
  schema: StrapiSchema,
  allComponentSchemas: Map<string, StrapiSchema>,
): string {
  const typeName = getComponentTypeName(schema);
  const lines: string[] = [];

  lines.push(`/** Auto-generated from Strapi component: ${schema._componentKey} */`);
  lines.push(`export type ${typeName} = {`);
  lines.push(`  id: number;`);

  for (const [fieldName, attr] of Object.entries(schema.attributes)) {
    const tsType = mapAttributeType(attr, allComponentSchemas);
    const optional = !attr.required ? '?' : '';
    const nullable = !attr.required ? ' | null' : '';
    lines.push(`  ${fieldName}${optional}: ${tsType}${nullable};`);
  }

  lines.push(`};`);
  return lines.join('\n');
}

function generatePageTypeBlock(
  schema: StrapiSchema,
  allComponentSchemas: Map<string, StrapiSchema>,
): string {
  const typeName = getPageTypeName(schema);
  const lines: string[] = [];

  lines.push(`/** Auto-generated from Strapi content type: ${schema.info.displayName} */`);
  lines.push(`export type ${typeName} = {`);

  for (const [fieldName, attr] of Object.entries(schema.attributes)) {
    if (SYSTEM_FIELDS.has(fieldName)) {
      continue;
    }

    const tsType = mapAttributeType(attr, allComponentSchemas);
    const optional = !attr.required ? '?' : '';
    const nullable = !attr.required ? ' | null' : '';
    lines.push(`  ${fieldName}${optional}: ${tsType}${nullable};`);
  }

  lines.push(`};`);
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

async function findContentTypeSchemas(dir: string): Promise<string[]> {
  const results: string[] = [];

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
        results.push(fullPath);
      }
    }
  }

  await walk(dir);
  return results;
}

// ─── MAIN ──────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('🔍 Scanning Strapi schemas...');
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
    console.log(`   ✓ ${key} → ${getComponentTypeName(schema)}`);
  }

  // ── 2. Load content type schemas ──
  const contentTypeFiles = await findContentTypeSchemas(API_ROOT);
  const allPageSchemas: StrapiSchema[] = [];

  console.log(`\n📄 Found ${contentTypeFiles.length} content type schema(s)`);
  for (const file of contentTypeFiles) {
    const raw = await readFile(file, 'utf-8');
    const schema: StrapiSchema = JSON.parse(raw);
    allPageSchemas.push(schema);
    console.log(`   ✓ ${schema.info.displayName} → ${getPageTypeName(schema)}`);
  }

  // ── 3. Build output ──
  const typeBlocks: string[] = [];

  typeBlocks.push(`/** Shared Strapi media type */
export type StrapiMedia = {
  url: string;
  alternativeText: string | null;
  width?: number | null;
  height?: number | null;
  mime?: string;
  name?: string;
};`);

  typeBlocks.push(`// ─── Component Types ${'─'.repeat(54)}`);
  for (const schema of allComponentSchemas.values()) {
    typeBlocks.push(generateComponentTypeBlock(schema, allComponentSchemas));
  }

  typeBlocks.push(`// ─── Page Data Types ${'─'.repeat(53)}`);
  for (const schema of allPageSchemas) {
    typeBlocks.push(generatePageTypeBlock(schema, allComponentSchemas));
  }

  // ── 4. Write file ──
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  const banner = `/**
 * ⚠️  AUTO-GENERATED — DO NOT EDIT MANUALLY
 * Source: apps/cms/scripts/generate-types.ts
 * Regenerate: bun run generate-types (from apps/cms)
 * Generated: ${new Date().toISOString()}
 */

`;

  await writeFile(OUTPUT_FILE, `${banner + typeBlocks.join('\n\n')}\n`, 'utf-8');

  console.log(`\n✅ Done!`);
  console.log(`   ${allComponentSchemas.size} component type(s)`);
  console.log(`   ${allPageSchemas.length} page data type(s)`);
  console.log(`   → ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error('❌ Type generation failed:', err);
  process.exit(1);
});
