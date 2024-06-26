import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // causing issue of preflight failure
      // preflightContinue: true,
      // optionsSuccessStatus: 204,
    },
  });
  // app.use(cookieParser());
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT);

}

bootstrap();