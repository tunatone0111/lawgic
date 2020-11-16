import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PrecDocument = Prec & Document;

@Schema({ collection: 'Precs' })
export class Prec {
  @Prop({ required: true })
  title: String;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  caseNum: String;

  @Prop()
  order: Number;

  @Prop()
  issues: string[];

  @Prop()
  refClauses: String[][];

  @Prop()
  refPrecs: string[][];

  @Prop({ required: true })
  wholePrec: String;

  @Prop()
  judge: String;
}

export const PrecSchema = SchemaFactory.createForClass(Prec);
