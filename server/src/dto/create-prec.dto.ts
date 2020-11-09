import { Issue } from 'src/schemas/issue.schema';
import { Prec } from 'src/schemas/prec.schema';

export class CreatePrecDto {
  Issues: Issue[];

  date: Date;

  refClauses: String[];

  refPrecs: Prec[];

  wholePrec: String;
}
