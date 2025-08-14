import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
