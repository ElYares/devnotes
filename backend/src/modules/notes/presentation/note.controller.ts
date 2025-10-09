import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NoteService } from '../application/note.service';
import { Note } from '../domain/note.entity';

/**
 * Controlador REST para el módulo Notes
 */
@Controller('api/v1/notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  async findAll(): Promise<Note[]> {
    return this.noteService.getAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Note> {
    return this.noteService.getById(Number(id));
  }

  @Post()
  async create(@Body() body: { title: string; content: string; tags: string[] }): Promise<Note> {
    return this.noteService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Partial<Note>): Promise<Note> {
    return this.noteService.update(Number(id), body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.noteService.delete(Number(id));
  }
}
