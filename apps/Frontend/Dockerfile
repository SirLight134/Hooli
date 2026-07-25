FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy dependency manifests first (for Docker layer caching)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/shared/package.json ./packages/shared/

# Install ALL dependencies (including devDependencies needed for build)
RUN pnpm install --frozen-lockfile

# Copy source code for frontend and shared package
COPY apps/frontend ./apps/frontend
COPY packages/shared ./packages/shared

# Build the frontend (turbo resolves dependencies automatically)
RUN pnpm run build --filter @hooli/frontend

# ---- Production stage ----
FROM nginx:alpine

# Copy built static files
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

# Copy nginx config with API proxy to backend
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
