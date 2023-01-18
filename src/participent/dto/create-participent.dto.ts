import { IsDecimal, IsNumber } from 'class-validator';
export class CreateParticipentDto {
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  })
  memberId: number;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  })
  challengeId: number;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  })
  placementId: number;
}
