import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prec, PrecDocument } from 'src/precs/schemas/prec.schema';
import { CreatePrecDto } from 'src/precs/dto/create-prec.dto';

@Injectable()
export class PrecsService {
  constructor(@InjectModel(Prec.name) private precModel: Model<PrecDocument>) {}

  async create(createPrecDto: CreatePrecDto): Promise<Prec> {
    const createdPrec = new this.precModel(createPrecDto);
    return createdPrec.save();
  }

  async findAll(): Promise<Prec[]> {
    return this.precModel.find().exec();
  }
}
