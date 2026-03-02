FROM oven/bun:1.3-alpine AS builder

WORKDIR /app

# Install dependencies at the monorepo root
COPY package.json bun.lock turbo.json ./
COPY apps ./apps
COPY packages ./packages

RUN bun install --frozen-lockfile

# Build only the web app via Turbo
RUN bun run build:web

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output and static assets
# Next.js standalone output in a monorepo typically nests under apps/web
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

WORKDIR /app/apps/web
CMD ["node", "server.js"]

