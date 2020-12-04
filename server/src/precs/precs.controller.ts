import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { PrecsService } from './precs.service';

@Controller('api/precs')
export class PrecsController {
  constructor(private precsService: PrecsService) {}

  @Get()
  async getAll() {
    return await this.precsService.findAll({}, { caseNum: true });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  async getMyPrecs(@Request() { user: { likedPrecs } }) {
    return likedPrecs;
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.precsService.findOneById(id);
  }
}
