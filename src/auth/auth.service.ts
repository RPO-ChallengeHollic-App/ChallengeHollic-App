import {ForbiddenException, Injectable, InternalServerErrorException, NotFoundException} from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Tokens } from '../types/tokens.type';
import {InvalidClassException} from "@nestjs/core/errors/exceptions/invalid-class.exception";

@Injectable()
export class AuthService {
  constructor(
    private _prisma: PrismaService,
    private _jwt: JwtService,
    private _config: ConfigService,
  ) {}

  async signupLocal(dto: AuthDto) {
    try {
      const passwordHash = await this._hashData(dto.password);
      const newUser = await this._prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          password_hash: passwordHash,
        }
      })
      const tokens = await this._getTokens(
          newUser.id,
          newUser.email,
          newUser.username,
      );
      await this._updateRefreshToken(newUser.id, tokens.refresh_token);
      return tokens;
    } catch (err) {
      throw new InternalServerErrorException(`Unable to signup user. Username or email may already be taken`)
    }
  }
  //
  async signinLocal(dto: AuthDto) {
    const user = await this._prisma.user.findUnique({
      where: {
        id: 1,
      },
    });

    if (!user) {
      throw new NotFoundException('Access denied');
    }

    if (!(await argon.verify(user.password_hash, dto.password))) {
      throw new NotFoundException('Access denied');
    }
    const tokens = await this._getTokens(user.id, user.email, user.username);
    await this._updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(usedId: number) {
    await this._prisma.user.updateMany({
      where: {
        id: usedId,
        refresh_token_hash: {
          not: null,
        },
      },
      data: {
        refresh_token_hash: null,
      },
    });
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this._prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('Access denied');
    }
    if (!(await argon.verify(user.refresh_token_hash, refreshToken))) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this._getTokens(user.id, user.email, user.username);
    await this._updateRefreshToken(userId, tokens.refresh_token);
    return tokens;
  }

  private async _updateRefreshToken(userId: number, refreshToken: string) {
    const hash = await this._hashData(refreshToken);
    await this._prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refresh_token_hash: hash,
      },
    });
  }

  private _hashData(data: string): Promise<string> {
    return argon.hash(data);
  }

  private async _getTokens(
    userId: number,
    email: string,
    username: string,
  ): Promise<Tokens> {
    const accessToken = await this._jwt.signAsync(
      {
        uid: userId,
        email: email,
        username: username,
      },
      {
        secret: this._config.get('JWT_SECRET'),
        expiresIn: 60 * 15, // 15min
      },
    );

    const refreshToken = await this._jwt.signAsync(
      {
        uid: userId,
        email: email,
        username: username,
      },
      {
        secret: this._config.get('JWT_REFRESH_SECRET'),
        expiresIn: 60 * 60 * 24 * 7, // 7days
      },
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
