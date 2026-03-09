# Strapi CMS Type Generation

Auto-generates TypeScript types from Strapi component and content type schemas so frontend developers don't have to write or maintain types manually.

---

## How It Works

The generator script reads two sources:

- `apps/cms/src/components/**/*.json` — Strapi component schemas (e.g. `blocks.hero-section`)
- `apps/cms/src/api/**/content-types/**/schema.json` — Strapi page/content type schemas (e.g. `homepage`)

It outputs a single file: `apps/cms/types/strapi-components.ts`

This file is exposed to the web app via the `cms` workspace package.

---

## Regenerating Types

Run this from inside `apps/cms`:

```bash
bun run generate-types
```

Or from the monorepo root:

```bash
turbo run generate-types --filter=cms
```

> ⚠️ Do **not** edit `apps/cms/types/strapi-components.ts` manually. It will be overwritten the next time the script runs.

---

## Using Types in the Web App

The `cms` package is linked as a workspace dependency in `apps/web/package.json`:

```json
{
  "dependencies": {
    "cms": "workspace:*"
  }
}
```

Import types directly in any web file:

```ts
import type {
  HomepageData,
  StrapiHeroSection,
  StrapiMedia,
  StrapiFaQs,
} from 'cms/types';
```

---

## Type Reference

### Shared Types

| Type | Description |
|------|-------------|
| `StrapiMedia` | Shared media/image type with `url`, `alternativeText`, `width`, `height` |

### Component Types

Generated from `apps/cms/src/components/`. Each component gets a `Strapi`-prefixed type name derived from its `displayName`.

| Schema file | Generated type |
|-------------|---------------|
| `blocks/hero-section.json` | `StrapiHeroSection` |
| `blocks/about-us.json` | `StrapiAboutUs` |
| `blocks/cards.json` | `StrapiCards` |
| `blocks/fa-qs.json` | `StrapiFaQs` |
| `blocks/sub-preview.json` | `StrapiSubPreview` |
| `blocks/banner.json` | `StrapiBanner` |
| `blocks/highlights.json` | `StrapiHighlights` |
| `blocks/feedback.json` | `StrapiFeedback` |
| `blocks/contact-us.json` | `StrapiContactUs` |
| `blocks/sub-contacts.json` | `StrapiSubContacts` |
| `elements/link.json` | `StrapiLink` |
| `elements/logo.json` | `StrapiLogo` |
| `elements/item.json` | `StrapiItem` |
| `elements/text.json` | `StrapiText` |

### Page Data Types

Generated from `apps/cms/src/api/`. Each content type gets a `Data`-suffixed type name.

| Content type | Generated type |
|--------------|---------------|
| `homepage` | `HomepageData` |
| `about-us-page` | `AboutUsPageData` |
| `brightline-page` | `BrightlinePageData` |
| `build-master-page` | `BuildMasterPageData` |
| `careers-page` | `CareersPageData` |
| `contact-us-page` | `ContactUsPageData` |
| `paluto-page` | `PalutoPageData` |
| `sari-sari-manokan-page` | `SariSariManokanPageData` |
| `watergate-page` | `WatergatePageData` |
| `article` | `ArticleData` |

> System fields (`createdAt`, `updatedAt`, `publishedAt`, `createdBy`, `updatedBy`, `locale`, `localizations`) are automatically excluded from page data types.

---

## Example Usage

### Page component

```tsx
import { getHomepage } from '@/lib/services/strapi-homepage';
import type { HomepageData, StrapiHeroSection, StrapiFaQs } from 'cms/types';

export default async function Page() {
  const data: HomepageData = await getHomepage();

  const hero = (data.HeroSection || []) as StrapiHeroSection[];
  const faqs = (data.FAQs || []) as StrapiFaQs[];

  return (
    <main>
      {hero.map((item) => (
        <h1 key={item.id}>{item.title}</h1>
      ))}

      {faqs.map((faq) => (
        <details key={faq.id}>
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </main>
  );
}
```

### Accessing nested media

Component fields that reference other components (e.g. `logo` in `StrapiHeroSection`) are typed as their own component type, not `StrapiMedia` directly. Access media through the nested component:

```ts
// ✅ Correct — logo is StrapiLogo, image is nested inside
item.logo?.image?.url

// ❌ Wrong — logo is not StrapiMedia
item.logo?.url
```

### Other Ways to Access Data

Beyond `.map()`, here are common patterns depending on your use case:

**Direct index access** — when a section only ever has one entry:
```tsx
const hero = data.HeroSection?.[0];

<h1>{hero?.title}</h1>
<p>{hero?.description}</p>
```

**Destructuring** — cleaner when you need multiple fields at once:
```tsx
const { title, description, image, cta } = data.HeroSection?.[0] ?? {};
```

**find()** — when you need a specific item by a field value:
```tsx
const featuredFaq = data.FAQs?.find((faq) => faq.question === 'What is QGC?');
```

**filter()** — when you only want a subset of items:
```tsx
const itemsWithImages = data.Achievements?.filter((item) => item.image?.url);
```

**Nullish coalescing for fallbacks** — pairing with optional chaining:
```tsx
const title = data.HeroSection?.[0]?.title ?? 'Default Title';
```

**Early return pattern** — extract and guard at the top so JSX stays clean:
```tsx
const hero = data.HeroSection?.[0];
const faqs = data.FAQs ?? [];

if (!hero) return <p>No hero content.</p>;

return (
  <main>
    <h1>{hero.title}</h1>
    {faqs.map((faq) => (
      <details key={faq.id}>
        <summary>{faq.question}</summary>
        <p>{faq.answer}</p>
      </details>
    ))}
  </main>
);
```

> For most Strapi single-type pages (like the homepage), **direct index + destructuring** is the cleanest approach since each section typically has one entry. Reserve `.map()` for truly repeatable content like FAQs, cards, and previews.

---
