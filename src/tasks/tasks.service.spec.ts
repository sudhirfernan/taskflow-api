import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Project } from '../project/project.entity';


const mockTaskRepo = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
});

const mockProjectRepo = () => ({
  findOne: jest.fn(),
});

describe('TasksService', () => {
  let service: TasksService;
  let repo: jest.Mocked<Repository<Task>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService,
        {
          provide: getRepositoryToken(Task),
          useFactory: mockTaskRepo,
        },
        {
          provide: getRepositoryToken(Project),
          useFactory: mockProjectRepo,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repo = module.get(getRepositoryToken(Task));
  });

  describe('updateTask', () => {
    const mockDto = { title: 'Updated Task'};
    const projectId = 1;
    const userId = 99;
    const taskId = 10;
  

  it('should throw NotFoundException if task does not exist',  async() => {
    repo.findOne.mockResolvedValue(null);

    await expect(service.updateTask(projectId, userId, taskId, mockDto)).rejects.toThrow(NotFoundException);
  });


  it('should throw BadRequestException if task does not belong to the project', async () => {
    repo.findOne.mockResolvedValue({
      id: taskId,
      project: { id: 2, user: { id: userId } },
    }as Task);

    await expect(service.updateTask(projectId, userId, taskId, mockDto)).rejects.toThrow(BadRequestException);
  });

  it ('should throw ForbiddenException if user does not have permission', async () => {
    repo.findOne.mockResolvedValue({
      id: taskId,
      project: { id: projectId, user: { id: 123 } },
    } as Task);

    await expect(service.updateTask(projectId, userId, taskId, mockDto)).rejects.toThrow(ForbiddenException);
  });

  it('should update and return the task', async () =>{
    const existingTask = {
      id: taskId,
      title: 'Old Task',
      project: { id: projectId, user: { id: userId } },
    }as Task;

    repo.findOne.mockResolvedValue(existingTask);
    repo.save.mockResolvedValue({ ...existingTask, ...mockDto });

    const result = await service.updateTask(projectId, userId, taskId, mockDto);

    expect(repo.save).toHaveBeenCalledWith({ ...existingTask, ...mockDto});
    expect (result.title).toBe('Updated Task');
  });
});

});
