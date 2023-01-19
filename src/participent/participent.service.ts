import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParticipentDto } from './dto/create-participent.dto';
@Injectable()
export class ParticipentService {
  constructor(private readonly _prisma: PrismaService) {}

  async createParticipent(createParticipentDto: CreateParticipentDto) {
    try {
      return await this._prisma.participent.create({
        data: {
          FK_placement_id: createParticipentDto.placementId,
          FK_challenge_id: createParticipentDto.challengeId,
          FK_member_id: createParticipentDto.memberId,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(
        'Particioent could not be created',
      );
    }
  }

  async getParticipentFromId(participentId: number) {
    try {
      return await this._prisma.participent.findUnique({
        where: {
          id: participentId,
        },
      });
    } catch (err) {
      throw new NotFoundException('Participent not found');
    }
  }

  async removeParticipent(participentId: number) {
    try {
      return await this._prisma.participent.delete({
        where: {
          id: participentId,
        },
      });
    } catch (err) {
      throw new NotFoundException('Participent not found');
    }
  }

}
