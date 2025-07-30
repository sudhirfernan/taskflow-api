import { Controller, Get } from "@nestjs/common"; 
import { DataSource } from "typeorm";

@Controller('health')
export class healthController{
    constructor(private dataSource: DataSource){}

    @Get()
    async check() {
        try{
            await this.dataSource.query('SELECT 1');
            return { status: 'Database connected'};
        }catch{
            return {
                staus: 'Database connection failed'
            };
        }
    }
}
