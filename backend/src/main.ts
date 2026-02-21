import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Allows your frontend to talk to the backend
  if (process.env.NODE_ENV !== 'production') {
    await app.listen(3000);
  }
}
bootstrap();
