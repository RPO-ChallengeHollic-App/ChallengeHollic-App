import { Module } from '@nestjs/common';
import { MemberTypeController } from './member-type.controller';
import { MemberTypeService } from './member-type.service';

@Module({
  controllers: [MemberTypeController],
  providers: [MemberTypeService]
})
export class MemberTypeModule {}
