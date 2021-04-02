import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type IssueDocument = Issue & Document;

@Schema()
export class Issue {
  @Prop({ required: true })
  text: string;

  @Prop()
  embedding: number[];

  @Prop({ required: true })
  prec: string;

  @Prop()
  refPrecs: string[];
}

export const IssueSchema = SchemaFactory.createForClass(Issue);
