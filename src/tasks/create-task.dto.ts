import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class CreateTaskDto {
    @ApiProperty({ example: 'Task Title' })
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'Task Description', required: false })
    @IsNotEmpty()
    description?: string;

    @ApiProperty({ example: 'pending', enum: ['pending', 'in-progress', 'completed'], required: false })
    @IsNotEmpty()
    status?: string;

}

