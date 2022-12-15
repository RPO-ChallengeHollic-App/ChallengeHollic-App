import { Module } from '@nestjs/common';
import { ChallengeTypeService } from './challenge-type.service';
import { ChallengeTypeController } from './challenge-type.controller';

@Module({
  controllers: [ChallengeTypeController],
  providers: [ChallengeTypeService]
})
export class ChallengeTypeModule {}
