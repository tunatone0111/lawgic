import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prec, PrecDocument } from 'src/precs/schemas/prec.schema';

@Injectable()
export class PrecsService {
  constructor(@InjectModel(Prec.name) private precModel: Model<PrecDocument>) {}

  async findAll(filt = {}): Promise<Prec[]> {
    return await this.precModel.find(filt).exec();
  }

  async findOne(id: string): Promise<Prec> {
    return await this.precModel.findOne({ _id: id }).exec();
  }
}
