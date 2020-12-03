import { Controller, Get, Query } from '@nestjs/common';
import { getRegExp, engToKor } from 'korean-regexp';
import vocabs from './vocab';

@Controller('api/terms')
export class TermsController {
  @Get()
  lookUp(@Query('q') q: string) {
    const lastWord = q.split(' ').slice(-1)[0];
    const regularExp = getRegExp(lastWord, {
      initialSearch: true,
      startsWith: true,
    });
    return vocabs.filter(w => w.match(regularExp)).slice(0, 10);
  }
}
