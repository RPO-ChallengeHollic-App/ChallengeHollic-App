import { Module } from '@nestjs/common';
import { ChallengeTagController } from './challenge_tag.controller';
import { ChallengeTagService } from './challenge_tag.service';

@Module({
  controllers: [ChallengeTagController],
  providers: [ChallengeTagService]
})
export class ChallengeTagModule {}
