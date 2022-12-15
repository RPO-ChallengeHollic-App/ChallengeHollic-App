import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';

@Injectable()
export class ChallengeService {
  constructor(private _prisma: PrismaService) {}

  async createChallenge(createChallengeDto: CreateChallengeDto) {
    try {
      return await this._prisma.challenge.create({
        data: {
          name: createChallengeDto.name,
          FK_challenge_type_id: createChallengeDto.typeId,
          FK_group_id: createChallengeDto.groupId,
          deadline: createChallengeDto.deadline,
          start_date: createChallengeDto.start_data,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException('Challenge could not be created');
    }
  }

  async getChallengeFromId(challengeId: number) {
    try {
      return await this._prisma.challenge.findUnique({
        where: {
          id: challengeId,
        },
      });
    } catch (err) {
      throw new NotFoundException('Challenge could not be foudn');
    }
  }

  async removeChallenge(challengeId: number) {
    try {
      return await this._prisma.challenge.delete({
        where: {
          id: challengeId,
        },
      });
    } catch (err) {
      throw new NotFoundException('Challenge could not be foudn');
    }
  }
}
