import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlacementDto } from './dto/create-placement.dto';

@Injectable()
export class PlacementService {
  constructor(private readonly _prisma: PrismaService) {}

  async createPlacement(createPlacementDto: CreatePlacementDto) {
    try {
      return await this._prisma.placement.create({
        data: {
          place: createPlacementDto.place,
          points: createPlacementDto.points,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException('Placement could not be created');
    }
  }

  async getPlacementFromId(placementId: number) {
    try {
      return await this._prisma.placement.findUnique({
        where: {
          id: placementId,
        },
      });
    } catch (err) {
      throw new NotFoundException('Placement does not exists');
    }
  }

  async removePlacement(placementId: number) {
    try {
      return this._prisma.placement.delete({
        where: {
          id: placementId,
        },
      });
    } catch (err) {
      throw new NotFoundException('Placement does not exists');
    }
  }
}
