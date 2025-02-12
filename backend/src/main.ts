import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cookieSecret = process.env.COOKIE_SECRET;

  if (!cookieSecret) {
    throw new Error('COOKIE_SECRET environment variable is not set');
  }

  // Apply your configurations
  app.use(cookieParser(cookieSecret));
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Use environment variable for flexibility
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};

// For local development
if (process.env.NODE_ENV === 'development') {
  (async () => {
    await bootstrap();
    console.log(`Local server running`);
  })();
}