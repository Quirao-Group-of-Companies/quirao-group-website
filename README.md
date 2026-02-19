# Quirao Group of Companies Website

This repository contains the source code of the QGC website. It includes details about the company, its contacts, and subsidiaries.

Written by: John Manuel Carado (Intern)

## Prerequisites
Before you can set up, you must have the following prerequisites:

- [NodeJS](https://nodejs.org/en/download) - We recommend to use the LTS version for minimal errors down the line.
- [Bun](https://bun.com/docs/installation)

## 🏗 Project Directory Tree
```bash
quirao-group-website/
├── apps/
│   ├── cms/                         # Strapi Headless CMS (Backend & Admin Panel)
│   └── web/                         # Next.js Frontend (The main website)
│       ├── public/                  # Static assets (images, fonts, icons)
│       └── src/
│           ├── app/                 # Next.js App Router (Pages, layouts, and actions)
│           │   ├── (subsidiaries)/  # Grouped routes for subsidiaries
│           │   ├── about-us/        # About page route
│           │   ├── contact-us/      # Contact page route
│           │   ├── layout.tsx       # Root layout (Shared UI)
│           │   ├── page.tsx         # Homepage
│           │   └── actions.ts       # Server Actions for the web app
│           ├── components/          # Reusable UI components
│           ├── lib/                 # Shared utilities (API clients, helpers)
│           ├── instrumentation.ts   # Axiom / Observability integration
│           └── middleware.ts        # Auth, redirects, or header management
├── packages/                        # Shared internal library packages (UI-kit, config, types)
├── biome.json                       # Fast linting and formatting configuration
├── bun.lock                         # Bun package manager lockfile
├── package.json                     # Root workspace manifest
└── turbo.json                       # Monorepo build pipeline configuration
```

## System Architecture
```
📦 Supabase (PostgreSQL) ⬅️-----------(Migrations/Queries)-----------➡️ 💧 Drizzle ORM
       ↑                                                                    |
       |                                                                    |
       |---(Direct DB Access)---|                                           |
                               ⬇️                                          ⬇️
🚀 Strapi CMS (apps/cms) ⬅️-------REST------➡️ ⚛️ Next.js Web App (apps/web)
   (Single Types: UI Content)                   (Server Actions / App Router)
   (Collection Types: Newsroom)                         /        \
                                                       /          \
      [ External Services ]                           /            \
      📧 Resend (Email Notifications) ⬅️-------------/              \---➡️ 📊 Axiom (Logging)
         (HR Alerts for Forms)                                           (Error Tracking)
                                                                            |
                                                                            |
      [ Developer Experience ]                                              |
      ⚡ Bun (Runtime/Pkg Manager) ----------------➡️ [ Shared Biome Config ]
```

## Setup
To set the development repository:

```bash
git clone <REPOSITORY-URL>

cd quirao-group-website/

bun install # Install necessary dependencies

bun run build:web # To ensure that you do not have issues in building the application
```

To start the development environment of apps:
```bash
bun run dev # For both web and CMS

bun run dev:web # For web only

bun run dev:cms # For CMS only
```
> To learn more about other scripts, see root [`package.json`](https://github.com/Quirao-Group-of-Companies/quirao-group-website/blob/main/package.json).


## Development
This section contains guidelines for development of the website..

### Double Check
Before you push, always build and check locally via:
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

# NOTE: CMS Checking on Github Actions CI is set to `continue-on-error: true`. This tells Github Actions that whatever error it may produce, we must continue. This is to prevent a developer trying to debug Strapi's internal source code.

# Checking in CMS via local might write the changes. If you wish to see possible errors without actually writing the changes, you can run `bun biome check ./apps/cms/`.
```
By following these rules, we ensure that our code will not cause our application to break its build and we ensure it follows conventions.

### Axiom
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