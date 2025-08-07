import { Controller, Post, Get, Patch, Delete, Param, Body, Req, UseGuards, NotFoundException, ForbiddenException, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';
import { ApiBearerAuth, ApiOperation, ApiBody } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('projects/:projectId/tasks')
export class TaskController {
  constructor(private readonly taskService: TasksService) {}


  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new task for a project' })
  async createTask(@Req() req, @Param('projectId') projectId: number, @Body() dto: CreateTaskDto) {
    return this.taskService.createTask(projectId, req.user.userId, dto);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get all tasks for a project' })
  async getTasks(@Req() req, @Param('projectId') projectId: number) {
    return this.taskService.findTask(projectId, req.user.userId);
  }

  @ApiBearerAuth()
  @Patch(':taskId')
  @ApiOperation({ summary: 'Update a task for a project' })
  @ApiBody({ type: UpdateTaskDto })
  async updateTask(
    @Req() req,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() dto: UpdateTaskDto
  ) {
    return this.taskService.updateTask(projectId, req.user.userId, taskId, dto);
  }

  @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
  @Delete(':taskId')
  @ApiOperation({ summary: 'Delete a task for a project' })
  async deleteTask(
    @Req() req,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('taskId', ParseIntPipe) taskId: number
  ) {
    return this.taskService.deleteTask(projectId, req.user.userId, taskId);
  }
}
