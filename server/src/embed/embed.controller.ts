import { Controller, Get, Query } from '@nestjs/common';
import fetch from 'node-fetch';

@Controller('api/embed')
export class EmbedController {
  @Get()
  async embed(@Query('q') q: string) {
    let res = await fetch(`http://localhost:5000/embed?q=${q}`);
    res = await res.json();
    return res;
  }
}
