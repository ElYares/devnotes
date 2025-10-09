import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteRepository } from '../infrastructure/note.repository';
import { Note } from '../domain/note.entity';

/**
 * Capa de aplicación que contiene la lógica de negocio.
 */
@Injectable()
export class NoteService {
  constructor(private readonly repository: NoteRepository) {}

  async getAll(): Promise<Note[]> {
    return this.repository.findAll();
  }

  async getById(id: number): Promise<Note> {
    const note = await this.repository.findById(id);
    if (!note) throw new NotFoundException(`Nota con id ${id} no encontrada`);
    return note;
  }

  async create(data: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    return this.repository.create(data);
  }

  async update(id: number, data: Partial<Note>): Promise<Note> {
    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
