import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req, UploadedFile,
  UseGuards, UseInterceptors,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from '../types/tokens.type';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('api/auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('profile_image'))
  signupLocal(@UploadedFile() profileImage: Express.Multer.File, @Body() dto: AuthDto): Promise<Tokens> {
    return this._authService.signupLocal(dto);
  }

  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this._authService.signinLocal(dto);
  }

  // 'jwt' because name of our strategy is jwt
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
    const user = req.user;
    this._authService.logout(user['uid']);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() req: Request) {
    const user = req.user;
    return await this._authService.refreshToken(
      user['uid'],
      user['refreshToken'],
    );
  }
}
