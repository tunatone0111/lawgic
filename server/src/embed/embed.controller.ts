import { Controller, Get, Query } from '@nestjs/common';
import fetch from 'node-fetch';
import { PrecsService } from 'src/precs/precs.service';

@Controller('api/embed')
export class EmbedController {
  constructor(private precsService: PrecsService) {}

  @Get()
  async embed(@Query('q') q: string) {
    let data;
    console.log(`query: ${q}`);
    let res = await fetch(encodeURI(`http://localhost:5000/?q=${q}`));
    res = await res.json();
    if (res.isCached === true) {
      console.log('loading from cached');
      const cachedItem = await this.precsService.findCachedOne(res.cachedId);
      data = cachedItem.precs;
    } else {
      console.log('loading precs...');
      data = await Promise.all(
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
      this.precsService.createCacheItem({
        vector: res.vector,
        precs: data,
      });
    }
    return data;
  }
}
