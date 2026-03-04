# ==========================================
# Stage 1: Builder
# ==========================================
FROM oven/bun:1.3.8 AS builder
WORKDIR /app

# Copy root workspace configurations
COPY package.json bun.lock turbo.json ./

# Copy the CMS app and shared internal packages
COPY apps/cms ./apps/cms
COPY packages ./packages

# Install dependencies for the entire workspace
RUN bun install --frozen-lockfile

# Build the Strapi CMS application
RUN bun run build:cms

# ==========================================
# Stage 2: Production Runner
# ==========================================
FROM oven/bun:1 AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/cms ./apps/cms
COPY --from=builder /app/packages ./packages

# Set the working directory to the CMS app for runtime
WORKDIR /app/apps/cms

EXPOSE 1337

# Start the Strapi production server
CMD ["bun", "run", "start"]