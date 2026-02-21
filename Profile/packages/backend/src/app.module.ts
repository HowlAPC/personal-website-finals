import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // On Vercel, it ignores envFilePath and uses the Dashboard variables.
      // Locally, it will look for the file you specify.
      envFilePath: '.env', 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}