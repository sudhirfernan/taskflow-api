import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post('register')
    async register(
        @Body() body: { username: string; password: string},
    ){
        const { username, password } = body;

        const existingUser = await this.usersService.findByUsername(username);
        if (existingUser){
            throw new BadRequestException('Username already exists');
        }

        const newUser = await this.usersService.createUser(username, password);
        return {message: 'User registered successfully', userId: newUser.id};
    }
}


