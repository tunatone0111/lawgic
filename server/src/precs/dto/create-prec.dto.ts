import { Issue } from 'src/issues/schemas/issue.schema';
import { Prec } from 'src/precs/schemas/prec.schema';

export class CreatePrecDto {
  Issues: Issue[];
  date: Date;
  refClauses: String[];
  refPrecs: Prec[];
  wholePrec: String;
}
