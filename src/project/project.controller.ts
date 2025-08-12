import { Controller, Post, Body, Get, Patch, ForbiddenException, Delete, Req, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './create-project.dto';
import { Request ,Param, NotFoundException } from '@nestjs/common';
import { Update } from 'next/dist/build/swc/types';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PaginationDto } from '../dto/pagination.dto';




@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService){}

   
    @Post()
    @ApiOperation({ summary: 'Create a new project' })
    create ( @Body() createProjectDto: CreateProjectDto){
      try{
        return this.projectService.createProject(createProjectDto);
      } catch (error){
        console.error('Create project failed: ', error.message);
        throw new Error('Failed to create project: ${error.message}');
      }
    }
    
    @Get()
    @ApiOperation({ summary: 'Get all projects' })
    @ApiQuery({ name: 'page', required: false, example: 1})
    @ApiQuery({ name: 'limit', required: false, example: 15 })
    async findAll(@Query() paginationDto: PaginationDto) {
        return this.projectService.findAll(paginationDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Get a project by ID' })
    async findOne(@Request() req, @Param('id') id: number) {
        const project = await this.projectService.findOne(+id);
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
        if (project.user.id !== req.user.userId) throw new ForbiddenException();
        return project;
    }
    
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @ApiOperation({ summary: 'Update a project by ID' })
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

  return this.projectService.update(+id, updateDto, req.user.userId);
}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a project by ID' })
    async remove(@Request() req, @Param('id') id: number) {
        const project = await this.projectService.findOne(+id);
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
        if (project.user.id !== req.user.userId) throw new ForbiddenException();
        return this.projectService.remove(+id); 
    }
}
