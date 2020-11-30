import {
  CachedItem,
  CachedItemSchema,
} from './../precs/schemas/cachedItem.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrecsService } from 'src/precs/precs.service';
import { Prec, PrecSchema } from 'src/precs/schemas/prec.schema';
import { EmbedController } from './embed.controller';
import { EmbedService } from './embed.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Prec.name, schema: PrecSchema }]),
    MongooseModule.forFeature([
      { name: CachedItem.name, schema: CachedItemSchema },
    ]),
  ],
  controllers: [EmbedController],
  providers: [EmbedService, PrecsService],
})
export class EmbedModule {}
