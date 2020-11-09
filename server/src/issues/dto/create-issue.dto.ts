import { IsNumber, IsString, Length } from 'class-validator';
import { Prec } from 'src/precs/schemas/prec.schema';

export class CreateIssueDto {
  @IsString()
  readonly text: string;

  @IsNumber()
  @Length(10)
  readonly embedding: number[];

  @IsString()
  readonly prec: Prec;
}
