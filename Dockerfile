FROM node:18-alpine

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

# Le répertoire dist contient les fichiers statiques
# Coolify saura qu'il faut servir ces fichiers
