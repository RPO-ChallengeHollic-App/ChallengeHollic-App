import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateChallengeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  start_data?: string;

  @IsDate()
  deadline?: string;

  @IsNumber({
    maxDecimalPlaces: 0,
    allowInfinity: false,
  })
  typeId: number;

  @IsNumber({
    maxDecimalPlaces: 0,
    allowInfinity: false,
  })
  groupId: number;
}
