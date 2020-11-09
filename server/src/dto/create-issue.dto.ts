import { Prec } from 'src/schemas/prec.schema';

export class CreateIssueDto {
  text: string;
  embedding: number[];
  prec: Prec;
}
