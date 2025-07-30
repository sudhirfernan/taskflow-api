import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { use } from 'passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
    
    constructor(
        private tasksService: TasksService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    getTasks(@Request() req){
        return{
            message: 'Protected tasks route',
            user: req.user,
        };
    }
    
    @Get(':id')
    getOneTask(
        @Param('id') id: string
    ): any{
        return this.tasksService.getOneTask(id);
    }
}
