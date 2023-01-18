import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import {MulterModule} from "@nestjs/platform-express";
import {AccessTokenStrategy} from "../shared/strategies/access-token.strategy";
import {RefreshTokenStrategy} from "../shared/strategies/refresh-token.strategy";

@Module({
  imports: [
    JwtModule.register({}),
    MulterModule.register({dest: './uploads'}),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
