export class CreateProjectDto {
    name: string;
    description: string;
    userId; number;
}

export class UpdateProjectDto {
  name?: string;
  description?: string;
    userId?: number;
}