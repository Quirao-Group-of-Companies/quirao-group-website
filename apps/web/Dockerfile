# ==========================================
# Stage 1: Builder
# ==========================================
FROM oven/bun:1.3.8 AS builder
WORKDIR /app

# Copy root workspace configurations
COPY package.json bun.lock turbo.json ./

# Copy the web app and shared internal packages
COPY apps/web ./apps/web
COPY packages ./packages

# Install dependencies for the entire workspace
# --frozen-lockfile ensures we strictly use bun.lock
RUN bun install --frozen-lockfile

# Build the Next.js web application
# This triggers the turbo pipeline script defined in your root package.json
RUN bun run build:web

# ==========================================
# Stage 2: Production Runner
# ==========================================
FROM oven/bun:1 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy necessary files from the builder stage
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static

EXPOSE 3000

# Start the Next.js production server, as recommended by NextJS
CMD ["node", "apps/web/server.js"]