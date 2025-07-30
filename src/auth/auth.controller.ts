import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service'
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';


@Controller('auth')
export class AuthController {
    constructor(
      private authService: AuthService,
      private jwtService: JwtService,
      private userService: UsersService
    ){}


    @Post('login')
    async login(@Body () loginDto: { username: string; password: string }) {
      const user = await this.authService.validateUser(loginDto.username, loginDto.password);
      if(!user) {
        throw new UnauthorizedException('Invalid Credentials');
      }
      return this.authService.generateTokens(user);
    }
}