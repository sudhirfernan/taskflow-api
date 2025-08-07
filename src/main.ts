import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Validate } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Global validation pipe 
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('API for managing tasks and projects')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('App is running on http://localhost:3000')
}
bootstrap();
