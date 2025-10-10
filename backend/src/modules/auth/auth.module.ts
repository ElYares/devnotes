import { Module } from "@nestjs/common";
import { UserModule } from "../users/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./presentation/auth.controller";
import { AuthService } from "./application/auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtStrategy } from "./strategys/jwt.strategy";

@Module({
    imports:[
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'supersecretkey',
            signOptions: {expiresIn: '7d'},
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtStrategy],
    exports: [AuthService]
})

export class AuthModule {}