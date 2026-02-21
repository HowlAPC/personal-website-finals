import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

export const bootstrap = async (expressInstance) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
  app.enableCors(); // Prevents CORS errors on the frontend
  await app.init();
};

export default async (req: any, res: any) => {
  await bootstrap(server);
  return server(req, res);
};