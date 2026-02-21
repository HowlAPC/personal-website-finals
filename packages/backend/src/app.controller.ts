import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('guestbook')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAll() {
    return await this.appService.getComments();
  }

  @Post()
  async create(@Body() body: { name: string; content: string }) {
    return await this.appService.addComment(body.name, body.content);
  }
}