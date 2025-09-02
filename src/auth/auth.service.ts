import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (user && await bcrypt.compare(password, user.password)){
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

  async generateTokens(user: any) {
    const payload =  {sub: user.id, email: user.email};


    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET, 
      expiresIn: '25m',
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
    });

    return {
      access_token,
      refresh_token
    };
  }
}