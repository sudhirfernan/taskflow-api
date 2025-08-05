import { Controller, Post, Body, Get, Patch, ForbiddenException, Delete, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './create-project.dto';
import { Request ,Param, NotFoundException } from '@nestjs/common';
import { Update } from 'next/dist/build/swc/types';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';



@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService){}

   
    @Post()
    create ( @Body() createProjectDto: CreateProjectDto){
      try{
        return this.projectService.createProject(createProjectDto);
      } catch (error){
        console.error('Create project failed: ', error.message);
        throw new Error('Failed to create project: ${error.message}');
      }
    }
    
    @Get()
    async findAll(){
        return this.projectService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Request() req, @Param('id') id: number) {
        const project = await this.projectService.findOne(+id);
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
        if (project.user.id !== req.user.userId) throw new ForbiddenException();
        return project;
    }
    
    @UseGuards(JwtAuthGuard)
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

    @UseGuards(JwtAuthGuard)
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
