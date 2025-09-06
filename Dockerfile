# syntax=docker/dockerfile:1
FROM node:22.17.0-slim AS base

ARG PNPM_VERSION=10.12.4

WORKDIR /app

RUN apt-get update && apt-get install --no-install-recommends -y openssl
RUN npm install -g pnpm@$PNPM_VERSION

FROM base AS build

COPY --link package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

# Generate Prisma Client
COPY --link prisma ./prisma
RUN pnpm prisma generate

# Copy application code
COPY --link . .

# Build application
RUN pnpm run build

# Remove development dependencies
RUN pnpm prune --prod

# Final stage for app image
FROM base

LABEL fly_launch_runtime="Remix"

# Set production environment
ENV NODE_ENV="production"

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

COPY --from=build /app /app

EXPOSE 3000
CMD [ "pnpm", "run", "start" ]