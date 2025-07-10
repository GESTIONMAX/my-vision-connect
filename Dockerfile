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

# Create nginx config directly in the image
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Gestion des erreurs \
    error_page 404 /index.html; \
    error_page 500 502 503 504 /index.html; \
    \
    # Configuration des en-têtes pour la sécurité \
    add_header X-Frame-Options "SAMEORIGIN"; \
    add_header X-XSS-Protection "1; mode=block"; \
    add_header X-Content-Type-Options "nosniff"; \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
