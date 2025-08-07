import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class AuthLoginDto{
    @ApiProperty({ example: 'John' })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: 'email@yahoo.com'})
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123' })
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
