import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from '../strategies/access-token.strategy';
import { RefreshTokenStrategy } from '../strategies/refresh-token.strategy';
import {MulterModule} from "@nestjs/platform-express";

@Module({
  imports: [
    JwtModule.register({}),
    MulterModule.register({dest: './uploads'}),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
