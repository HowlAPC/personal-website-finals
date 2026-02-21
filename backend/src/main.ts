import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

export const bootstrap = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule, 
    new ExpressAdapter(expressInstance)
  );
  app.enableCors(); // Allows your Vue frontend to talk to this API
  await app.init();
};

// Vercel needs to wait for the bootstrap to finish before handling requests
const handleRequest = async (req: any, res: any) => {
  await bootstrap(server);
  return server(req, res);
};

export default handleRequest;