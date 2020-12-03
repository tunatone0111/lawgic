import { Controller, Get, Query } from '@nestjs/common';
import fetch from 'node-fetch';
import { PrecsService } from 'src/precs/precs.service';
import { CachedPrec } from 'src/precs/schemas/cachedItem.schema';

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
      data = await Promise.all<CachedPrec>(
        res.precs.map(
          async ([caseNum, sim]): Promise<CachedPrec> => {
            const resultPrec = await this.precsService.findOne(
              { caseNum: caseNum },
              {},
            );
            return {
              precId: resultPrec._id.toHexString(),
              date: resultPrec.date,
              title: resultPrec.title,
              issues: resultPrec.issues,
              courtOrder: resultPrec.courtOrder,
              isEnBanc: resultPrec.isEnBanc,
              sim: sim,
            };
          },
        ),
      );
      this.precsService.createCacheItem({
        vector: res.vector,
        precs: data,
      });
    }
    return data;
  }
}
