import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, MinLength } from "class-validator";

//DTO 
export class CreateUserDto {
   @ApiProperty({ example: 'John'})
   @IsNotEmpty()
   username: string;


   @ApiProperty({ example: 'John@gmail.com'})
   @IsEmail()
   email: string;


   @ApiProperty({ example: 'password123'})
   @MinLength(6)
   password: string;
}