import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service'
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthLoginDto } from './auth-login.dto';
import { ApiOperation } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
    constructor(
      private authService: AuthService,
      private jwtService: JwtService,
      private userService: UsersService
    ){}


    @Post('login')
    @ApiOperation({ summary: 'User login & Tokens' })
    async login(@Body () loginDto: AuthLoginDto) {
      const user = await this.authService.validateUser(loginDto.username, loginDto.password);
      if(!user) {
        throw new UnauthorizedException('Invalid Credentials');
      }
      return this.authService.generateTokens(user);
    }
}