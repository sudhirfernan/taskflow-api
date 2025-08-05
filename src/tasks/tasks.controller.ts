import { Controller, Post, Get, Patch, Delete, Param, Body, Req, UseGuards, NotFoundException, ForbiddenException, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';

@UseGuards(JwtAuthGuard)
@Controller('projects/:projectId/tasks')
export class TaskController {
  constructor(private readonly taskService: TasksService) {}


  @Post()
  async createTask(@Req() req, @Param('projectId') projectId: number, @Body() dto: CreateTaskDto) {
    return this.taskService.createTask(projectId, req.user.userId, dto);
  }

  @Get()
  async getTasks(@Req() req, @Param('projectId') projectId: number) {
    return this.taskService.findTask(projectId, req.user.userId);
  }

  
  @Patch(':taskId')
  async updateTask(
    @Req() req,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() dto: UpdateTaskDto
  ) {
    return this.taskService.updateTask(projectId, req.user.userId, taskId, dto);
  }

    @UseGuards(JwtAuthGuard)
  @Delete(':taskId')
  async deleteTask(
    @Req() req,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('taskId', ParseIntPipe) taskId: number
  ) {
    return this.taskService.deleteTask(projectId, req.user.userId, taskId);
  }
}
