import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ChallengeTypeService } from './challenge-type.service';
import { CreateChallengeTypeDto } from './dto/create-challenge-type.dto';
import { GetChallengeTypeId } from './decorator/get-challenge.type-id.decorator';

@Controller('api/challenge-type')
export class ChallengeTypeController {
  constructor(private readonly _challengeTypeService: ChallengeTypeService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createChallengeType(
    @Body() createChallengeType: CreateChallengeTypeDto,
  ) {
    const newChallengeType =
      await this._challengeTypeService.createChallengeType(createChallengeType);
    return {
      challengeTyper: newChallengeType,
    };
  }

  @Get('get/:challengeTypeId')
  @HttpCode(HttpStatus.OK)
  async getChallengeTypeId(@GetChallengeTypeId() challengeTypeId: number) {
    const challengeType =
      await this._challengeTypeService.getChallengeTypeFromId(challengeTypeId);
    return {
      challengeType: challengeType,
    };
  }

  @Delete('delete/:challengeTypeId')
  @HttpCode(HttpStatus.OK)
  async removeChallengeType(@GetChallengeTypeId() challengeTypeId: number) {
    const challengeType = await this._challengeTypeService.removeChallengeType(
      challengeTypeId,
    );
    return {
      challengeType: challengeType,
    };
  }
}
