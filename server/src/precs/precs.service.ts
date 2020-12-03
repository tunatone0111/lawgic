import { CreateCacheItemDto } from './dto/create-cache-item.dto';
import { CachedItem, CachedItemDocument } from './schemas/cachedItem.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Prec, PrecDocument } from 'src/precs/schemas/prec.schema';

@Injectable()
export class PrecsService {
  constructor(
    @InjectModel(Prec.name) private precModel: Model<PrecDocument>,
    @InjectModel(CachedItem.name) private cacheModel: Model<CachedItemDocument>,
  ) {}

  async findAll(filt: FilterQuery<Prec> = {}, sel): Promise<Prec[]> {
    return await this.precModel
      .find(filt)
      .select(sel)
      .exec();
  }

  async findOneById(id: string): Promise<Prec> {
    return await this.precModel.findById(id).exec();
  }

  async findOne(filt: FilterQuery<Prec> = {}, sel): Promise<Prec> {
    return await this.precModel
      .findOne(filt)
      .select(sel)
      .exec();
  }

  async findCachedOne(id: string): Promise<CachedItem> {
    return await this.cacheModel.findById(id).exec();
  }

  async createCacheItem(
    newCachedItem: CreateCacheItemDto,
  ): Promise<CachedItem> {
    const createdItem = new this.cacheModel(newCachedItem);
    return await createdItem.save();
  }
}
