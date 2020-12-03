import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PrecDocument = Prec & Document;

@Schema({ collection: 'Precs' })
export class Prec {
  @Prop({ required: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: String;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  caseNum: String;

  @Prop()
  courtOrder: Number;

  @Prop()
  isEnBanc: Boolean;

  @Prop()
  issues: string[];

  @Prop()
  order: Number;

  @Prop()
  yo: String[];

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
