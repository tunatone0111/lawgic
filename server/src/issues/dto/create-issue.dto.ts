import { Prec } from 'src/precs/schemas/prec.schema';

export class CreateIssueDto {
  text: string;
  embedding: number[];
  prec: Prec;
}
