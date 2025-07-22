import { Module } from "@nestjs/common";
import { healthController } from "./health.controller";

@Module({
    controllers: [healthController],
})
export class HealthModule{}