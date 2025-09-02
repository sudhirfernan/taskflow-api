import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {User} from './user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),

  JwtModule.register({
    secret: 'YOUR_SECRET_KEY',
    signOptions: { expiresIn: '1h' },
  }),

],


  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Export UsersService to use in other modules
})
export class UsersModule {}
