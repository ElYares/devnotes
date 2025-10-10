import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "../application/user.service";

@Controller('api/v1/users')
export class UserController{
    constructor(private readonly userService: UserService){}

    @Get(':id')
    async getUser(@Param('id') id: string){
        return this.userService.findById(Number(id));
        
    }
}