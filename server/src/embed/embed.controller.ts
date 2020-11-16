import { Controller, Get, Query } from '@nestjs/common';
import fetch from 'node-fetch';
import { PrecsService } from 'src/precs/precs.service';

@Controller('api/embed')
export class EmbedController {
  constructor(private precsService: PrecsService) {}

  @Get()
  async embed(@Query('q') q: string) {
    let res = await fetch(`http://localhost:5000/embed?q=${q}`);
    res = await res.json();
    const response = [];
    return await Promise.all(res.ids.map(id => this.precsService.findOne(id)));
  }
}
