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