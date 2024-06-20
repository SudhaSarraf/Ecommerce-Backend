import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './all-exception.filter';
import { LoggerService } from './logger.service.ts/logger.service';
async function bootstrap() {
  // const whitelist = [
  //   'http://localhost:5173',
  //   'http://192.168.1.148:5173',
  //   'http://192.168.1.148:5174',
  //   'http://192.168.1.118:5173',
  // ];

  const app = await NestFactory.create(AppModule, {
    cors: {
      // origin: true,
      origin: [
        'http://localhost:8080',
        'http://192.168.1.149:5173',
        'http://localhost:3000',
        'http://localhost:5173',
      ],
      credentials: true,
      optionsSuccessStatus: 200,
      preflightContinue: false,
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  app.useLogger(app.get(LoggerService));

  app.use(cookieParser());
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT);
}
bootstrap();
