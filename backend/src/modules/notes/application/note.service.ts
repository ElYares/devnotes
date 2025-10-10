import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { NoteRepository } from '../infrastructure/note.repository';
import { Note } from '../domain/note.entity';

@Injectable()
export class NoteService {
  constructor(private readonly repository: NoteRepository) {}

  async getAllByUser(userId: number): Promise<Note[]> {
    return this.repository.findAllByUser(userId);
  }

  async getById(id: number, userId: number): Promise<Note> {
    const note = await this.repository.findById(id);
    if (!note) throw new NotFoundException(`Nota con id ${id} no encontrada`);
    if (note.userId !== userId) throw new ForbiddenException('No puedes acceder a esta nota');
    return note;
  }

  async create(
    data: { title: string; content: string; tags: string[] },
    userId: number,
  ): Promise<Note> {
    return this.repository.create(data, userId);
  }

  async update(id: number, data: Partial<Note>, userId: number): Promise<Note> {
    const note = await this.repository.findById(id);
    if (!note || note.userId !== userId) throw new ForbiddenException('No puedes modificar esta nota');
    return this.repository.update(id, data);
  }

  async delete(id: number, userId: number): Promise<void> {
    const note = await this.repository.findById(id);
    if (!note || note.userId !== userId) throw new ForbiddenException('No puedes eliminar esta nota');
    return this.repository.delete(id);
  }
}