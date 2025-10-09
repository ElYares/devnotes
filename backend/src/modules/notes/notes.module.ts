import { Module } from '@nestjs/common';
import { NoteRepository } from './infrastructure/note.repository';
import { NoteService } from './application/note.service';
import { NoteController } from './presentation/note.controller';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  controllers: [NoteController],
  providers: [NoteService, NoteRepository, PrismaService],
})
export class NotesModule {}
