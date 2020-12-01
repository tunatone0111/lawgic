import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CachedPrec = {
  precId: Types.ObjectId;
  title: String;
  issues: String[];
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
