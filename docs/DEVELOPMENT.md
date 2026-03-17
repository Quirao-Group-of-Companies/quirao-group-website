# DEVELOPMENT
This file contains the instructions on how to set up this website to run it locally, scripts to take into account, and other relevant matters.

## Prerequisites
Ensure you have the following prerequisites first. These are critical on making the application run locally.
- [NodeJS](https://nodejs.org/en/download) - We recommend to use the LTS version for minimal errors down the line.
- [Bun](https://bun.com/docs/installation) (v1.3.10)

## Running the App
To set the development environment:
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

## Scripts
List of scripts that you may found useful. These are available at the root's `package.json`.
```bash
bun run dev # Runs the development server for all workspaces in the monorepo using Turborepo.

bun run dev:web # Launches the development environment specifically filtered for the **qgc-web** application workspace.

bun run dev:cms # Starts the development server exclusively for the **cms** application using Turborepo filters.

bun run build # Executes the production build pipeline for all applications and packages within the project.

bun run build:web # Compiles and optimizes the **qgc-web** application for production deployment using targeted execution.

bun run build:cms # Runs the production build process specifically for the **cms** application in the monorepo.

bun run format # Applies Biome's fast code formatting across the entire project to ensure visual consistency.

bun run format:cms # Replaces unformatted code with standardized styles specifically within the **apps/cms** directory.

bun run format:web # Formats all source files within the **apps/web** directory using Biome's opinionated engine.

bun run lint # Runs the linting suite across all workspaces to identify and report quality issues.

bun run check:web # Performs linting, formatting, and organization fixes for the **web** 
application in one command.

bun run check:cms # Combines linting and formatting fixes for the **cms** application to ensure code health.

bun run check # Executes a comprehensive project-wide analysis to verify formatting, linting, and best practices.
```