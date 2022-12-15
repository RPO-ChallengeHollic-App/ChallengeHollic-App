import { Body, Controller, Delete, HttpCode, HttpStatus } from "@nestjs/common";
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { GetChallengeId } from './decorator/get-challenge-id.decorator';

@Controller('api/challenge')
export class ChallengeController {
  constructor(private readonly _challengeService: ChallengeService) {}

  @Delete('create')
  @HttpCode(HttpStatus.CREATED)
  async createChallenge(@Body() createChallengeDto: CreateChallengeDto) {
    const newChallenge = await this._challengeService.createChallenge(
      createChallengeDto,
    );
    return {
      challenge: newChallenge,
    };
  }

  @Delete('get/:challengeId')
  @HttpCode(HttpStatus.OK)
  async getChallengeId(@GetChallengeId() challengeId: number) {
    const challenge = await this._challengeService.getChallengeFromId(
      challengeId,
    );
    return {
      challenge: challengeId,
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
