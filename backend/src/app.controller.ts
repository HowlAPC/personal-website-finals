import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('guestbook') // This makes the route /api/guestbook
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getComments() {
    // Calls the service method that fetches from Supabase
    return await this.appService.getComments(); 
  }

  @Post()
  async addComment(@Body() body: { name: string; message: string }) {
    // Matches the v-model names from your Vue frontend
    return await this.appService.addComment(body.name, body.message);
  }
}