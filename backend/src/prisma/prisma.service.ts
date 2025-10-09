import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService
 * Gestiona la conexión al cliente de base de datos (PostgreSQL)
 * y permite que otros módulos usen Prisma a través de inyección de dependencias.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect(); // Conecta al iniciar el módulo
    console.log('✅ Prisma conectado a la base de datos');
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Cierra conexión al destruir el módulo
    console.log('🧹 Prisma desconectado');
  }
}
