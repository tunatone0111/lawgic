import {
  ArrayMaxSize,
  ArrayMinSize,
  IsMongoId,
  IsNumber,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateIssueDto {
  @IsString()
  readonly text: string;

  @IsNumber({}, { each: true })
  @ArrayMinSize(10)
  @ArrayMaxSize(768)
  readonly embedding: number[];

  @IsMongoId()
  readonly prec?: Types.ObjectId;
}
