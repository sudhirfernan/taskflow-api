import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProjectDto {
  @ApiProperty({ example: 'Project Alpha' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'A sample project for demo' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1 })
  userId: number;
}

export class UpdateProjectDto {
    @ApiProperty({ example: 'Project Alpha Updated', required: false })
    @IsNotEmpty({ message: 'Name cannot be empty' })
    name?: string;

    @ApiProperty({ example: 'Updated description for project', required: false })
    @IsNotEmpty({ message: 'Description cannot be empty' })
    description?: string;

    @ApiProperty({ example: 1, required: false })
    userId?: number;

}




// export class CreateProjectDto {
//     name: string;
//     description: string;
//     userId; number;
// }

// export class UpdateProjectDto {
//   name?: string;
//   description?: string;
//     userId?: number;
// }