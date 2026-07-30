# Stage 1: Build Frontend (Client)
FROM node:26-alpine AS build-client
WORKDIR /app/Client

COPY Client/package*.json ./
RUN npm ci

COPY Client/ ./
RUN npm run build

# Stage 2: Install Backend Dependencies & Prepare Server
FROM node:26-alpine AS build-server
WORKDIR /app/Server

COPY Server/package*.json ./
COPY Server/.api ./.api
RUN npm ci --ignore-scripts --omit=dev

COPY Server/ ./

# Stage 3: Production Runner
FROM node:26-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY --from=build-server /app/Server ./Server
COPY --from=build-client /app/Client/dist ./Client/dist

EXPOSE 8080

CMD ["node", "Server/src/server.js"]
