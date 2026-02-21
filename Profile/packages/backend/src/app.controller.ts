import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('guestbook') // This makes the URL: /api/guestbook
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  fetchComments() {
    return this.appService.getComments();
  }

  @Post()
  addComment(@Body() body: { name: string; content: string }) {
    return this.appService.createComment(body.name, body.content);
  }
}