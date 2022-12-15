import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import {AuthModule} from "./auth/auth.module";
import { PlacementModule } from './placement/placement.module';
import { ParticipentModule } from './participent/participent.module';
import { SimpleCalcModule } from './simple_calc/simple_calc.module';
import { ChallangeModule } from './challange/challange.module';
import { ChallengeModule } from './challenge/challenge.module';
import { ChallengeTypeModule } from './challenge-type/challenge-type.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, PlacementModule, ParticipentModule, SimpleCalcModule, ChallangeModule, ChallengeModule, ChallengeTypeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
