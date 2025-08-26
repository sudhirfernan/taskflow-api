import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { dirname,join } from 'path';
import { fileURLToPath } from "url";


config(); // Load environment variables from .env file



export const AppDataSource = new DataSource({ 
    type: 'postgres',
    port: Number(process.env.DB_PORT ?? 5432),
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,
    entities: [join(__dirname, '**/*.entity{.ts,.js}')],
    migrations: [join (__dirname, 'migrations/**/*{.ts,.js}')], 
    synchronize: false, // Disable in production
    logging: true,
    
    
});