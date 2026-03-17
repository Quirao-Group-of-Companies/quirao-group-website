# ARCHITECTURE
This document contains the high-level overview of the project's architecture.

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