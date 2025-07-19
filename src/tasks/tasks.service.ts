import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Not } from 'typeorm';

@Injectable()
export class TasksService {
    tasks: any[] = [
        {id: 'asd1', title: 'Task Number One', description: 'Simple tasks for my App'},
        {id: 'qwe2', title: 'Go to a Store ', description: 'Because I need to buy some stuff'},
        {id: 'zxc3', title: 'Wash a Car', description: 'Washing the car is important'}

    ];

    //Create Task
    createTask(task: any): any[] {
        if(task.title === '' || task.description === ''){
            throw new BadRequestException();
        }

        const taskToCreate: any = {
            id: new Date().getTime().toString(),
            title: task.title,
            description: task.description
        }

        this.tasks.push(taskToCreate);

        return [ this.tasks ];
    }

    //Get all tasks
    getTasks(): any[]{
        return [...this.tasks];
    }

    //Get one task
    getOneTask(id: string): any {
        const task = this.tasks.find(t => t.id === id);

        if (!task) {
            return new NotFoundException();
        }
        return {...task };
    }
}
