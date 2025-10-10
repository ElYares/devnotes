import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(email: string, password: string, fullName?: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { email, password: hashed, fullName },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}