import { CachedItem, CachedItemSchema } from './schemas/cachedItem.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Prec, PrecSchema } from 'src/precs/schemas/prec.schema';
import { PrecsService } from './precs.service';
import { PrecsController } from './precs.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Prec.name, schema: PrecSchema }]),
    MongooseModule.forFeature([
      { name: CachedItem.name, schema: CachedItemSchema },
    ]),
  ],
  providers: [PrecsService],
  controllers: [PrecsController],
})
export class PrecsModule {}
