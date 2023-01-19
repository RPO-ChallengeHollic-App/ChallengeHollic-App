import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import {AuthModule} from "./auth/auth.module";
import { PlacementModule } from './placement/placement.module';
import { ParticipentModule } from './participent/participent.module';
import { ChallengeModule } from './challenge/challenge.module';
import { ChallengeTypeModule } from './challenge-type/challenge-type.module';
import {MulterModule} from "@nestjs/platform-express";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    PlacementModule,
    ParticipentModule,
    ChallengeModule,
    ChallengeModule,
    ChallengeTypeModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
