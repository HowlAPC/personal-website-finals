import { NestFactory } from '@nestjs/core';
import { AppModule } from '../backend/src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

export const createNestServer = async (expressInstance: any) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  
  // ADD THIS LINE - This maps /api/guestbook to your controller
  app.setGlobalPrefix('api'); 
  
  app.enableCors();
  return app.init();
};

export default async (req: any, res: any) => {
  await createNestServer(server);
  server(req, res);
};