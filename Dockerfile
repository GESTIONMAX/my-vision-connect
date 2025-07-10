# Stage 1 - Build
FROM node:18-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source files
COPY . .

# Set environment variables from build args (will be provided by Coolify)
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_KEY
ARG WORDPRESS_CLIENT_KEY
ARG WORDPRESS_CLIENT_SECRET
ARG WOOCOMMERCE_CONSUMER_KEY

# Build the application
RUN npm run build

# Stage 2 - Production
FROM nginx:alpine

# Copy built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
