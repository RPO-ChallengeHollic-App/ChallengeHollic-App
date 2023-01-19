import { Module } from '@nestjs/common';
import { ParticipentService } from './participent.service';
import { ParticipentController } from './participent.controller';

@Module({
  controllers: [ParticipentController],
  providers: [ParticipentService]
})
export class ParticipentModule {}
