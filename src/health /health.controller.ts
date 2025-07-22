import { Controller, Get } from "@nestjs/common"; 

@Controller('health')
export class healthController{
    @Get()
    checkHealth(): string{
        return 'Server is running'; 
    }
}