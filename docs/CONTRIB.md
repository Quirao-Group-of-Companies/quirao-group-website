# CONTRIBUTION
This file contains documentation of rules to follow when contributing to the repository.

## Conventional Branches

To maintain a clear relationship between our tasks and our codebase, we follow a naming convention for branches that mirrors our commit types. This helps identify the purpose of a branch at a glance.

```bash
# Format
<type>/<short-description>

# Common Branch Types
feat/      # New features (e.g., feat/google-auth)
fix/       # Bug fixes (e.g., fix/header-overflow)
docs/      # Documentation changes (e.g., docs/api-readme)
refactor/  # Code cleanup/restructuring (e.g., refactor/logic-cleanup)
chore/     # Maintenance or dependencies (e.g., chore/update-deps)

# Guidelines:
# 1. Use lowercase and hyphens (-) for descriptions.
# 2. Branch off from 'main' unless specified otherwise.
# 3. Always keep your branch up to date
```

## Conventional Commits
We follow the Conventional Commits specification to keep our project history clean and meaningful.

Adopting this standard encourages us to categorize and scope down changes, which simplifies code reviews and enables future automated versioning.

Below are the commonly used conventional commits. You can look up the rest of the types online, should you read more about.

```bash
# Template
<type>[optional scope]: <commit desc>

# Prefixes
feat: A new feature for the user
(e.g., feat(auth): add login via Google).

fix: A bug fix for the user
(e.g., fix(api): resolve timeout on large uploads).

docs: Documentation-only changes
(e.g., docs: update setup instructions in README).

refactor: A code change that neither fixes a bug nor adds a feature (e.g., refactor: simplify validation logic).

# NOTE: These are the most frequent types.
# You can find the full list of prefixes in the
# official documentation if you'd like to learn more.
```

## Verification

Before you push, always verify if it can build and it's linted properly:
```bash
# For web and CMS related changes
bun run check
bun run build

# For web-related changes
bun run check:web
bun run build:web

# For CMS related changes
bun run check:cms
bun run build:cms
```

By following these rules, we ensure that our code will not cause our application to break its build and we ensure it follows conventions.

## Axiom

Axiom is our observability platform used to capture, store, and analyze logs and performance metrics. To keep the codebase clean, we use a "zero-code" infrastructure-level capture via Instrumentation, but manual logging is available for complex logic.

I encourage you devs to use Axiom on important functions and components.

For Client side components, you can use the template code:

```ts
"use client";
import { useLogger } from "@/lib/axiom/client";

export default function ClientComponent() {
  const log = useLogger();
  log.debug("User logged in", { userId: 42 });
  const handleClick = () => log.info("User logged out");
  return (
    <div>
      <h1>Logged in</h1>
      <button onClick={handleClick}>Log out</button>
    </div>
  );
}
```

For Server side components, you can use the template code:

```ts
"use client";
import { logger } from "@/lib/axiom/server";
import { after } from "next/server";

export default async function ServerComponent() {
  log.info("User logged in", { userId: 42 });

  after(() => {
    logger.flush();
  });

  return <h1>Logged in</h1>;
}
```

> The sample code above are from the official documentation of Axiom to save you a click or two.

## Strapi

Fetching Data (The Service Layer):
We fetch data on the server. Always use populate=\* in your query parameters to ensure Strapi returns images and relational data.

```tsx
// app/lib/services/strapi-articles.ts
export async function getArticles(slug?: string) {
  const baseUrl = process.env.STRAPI_URL || "http://127.0.0.1:1337";

  // If slug is provided, fetch one; otherwise, fetch all
  const query = slug
    ? `/api/articles?filters[slug][$eq]=${slug}&populate=*`
    : `/api/articles?populate=*`;

  const res = await fetch(`${baseUrl}${query}`);
  const data = await res.json();

  // Strapi v5 returns an array in data.data
  return slug ? data.data[0] : data.data;
}
```

Handling Images:
Strapi provides relative paths (e.g., /uploads/image.png). We use a helper function to construct the full URL and the Next.js <Image /> component for optimization.

```tsx
const getImageUrl = (image: StrapiImage | null) => {
  if (!image?.url) return null;

  // Return as-is if it's already a full URL (e.g., Supabase/S3)
  if (image.url.startsWith("http")) return image.url;

  // Prefix with Strapi URL if it's a local upload
  const host = process.env.STRAPI_URL || "http://127.0.0.1:1337";
  return `${host}${image.url}`;
};
```

For the component:

```Tsx
import Image from "next/image";

// ... inside your component
<Image
  src={getImageUrl(article.cover_image) || "/placeholder.png"}
  alt={article.cover_image?.alternativeText || article.title}
  width={800}
  height={450}
  className="object-cover"
/>
```

Rendering Rich Text (Blocks):
Strapi v5 uses a "Blocks" format for rich text. Use the @strapi/blocks-react-renderer package to render this as HTML.

```tsx
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function ArticlePage({ article }) {
  return (
    <div className="prose">
      {article.content_body ? (
        <BlocksRenderer content={article.content_body} />
      ) : (
        <p>No content available.</p>
      )}
    </div>
  );
}
```

## Search Engine Optimization (SEO)
To make our website optimized for search engines, such as Google, we need to apply specific rules to maximize SEO.

For pages with fixed content you may use the following snippet below:

```tsx
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Your Page Name Here',
  description: 'A brief description about the page.'
}
```

For pages that requires data from the CMS, you may follow the snippet below:
```tsx
export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageData();
  const content = data?.HeroSection?.[0];

  return {
    title: content?.title || 'Default Title',
    description: content?.description || 'Default description.',
  };
}
```

Put the snippets above your page route. And you will likely be frequently applying the latter suggestion. For more details about generating metadata and other configuration options, read [`generateMetadata`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) by Next.js.