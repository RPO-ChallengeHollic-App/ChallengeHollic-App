import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req, UploadedFile,
  UseGuards, UseInterceptors,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {FileInterceptor} from "@nestjs/platform-express";
import { Tokens } from 'src/shared/types/tokens.type';
import {imageFileValidator} from "../shared/validators/file/image-file.validator";
import {diskStorage} from "multer";

@Controller('api/auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('profile_image', {
    limits: {
      fileSize: 5e+6, // 5MB
    },
    fileFilter: imageFileValidator,
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniquePrefix: string = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        callback(null, `${uniquePrefix}-${file.originalname}`);
      }
    })
  }))
  signupLocal(
    @Req() req: any,
    @UploadedFile() profileImage: Express.Multer.File,
    @Body() dto: AuthDto
  ): Promise<Tokens> {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError)
    }
    return this._authService.signupLocal(dto, profileImage);
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
