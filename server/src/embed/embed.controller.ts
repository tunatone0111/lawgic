import { Controller, Get, Query } from '@nestjs/common';
import fetch from 'node-fetch';
import { PrecsService } from 'src/precs/precs.service';

@Controller('api/embed')
export class EmbedController {
  constructor(private precsService: PrecsService) {}

  @Get()
  async embed(@Query('q') q: string) {
    let res = await fetch(encodeURI(`http://localhost:5000/?q=${q}`));
    res = await res.json();
    let data = res.data.slice(0, 10);
    console.log(data);
    return await Promise.all(
      data.map(caseNum => this.precsService.findAll({ caseNum: caseNum })),
    );
  }
}
