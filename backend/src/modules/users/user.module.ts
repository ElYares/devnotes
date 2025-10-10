import { Module } from "@nestjs/common";
import { UserController } from "./presentation/user.controller";
import { UserService } from "./application/user.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService],
    exports:[UserService]
})

export class UserModule{}