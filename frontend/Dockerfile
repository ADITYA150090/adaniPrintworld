# Use Node.js 20 (or higher)
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Copy package files and install dependencies (includes devDependencies)
COPY package*.json ./
RUN npm ci

# Copy all frontend source code
COPY . .

# Build the frontend app
RUN npm run build

# Production image: Use nginx to serve the build output
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copy build output from build stage
COPY --from=build /usr/src/app/dist .

# Expose port 80
EXPOSE 80

# nginx starts automatically
