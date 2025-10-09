FROM node:20-alpine

WORKDIR /app

# 🧩 Instalamos utilidades necesarias (incluye pg_isready)
RUN apk add --no-cache postgresql-client

# Copiamos dependencias primero (para aprovechar caché)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copiamos todo el código fuente
COPY . .

# Variables de entorno
ENV DATABASE_URL=postgresql://devhub:devhubpass@db:5432/devhub_db
ENV JWT_SECRET=supersecretkey
ENV PORT=3000

# Generamos Prisma Client dentro del contenedor
RUN npx prisma generate

# Compilamos NestJS
RUN yarn build

EXPOSE 3000

# Comando de inicio
CMD ["yarn", "start:prod"]
