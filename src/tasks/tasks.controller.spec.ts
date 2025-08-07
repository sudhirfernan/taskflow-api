import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './tasks.controller';
import { TasksService } from './tasks.service';

// describe('TasksController', () => {
//   let controller: TaskController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [TaskController],
//     }).compile();

//     controller = module.get<TaskController>(TaskController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

describe ('TasksController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            createTask: jest.fn(),
            getTasks: jest.fn(),
            updateTask: jest.fn(),
            deleteTask: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
