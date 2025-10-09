# DevHub — Sistema Personal de Productividad para Desarrolladores

### _Notas técnicas, accesos cifrados y tickets — todo en un solo lugar_

---

## Descripción

**DevHub** es un sistema diseñado para centralizar el conocimiento y flujo de trabajo de un desarrollador.  
Permite:

- **Guardar notas técnicas** en formato Markdown.  
- **Almacenar accesos y credenciales** cifradas (SSH, API keys, etc.).  
- **Registrar y gestionar tickets o tareas** en curso.  

Está construido sobre una arquitectura moderna y escalable, **separando frontend y backend**, totalmente **Dockerizada** para desarrollo y despliegue en **DigitalOcean o cualquier VPS**.

---

## Arquitectura General

```bash
devhub/
├── backend/        # API NestJS (Clean Architecture + Prisma)
├── frontend/       # Interfaz Next.js (Dashboard)
└── docker-compose.yml
```
 **Componentes:**
| Componente | Tecnología | Descripción |
|-------------|-------------|-------------|
| **Frontend** | [Next.js 15](https://nextjs.org/) + TypeScript | Dashboard, CRUD visual de notas, tickets y accesos. |
| **Backend** | [NestJS 10](https://nestjs.com/) + Prisma | API modular con arquitectura limpia (DDD). |
| **Base de Datos** | PostgreSQL 15 | Almacena notas, tickets y credenciales cifradas. |
| **Cache/Sesiones** | Redis 7 *(futuro)* | Cache de consultas y sesiones JWT. |
| **Infraestructura** | Docker + Nginx (proxy) | Contenedores aislados, SSL y despliegue simple. |

---

## Arquitectura Interna (Backend)

El backend sigue el patrón **Clean Architecture + Domain Driven Design (DDD)** para garantizar mantenibilidad y escalabilidad.

```
src/
├── modules/
│   ├── notes/              # Dominio de notas
│   │   ├── domain/         # Entidades y reglas del negocio
│   │   ├── application/    # Casos de uso (servicios)
│   │   ├── infrastructure/ # Repositorios (Prisma)
│   │   └── presentation/   # Controladores (REST/GraphQL)
│   ├── access/
│   ├── tickets/
│   └── users/
├── common/                 # Middlewares, guards, DTOs globales
├── config/                 # Configuración (env, logger, etc.)
└── main.ts
```

---

## Tecnologías principales

| Tipo | Stack |
|------|--------|
| **Lenguaje principal** | TypeScript |
| **Backend** | NestJS + Prisma ORM |
| **Frontend** | Next.js + TailwindCSS |
| **Base de datos** | PostgreSQL |
| **Autenticación** | JWT + bcrypt |
| **Cifrado** | AES-256 (Crypto) |
| **Infraestructura** | Docker + Docker Compose |
| **Entorno productivo** | DigitalOcean / Nginx Reverse Proxy |

---

## Configuración con Docker

### Estructura general
```bash
devhub/
├── backend/
│   ├── Dockerfile
│   └── .env
├── frontend/
│   ├── Dockerfile
│   └── .env
└── docker-compose.yml
```

### Variables de entorno
#### backend/.env
```env
DATABASE_URL=postgresql://devhub:devhubpass@db:5432/devhub_db
JWT_SECRET=supersecretkey
PORT=3000
```

#### frontend/.env
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---
##  Instalación local (Docker)

### Clonar el repositorio
```bash
git clone https://github.com/tuusuario/devhub.git
cd devhub
```

### Construir e iniciar los servicios
```bash
docker compose up -d --build
```

### Verificar servicios
| Servicio | URL | Descripción |
|-----------|-----|-------------|
| **Frontend** | http://localhost:8080 | Dashboard principal |
| **Backend (API)** | http://localhost:3000 | API REST/GraphQL |
| **PostgreSQL** | interno (`db:5432`) | Base de datos del sistema |

---

## Módulos planeados

| Módulo | Descripción | Estado |
|--------|--------------|--------|
| `Notes` | Crear, editar, buscar notas técnicas (Markdown + etiquetas) |  MVP |
| `Access` | Guardar credenciales cifradas (AES) | |
| `Tickets` | Seguimiento de tareas o bugs | |
| `Users` | Autenticación con JWT | |

---

## Scripts útiles

```bash
# Prisma: generar cliente e iniciar migraciones
docker compose exec backend npx prisma migrate dev

# Logs en tiempo real
docker compose logs -f backend
docker compose logs -f frontend
```

---

## Seguridad

- Hash de contraseñas con **bcrypt**  
- Tokens JWT con expiración  
- Cifrado AES-256 para contraseñas o tokens guardados  
- Variables de entorno ocultas (no subir `.env` al repo)

---

## Despliegue en DigitalOcean

1. Copiar el proyecto al servidor:
   ```bash
   scp -r devhub/ root@tu-servidor:/srv/devhub
   ```
2. Configurar dominios:
   - `devhub.tudominio.com` → Frontend (Next.js)
   - `api.devhub.tudominio.com` → Backend (NestJS)
3. Instalar Docker y Compose:
   ```bash
   apt install docker.io docker-compose -y
   ```
4. Levantar contenedores:
   ```bash
   docker compose up -d --build
   ```
5. (Opcional) Configurar **Nginx + Certbot** para HTTPS.

---

## Roadmap

| Fase | Objetivo | Estado |
|------|-----------|--------|
| 1 | Infraestructura base + Docker + Prisma | |
| 2 | CRUD de Notas (API + UI) | |
| 3 | Auth y cifrado de accesos | |
| 4 | Módulo Tickets | |
| 5 | Dashboard completo | |
| 6 | Deploy en DigitalOcean con SSL | |

---

## Autor

**Yared Stark**  
💼 DevOps | Backend | Fullstack Engineer  
🌐 [elyares.org](https://elyares.org)