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

WORKDIR /app

ENV NODE_ENV=production

# Copy built Strapi app from builder
COPY --from=builder /app ./

# Strapi default port
EXPOSE 1337

# Start Strapi
CMD ["npm", "run", "start"]

