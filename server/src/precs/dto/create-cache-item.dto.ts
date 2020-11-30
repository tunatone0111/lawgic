import { IsNumber, ValidateNested } from 'class-validator';
import { CachedPrec } from '../schemas/cachedItem.schema';

export class CreateCacheItemDto {
  @IsNumber({}, { each: true })
  readonly vector: Number[];

  @ValidateNested({ each: true })
  readonly precs: CachedPrec[];
}
