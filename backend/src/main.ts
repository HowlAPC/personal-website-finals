import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

export const bootstrap = async (expressInstance: any) => { // Add : any here
  const app = await NestFactory.create(
    AppModule, 
    new ExpressAdapter(expressInstance)
  );
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.init();
};

export default async (req: any, res: any) => {
  await bootstrap(server);
  return server(req, res);
};