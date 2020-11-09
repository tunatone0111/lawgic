import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Prec, PrecSchema } from 'src/schemas/prec.schema';
import { PrecsService } from './precs.service';
import { PrecsController } from './precs.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Prec.name, schema: PrecSchema }]),
  ],
  providers: [PrecsService],
  controllers: [PrecsController],
})
export class PrecsModule {}
