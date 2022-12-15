import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChallengeTypeDto } from './dto/create-challenge-type.dto';

@Injectable()
export class ChallengeTypeService {
  constructor(private _prisma: PrismaService) {}

  async createChallengeType(crateChallengeTypeDto: CreateChallengeTypeDto) {
    try {
      return await this._prisma.challenge_Type.create({
        data: {
          type: crateChallengeTypeDto.type,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(
        'Challenge-Type could not be created',
      );
    }
  }

  async getChallengeTypeFromId(challengeTypeId: number) {
    try {
      return await this._prisma.challenge_Type.findUnique({
        where: {
          id: challengeTypeId,
        },
      });
    } catch (err) {
      throw new NotFoundException(
        'Challenge-Type with specified id could not be found',
      );
    }
  }

  async removeChallengeType(challengeTypeId: number) {
    try {
      return await this._prisma.challenge_Type.delete({
        where: {
          id: challengeTypeId,
        },
      });
    } catch (err) {
      throw new NotFoundException(
        'Challenge-Type with specified id could not be found',
      );
    }
  }
}
