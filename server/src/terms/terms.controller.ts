import { Controller, Get, Query } from '@nestjs/common';
import { getRegExp, engToKor } from 'korean-regexp';
import vocab1 from './vocab';
import vocab2 from './vocab2';

const vocabs = [...new Set([...vocab1, ...vocab2])];

@Controller('api/terms')
export class TermsController {
  @Get()
  lookUp(@Query('q') q: string) {
    const lastWord = q.split(' ').slice(-1)[0];
    const regexp = getRegExp(engToKor(lastWord), {
      initialSearch: true,
      startsWith: true,
    });
    const matchedList = vocab2.filter(w => w.match(regexp)).slice(0, 10);
    return matchedList.map(w =>
      w.replace(lastWord, `<span style="color: #fb0">${lastWord}</span>`),
    );
  }
}
