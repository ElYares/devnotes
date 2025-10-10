import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Note } from '../domain/note.entity';
import { Prisma } from '@prisma/client';


@Injectable()
export class NoteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByUser(userId: number): Promise<Note[]> {
    return this.prisma.note.findMany({ where: { userId } });
  }

  async findById(id: number): Promise<Note | null> {
    return this.prisma.note.findUnique({ where: { id } });
  }

async create(
  data: { title: string; content: string; tags: string[] },
  userId: number,
): Promise<Note> {
  return this.prisma.note.create({
    data: {
      title: data.title,
      content: data.content,
      tags: data.tags,
      user: { connect: { id: userId } }, // 👈 esto es suficiente
    },
  });
}  async update(id: number, data: Partial<Note>): Promise<Note> {
    return this.prisma.note.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.note.delete({ where: { id } });
  }
}