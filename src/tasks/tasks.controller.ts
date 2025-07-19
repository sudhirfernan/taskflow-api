import { Controller, Get, Param, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(
        private tasksService: TasksService
    ){}

    //Create Task
    // @Post()
    // createTask(
    //     @Body() body: any
    // ): any {
    //     return this.tasksService.createTask(body);

    // }

    //Get Tasks 
    @Get()
    getTasks(): any[] {
        return this.tasksService.getTasks();
    }

    @Get(':id')
    getOneTask(
        @Param('id') id: string
    ): any{
        return this.tasksService.getOneTask(id);
    }
}
