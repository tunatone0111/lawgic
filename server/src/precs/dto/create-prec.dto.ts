import { IsDate, IsString } from 'class-validator';
import { Issue } from 'src/issues/schemas/issue.schema';
import { Prec } from 'src/precs/schemas/prec.schema';

// @Prop({ required: true })
//   title: String;

//   @Prop({ required: true })
//   date: Date;

//   @Prop({ required: true })
//   caseNum: String;

//   @Prop()
//   order: Number;

//   @Prop()
//   issues: string[];

//   @Prop()
//   refClauses: String[][];

//   @Prop()
//   refPrecs: string[][];

//   @Prop({ required: true })
//   wholePrec: String;

//   @Prop()
//   judge: String;

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
