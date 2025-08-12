import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './create-project.dto';
import { User } from '../users/user.entity';
import { PaginationDto } from 'src/dto/pagination.dto';


@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepo: Repository<Project>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ){}

    async createProject(dto: CreateProjectDto): Promise<Project> {
        const user = await this.userRepo.findOne({ where: { id: dto.userId } });

        if (!user) {
            throw new Error('User not found');
        }

        const project = this.projectRepo.create({
            name: dto.name,
            description: dto.description,
            user: user,
        });

        return this.projectRepo.save(project);
    }

    async findAll(paginationDto: PaginationDto): Promise<{ total: number; page: number; limit: number; data: Project[] }> {
        const { page = 1, limit = 15 } = paginationDto;

        const skip = (page - 1) * limit;

        const [data, total] = await this.projectRepo.findAndCount({
            relations: ['user'],
            skip,
            take: limit
            
        });
        return {
            total,
            page,
            limit,
            data,
        };
    }

    async findOne(id: number): Promise<Project | null> {
  return this.projectRepo.findOne({
    where: { id },
    relations: ['user'], 
  });

}

async update(id: number, updateDto: CreateProjectDto, userId: number): Promise<Project> {
    const project = await this.findOne(id);
    if (!project) {
        throw new NotFoundException('Project not found');
    }

    // Object.assign(project, updateDto);
    // return this.projectRepo.save(project);
    delete updateDto.userId; 

    project.name = updateDto.name;
    project.description = updateDto.description;
    project.user = project.user; // Keep the original user association

    return this.projectRepo.save(project);

}

async remove(id: number): Promise<void> {
    const project = await this.findOne(id);
    if (!project) {
        throw new NotFoundException('Project not found');
    }
    await this.projectRepo.remove(project);
}
}
