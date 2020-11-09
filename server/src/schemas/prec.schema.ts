import { Types } from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Issue } from './issue.schema';

export type PrecDocument = Prec & Document;

@Schema()
export class Prec {
  @Prop({ type: [Types.ObjectId], ref: Issue.name })
  Issues: Issue[];

  @Prop({ required: true })
  date: Date;

  @Prop()
  refClauses: String[];

  @Prop({ type: [Types.ObjectId], ref: Prec.name })
  refPrecs: Prec[];

  @Prop({ required: true })
  wholePrec: String;
}

export const PrecSchema = SchemaFactory.createForClass(Prec);
