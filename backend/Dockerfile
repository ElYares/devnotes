FROM node:20-alpine

WORKDIR /app

# Copiamos dependencias primero (para aprovechar caché)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copiamos todo el código fuente
COPY . .

# Inyectamos la variable de conexión directamente
ENV DATABASE_URL=postgresql://devhub:devhubpass@db:5432/devhub_db
ENV JWT_SECRET=supersecretkey
ENV PORT=3000

# Compilamos el proyecto NestJS
RUN yarn build

EXPOSE 3000

# Comando de inicio en producción
CMD ["yarn", "start:prod"]
