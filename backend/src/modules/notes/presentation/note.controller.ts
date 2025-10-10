import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { NoteService } from '../application/note.service';
import { Note } from '../domain/note.entity';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';

@Controller('api/v1/notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: any): Promise<Note[]> {
    const userId = req.user.userId;
    return this.noteService.getAllByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: any,
    @Body() body: { title: string; content: string; tags: string[] },
  ): Promise<Note> {
    const userId = req.user.userId;
    return this.noteService.create(body, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: Partial<Note>,
  ): Promise<Note> {
    const userId = req.user.userId;
    return this.noteService.update(Number(id), body, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Req() req: any, @Param('id') id: string): Promise<void> {
    const userId = req.user.userId;
    return this.noteService.delete(Number(id), userId);
  }
}