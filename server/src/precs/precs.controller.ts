import { Controller, Get, Param } from '@nestjs/common';
import { PrecsService } from './precs.service';

@Controller('api/precs')
export class PrecsController {
  constructor(private precsService: PrecsService) {}

  @Get()
  async getAll() {
    return await this.precsService.findAll({}, { caseNum: true });
  }

  @Get('/myprecs')
  async getMyPrecs() {}

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.precsService.findOneById(id);
  }
}
