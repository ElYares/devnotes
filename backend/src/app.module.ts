import { Module } from '@nestjs/common';
import { NotesModule } from './modules/notes/notes.module';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [NotesModule, UserModule, AuthModule],
})
export class AppModule {}
