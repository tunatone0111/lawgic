import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CachedPrec = {
  precId: String;
  date: Date;
  title: String;
  caseNum: String;
  issues: String[];
  courtOrder: Number;
  isEnBanc: Boolean;
  citationCount: Number;
  sim: Number;
};

export type CachedItemDocument = CachedItem & Document;

@Schema({ collection: 'Cache' })
export class CachedItem {
  @Prop({ required: true })
  vector: Number[];

  @Prop({ required: true })
  precs: CachedPrec[];
}

export const CachedItemSchema = SchemaFactory.createForClass(CachedItem);
