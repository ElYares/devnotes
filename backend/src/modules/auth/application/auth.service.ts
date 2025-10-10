import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/modules/users/application/user.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async signup(email: string, password: string, fullName?: string) {
    const userExists = await this.userService.findByEmail(email);
    if (userExists) {
      throw new UnauthorizedException('Email already in use');
    }

    const user = await this.userService.create(email, password, fullName);
    return this.generateToken(user.id, user.email);
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateToken(user.id, user.email);
  }

  private generateToken(userId: number, email: string) {
    const payload = { sub: userId, email };
    return { access_token: this.jwtService.sign(payload) };
  }
}