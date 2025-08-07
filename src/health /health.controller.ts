import { Controller, Get } from "@nestjs/common"; 
import { ApiOperation } from "@nestjs/swagger";
import { DataSource } from "typeorm";

@Controller('health')
export class healthController{
    constructor(private dataSource: DataSource){}

    @Get()
    @ApiOperation  ({ summary: 'Check the server is running' })
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
