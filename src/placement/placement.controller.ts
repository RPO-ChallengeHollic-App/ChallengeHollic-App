import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { PlacementService } from './placement.service';
import { CreatePlacementDto } from './dto/create-placement.dto';
import { GetPlacementId } from './decorator/get-placement-id.decorator';

@Controller('api/placement')
export class PlacementController {
  constructor(private readonly _placementService: PlacementService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createPlacement(@Body() createPlacementDto: CreatePlacementDto) {
    const newPlacement = await this._placementService.createPlacement(
      createPlacementDto,
    );
    return {
      placement: newPlacement,
    };
  }

  @Get('get/:placementId')
  @HttpCode(HttpStatus.OK)
  async getPlacementById(@GetPlacementId() placementId: number) {
    const placement = await this._placementService.getPlacementFromId(
      placementId,
    );
    return {
      placement: placement,
    };
  }

  @Delete('remove/:placementId')
  @HttpCode(HttpStatus.OK)
  async removePlacement(@GetPlacementId() placementId: number) {
    const placement = await this._placementService.removePlacement(placementId);
    return {
      placement: placement,
    };
  }
}
