# 1. Etapa de build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# 2. Etapa de producción con Nginx
FROM nginx:stable-alpine
# Borra el contenido por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copia tu configuración de Nginx con fallback a index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia el build estático
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponemos el 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
