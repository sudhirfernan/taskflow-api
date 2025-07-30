import { Controller, Post, Body, BadRequestException, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@Request() req){
        console.log('User profile request:', req.user);
        const userId = req.user.userId;
        const user = await this.usersService.findById(userId);

        if (!user){
            throw new BadRequestException('User not found');
        }

        const { password, ...userProfile } = user;
        return userProfile; 
    }
    

    @Post('register')
    async register(
        @Body() body: { username: string; email: string; password: string}
    ){
        const { username, email, password } = body;

        const existingUser = await this.usersService.findByUsername(username);
        if (existingUser){
            throw new BadRequestException('Username already exists');
        }

        const newUser = await this.usersService.createUser(username, email, password);
        return {message: 'User registered successfully', userId: newUser.id};
    }
}