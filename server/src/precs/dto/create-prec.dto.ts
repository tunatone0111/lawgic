import { IsArray, IsDate, IsString } from 'class-validator';
import { Issue } from 'src/issues/schemas/issue.schema';
import { Prec } from 'src/precs/schemas/prec.schema';

export class CreatePrecDto {
  @IsString({ each: true })
  readonly Issues: Issue[];

  @IsDate()
  readonly date: Date;

  @IsString({ each: true })
  readonly refClauses?: String[];

  @IsString({ each: true })
  readonly refPrecs?: Prec[];

  @IsString()
  readonly wholePrec: String;
}
