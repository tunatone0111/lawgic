import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  username: String;

  @IsString({ each: true })
  likedPrecs: String[];
}
