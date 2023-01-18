import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { MemberModule } from './member/member.module';
import { RoleModule } from './role/role.module';
import { MemberTypeModule } from './member-type/member-type.module';
import { PostModule } from './post/post.module';
import { ChallengeTagModule } from './challenge_tag/challenge_tag.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule,MemberModule, RoleModule, MemberTypeModule, PostModule, ChallengeTagModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
