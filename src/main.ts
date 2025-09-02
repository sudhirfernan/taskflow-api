// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { ValidationPipe } from '@nestjs/common';
// import { Validate } from 'class-validator';
// import { AllExceptionsFilter } from './filters/all-exceptions.filter';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   //Global validation pipe 
//   app.useGlobalPipes(new ValidationPipe());

//   //Global exception filter
//   app.useGlobalFilters(new AllExceptionsFilter());

//   //Connecting frontend and backend
//   app.enableCors({  
//     origin: 'http://localhost:3001',
//     credentials: true // Adjust this to your frontend's URL
//   });

//   const config = new DocumentBuilder()
//     .setTitle('Task Management API')
//     .setDescription('API for managing tasks and projects')
//     .setVersion('1.0')
//     .addBearerAuth()
//     .build();

//     const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);

//   await app.listen(3000);
//   console.log('App is running on http://localhost:3000')
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import * as cookieParser from 'cookie-parser';   // ✅ add this import

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe 
  app.useGlobalPipes(new ValidationPipe());

  // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // ✅ Enable cookie parser
  app.use(cookieParser());

  // Connecting frontend and backend
  app.enableCors({  
    origin: 'http://localhost:3001',
    credentials: true // needed for cookies to be sent from frontend
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('API for managing tasks and projects')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('App is running on http://localhost:3000');
}
bootstrap();
