import { Types } from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Prec } from './prec.schema';

export type IssueDocument = Issue & Document;

@Schema()
export class Issue {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  embedding: number[];

  @Prop({ type: Types.ObjectId, ref: 'Prec', default: null })
  prec: Prec;
}

export const IssueSchema = SchemaFactory.createForClass(Issue);
