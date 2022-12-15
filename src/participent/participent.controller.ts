import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ParticipentService } from './participent.service';
import { CreateParticipentDto } from './dto/create-participent.dto';
import { GetParticipentId } from './decorator/get-placement-id.decorator';

@Controller('api/participent')
export class ParticipentController {
  constructor(private readonly _participentService: ParticipentService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createParticipent(@Body() createParticipentDto: CreateParticipentDto) {
    const newParticipent = await this._participentService.createParticipent(
      createParticipentDto,
    );
    return {
      participent: newParticipent,
    };
  }

  @Get('get/:participentId')
  @HttpCode(HttpStatus.OK)
  async getParticipentFromId(@GetParticipentId() participentId: number) {
    const participent = await this._participentService.getParticipentFromId(
      participentId,
    );
    return {
      participent: participent,
    };
  }

  @Delete('remove/:participentId')
  @HttpCode(HttpStatus.OK)
  async removeParticipent(@GetParticipentId() participentId: number) {
    const participent = await this._participentService.removeParticipent(
      participentId,
    );
    return {
      participent: participent,
    };
  }
}
