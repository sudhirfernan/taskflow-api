import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Updated Task Title' })
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional({ example: 'Updated Task Description' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ 
    example: 'in-progress', 
    enum: ['pending', 'in-progress', 'completed'] 
  })
  @IsOptional()
  @IsIn(['pending', 'in-progress', 'completed'])
  status?: string;
}
