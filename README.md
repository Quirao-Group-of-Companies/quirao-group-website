# Quirao Group of Companies Website

This repository contains the source code of the QGC website.


## Prerequisites
Before you can set up, you must have the following prerequisites:

- [NodeJS](https://nodejs.org/en/download)
- [Bun](https://bun.com/docs/installation)

## 🏗 Project Structure
- `apps/web`: Next.js frontend.
- `apps/cms`: Strapi headless CMS.


## Setup
To set the development repository:

```bash
git clone <REPOSITORY-URL>
cd quirao-group-website/
bun install # Install necessary dependencies
bun run build:web # To ensure that you do not have issues in building the application
```

To run the application:
```bash
bun run dev:web # To start the dev environment of the website
bun run dev:cms # To start the Strapi CMS
```

When developing, before you push, always apply checks and build the app locally via:
```bash
bun run check:web
# TODO: Add checking for cms
```

## Development
This section contains guidelines for development.

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
> The sample code above are from documentation to save you a click or two.