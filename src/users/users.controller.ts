import { Controller, Post, Body, BadRequestException, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('user-profile')
    @ApiOperation({ summary: 'Get user profile' })
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
    
//     @Post('register')
// async register(@Body() dto: CreateUserDto) {
//   const { username, email, password } = dto;

//   const existingUser = await this.usersService.findByUsername(username);
//   if (existingUser) {
//     throw new BadRequestException('Username already exists');
//   }

//   const newUser = await this.usersService.createUser(username, email, password);
//   return { message: 'User registered successfully', userId: newUser.id };
// }


    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    async create(@Body() dto: CreateUserDto){
        const { username, email, password } = dto;

        const existingUser = await this.usersService.findByUsername(username);
        if (existingUser) {
            throw new BadRequestException('Username already exists');
        }

        const newUser = await this.usersService.createUser(username, email, password);
        return { message: 'User created successfully', userId: newUser.id };
    }
}