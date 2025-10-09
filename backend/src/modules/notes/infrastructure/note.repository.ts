import { Injectable } from '@nestjs/common';

import { Note } from '../domain/note.entity';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Repositorio de acceso a datos para las notas.
 * Usa Prisma ORM para comunicarse con PostgreSQL.
 */
@Injectable()
export class NoteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Note[]> {
    return this.prisma.note.findMany();
  }

  async findById(id: number): Promise<Note | null> {
    return this.prisma.note.findUnique({ where: { id } });
  }

  async create(data: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    return this.prisma.note.create({ data });
  }

  async update(id: number, data: Partial<Note>): Promise<Note> {
    return this.prisma.note.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.note.delete({ where: { id } });
  }
}
