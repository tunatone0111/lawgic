import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  Request,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { PrecsService } from './precs.service';
import { UsersService } from 'src/users/users.service';

@Controller('api/precs')
export class PrecsController {
  constructor(
    private precsService: PrecsService,
    private usersService: UsersService,
  ) {}

  @Get()
  async getAll() {
    return await this.precsService.findAll({}, { caseNum: true });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  async getMyPrecs(@Request() { user: { likedPrecs } }) {
    return likedPrecs;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/my')
  async putMyPrecs(
    @Request() { user: { username, likedPrecs } },
    @Body() { precId },
  ) {
    if (likedPrecs.filter(p => p.objId.toString() === precId).length === 0) {
      const {
        _id: objId,
        title,
        caseNum,
        issues,
        courtOrder,
        isEnBanc,
      } = await this.precsService.findOneById(precId).then();

      const updatedLikedPrecs = [
        { objId, title, caseNum, issues, courtOrder, isEnBanc },
        ...likedPrecs,
      ];

      this.usersService.updateOne({
        username: username,
        likedPrecs: updatedLikedPrecs,
      });

      return updatedLikedPrecs;
    } else {
      throw new BadRequestException('the prec already exists');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/my')
  async deleteMyPrecs(
    @Request() { user: { username, likedPrecs } },
    @Body() { precId },
  ) {
    const updatedLikedPrecs = likedPrecs.filter(
      p => p.objId.toString() !== precId,
    );

    if (likedPrecs.length === updatedLikedPrecs.length) {
      throw new BadRequestException('No such prec');
    }

    this.usersService.updateOne({
      username: username,
      likedPrecs: updatedLikedPrecs,
    });
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.precsService.findOneById(id);
  }
}
