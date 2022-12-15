import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChallengeTypeDto {
  @IsString()
  @IsNotEmpty()
  type: string;
}
