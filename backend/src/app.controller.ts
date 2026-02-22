import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('guestbook')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('debug-env')
getEnvStatus() {
  return {
    urlFound: !!process.env.SUPABASE_URL,
    keyFound: !!process.env.SUPABASE_KEY,
    // NEVER return the actual key value here for security!
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  };
}

  @Get()
  async getComments() {
    return await this.appService.getComments();
  }

  @Post()
  async addComment(@Body() body: { name: string; message: string }) {
    // Ensure 'message' matches your database column and Guestbook.vue
    return await this.appService.addComment(body.name, body.message);
  }
}