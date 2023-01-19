import {IsDate, IsDateString, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateChallengeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  start_data?: string;

  @IsDateString()
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
