import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Not } from 'typeorm';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Project } from '../project/project.entity';    



@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepo: Repository<Task>,
        @InjectRepository(Project)
        private readonly projectRepo: Repository<Project>,
    ) {}

    async createTask(projectId: number, userId: number, dto: CreateTaskDto): Promise<Task> {
        const project = await this.projectRepo.findOne({ where: { id: projectId }, relations: ['user'] });

        if (!project) {
            throw new NotFoundException('Project not found');
        }
        if (project.user.id !== userId) {
            throw new ForbiddenException('You do not have permission to create tasks for this project');
        }

        const task = this.taskRepo.create({ ...dto, project });

        return this.taskRepo.save(task);
    }

   async findTask(projectId: number, userId: number): Promise<Task[]> {
        const project = await this.projectRepo.findOne({ where: { id: projectId }, relations: ['user'] });

        if (!project) {
            throw new NotFoundException('Project not found');
        }
        if (project.user.id !== userId) {
            throw new ForbiddenException('You do not have permission to view tasks for this project');
        }

        return this.taskRepo.find({ where: { project: { id: projectId }}});
    }

    async updateTask(projectId: number, userId: number, taskId: number, dto: UpdateTaskDto): Promise<Task> {
        const task = await this.taskRepo.findOne({ where: { id: taskId }, relations: ['project', 'project.user'] });
        if (!task) throw new NotFoundException('Task not found');
        if (task.project.id !== projectId) throw new BadRequestException('Task does not belong to the specified project');
        if (task.project.user.id !== userId) throw new ForbiddenException('Not authorized');

        Object.assign(task, dto);
        return this.taskRepo.save(task);
    }

    async deleteTask(projectId: number, userId: number, taskId: number): Promise<void> {
        const task = await this.taskRepo.findOne({ where: { id: taskId }, relations: ['project', 'project.user'] });
        if (!task) throw new NotFoundException('Task not found');
        if (task.project.id !== projectId) throw new BadRequestException('Task does not belong to the specified project');
        if (task.project.user.id !== userId) throw new ForbiddenException('Not authorized');

        await this.taskRepo.remove(task);
    }
}
