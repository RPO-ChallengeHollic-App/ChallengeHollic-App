import { IsDecimal, IsNumber } from 'class-validator';
export class CreatePlacementDto {
  @IsNumber()
  place: number;

  @IsDecimal()
  points: number;
}
