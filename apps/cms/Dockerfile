<<<<<<< HEAD
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies for the Strapi CMS
COPY apps/cms/package.json ./
RUN npm install

# Copy Strapi source
COPY apps/cms ./

# Build the Strapi admin panel
RUN npm run build

FROM node:20-alpine AS runner

=======
# ==========================================
# Stage 1: Builder
# ==========================================
FROM oven/bun:1 AS builder
WORKDIR /app

# Copy root workspace configurations
COPY package.json bun.lock turbo.json ./

# Copy the CMS app and shared internal packages
COPY apps/cms ./apps/cms
COPY packages ./packages

# Install dependencies for the entire workspace
RUN bun install

# Build the Strapi CMS application
RUN bun run build:cms

# ==========================================
# Stage 2: Production Runner
# ==========================================
FROM oven/bun:1 AS runner
>>>>>>> 48f9a7104c8ca6adc9263305a5538e6dda73f3fe
WORKDIR /app

ENV NODE_ENV=production

<<<<<<< HEAD
# Copy built Strapi app from builder
COPY --from=builder /app ./

# Strapi default port
EXPOSE 1337

# Start Strapi
CMD ["npm", "run", "start"]

=======
# Copy necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/cms ./apps/cms
COPY --from=builder /app/packages ./packages

# Set the working directory to the CMS app for runtime
WORKDIR /app/apps/cms

EXPOSE 1337

# Start the Strapi production server
CMD ["bun", "run", "start"]
>>>>>>> 48f9a7104c8ca6adc9263305a5538e6dda73f3fe
