import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';

const mockProjectRepository = {};
const mockUserRepository = {};


describe ('ProjectService', () => {
  let service: ProjectService;

  beforeEach (async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {provide: 'ProjectRepository', useValue: mockProjectRepository},
        {provide: 'UserRepository', useValue: mockUserRepository},
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
