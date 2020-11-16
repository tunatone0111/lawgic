import { Controller, Get, Query } from '@nestjs/common';
import fetch from 'node-fetch';

@Controller('embed')
export class EmbedController {
  @Get()
  embed(@Query('q') q: string) {
    fetch(`http://localhost:5000/embed?q=${q}`).then(res => {
      res.json().then(data => {
        console.log(data);
        return data;
      });
    });
  }
}
