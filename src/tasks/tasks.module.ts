import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { TaskController } from './tasks.controller';
import { Project } from '../project/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Project]), // 👈 Register Task and Project entities
  ],
  controllers: [TaskController],
  providers: [TasksService],
})
export class TasksModule {}
