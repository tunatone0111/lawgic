import { Controller, Get, Query } from '@nestjs/common';
import fetch from 'node-fetch';
import { PrecsService } from 'src/precs/precs.service';

@Controller('api/embed')
export class EmbedController {
  constructor(private precsService: PrecsService) {}

  @Get()
  async embed(@Query('q') q: string) {
    console.log(`query: ${q}`);
    let res = await fetch(encodeURI(`http://localhost:5000/?q=${q}`));
    res = await res.json();
    const data = await Promise.all(
      res.precs.map(async ([caseNum, sim]) => {
        const { _id, title, issues } = await this.precsService.findOne(
          { caseNum: caseNum },
          { _id: 1, title: 1, issues: 1 },
        );
        return {
          _id: _id,
          title: title,
          issues: issues,
          sim: sim,
        };
      }),
    );
    return data;
  }
}
