import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Post} from "@nestjs/common";
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { GetChallengeId } from './decorator/get-challenge-id.decorator';

@Controller('api/challenge')
export class ChallengeController {
  constructor(private readonly _challengeService: ChallengeService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createChallenge(@Body() createChallengeDto: CreateChallengeDto) {
    const newChallenge = await this._challengeService.createChallenge(
      createChallengeDto,
    );
    return {
      challenge: newChallenge,
    };
  }

  @Get('get/:challengeId')
  @HttpCode(HttpStatus.OK)
  async getChallengeFromId(@GetChallengeId() challengeId: number) {
    const challenge = await this._challengeService.getChallengeFromId(
      challengeId,
    );
    return {
      challenge: challenge,
    };
  }

  @Delete('delete/:challengeId')
  @HttpCode(HttpStatus.OK)
  async removeChallenge(@GetChallengeId() challengeId: number) {
    const removedChallenge = await this._challengeService.removeChallenge(
      challengeId,
    );
    return {
      challenge: removedChallenge,
    };
  }
}
