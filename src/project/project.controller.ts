import { Controller, Post, Body, Get, Patch, ForbiddenException, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './create-project.dto';
import { Request ,Param, NotFoundException } from '@nestjs/common';
import { Update } from 'next/dist/build/swc/types';



@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService){}

    @Post()
    export ( @Body() createProjectDto: CreateProjectDto){
        return this.projectService.createProject(createProjectDto);
    }

    @Get()
    findAll(){
        return this.projectService.findAll();
    }

    @Get(':id')
    async findOne(@Request() req, @Param('id') id: number) {
        const project = await this.projectService.findOne(+id);
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
        if (project.user.id !== req.user.userId) throw new ForbiddenException();
        return project;
    }

    @Patch(':id')
async update(
  @Request() req, // ✅ correct variable name
  @Param('id') id: number,
  @Body() updateDto: CreateProjectDto // ✅ use UpdateProjectDto for updates
) {
  const project = await this.projectService.findOne(+id);
  if (!project) {
    throw new NotFoundException(`Project with ID ${id} not found`);
  }

  // ✅ Check owner using project.user.id (from entity) and req.user.userId
  if (project.user.id !== req.user.userId) {
    throw new ForbiddenException();
  }

  return this.projectService.update(+id, updateDto);
}


    @Delete(':id')
    async remove(@Request() req, @Param('id') id: number) {
        const project = await this.projectService.findOne(+id);
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
        if (project.user.id !== req.user.userId) throw new ForbiddenException();
        return this.projectService.remove(+id); 
    }
}
