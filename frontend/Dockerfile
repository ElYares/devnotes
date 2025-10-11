# Etapa de build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos todo de una vez (para no romper el lockfile actualizado)
COPY . .

# Instalamos dependencias
RUN npm ci

# Compilamos la app Next.js (Tailwind 4 se ejecuta automáticamente)
RUN npm run build

# Etapa de ejecución
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src/app/globals.css ./src/app/globals.css

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["npm", "start"]
