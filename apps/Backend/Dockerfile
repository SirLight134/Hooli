FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy dependency manifests first (for Docker layer caching)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/shared/package.json ./packages/shared/

# Install ALL dependencies (including devDependencies needed for build)
RUN pnpm install --frozen-lockfile

# Copy source code for backend and shared package
COPY apps/backend ./apps/backend
COPY packages/shared ./packages/shared

# Build the backend (turbo resolves dependencies automatically)
RUN pnpm run build --filter @hooli/backend

# ---- Production stage ----
FROM node:22-alpine

ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy built artifacts
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json ./

# Copy shared package (needed at runtime for workspace resolution)
COPY --from=builder /app/packages/shared ./packages/shared

# Copy root workspace config
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./

# Install ONLY production dependencies
RUN pnpm install --frozen-lockfile --prod

EXPOSE 3000

CMD ["node", "dist/server.js"]
