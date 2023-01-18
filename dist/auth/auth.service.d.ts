import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Tokens } from '../types/tokens.type';
export declare class AuthService {
    private _prisma;
    private _jwt;
    private _config;
    constructor(_prisma: PrismaService, _jwt: JwtService, _config: ConfigService);
    signupLocal(dto: AuthDto): Promise<Tokens>;
    signinLocal(dto: AuthDto): Promise<Tokens>;
    logout(usedId: number): Promise<void>;
    refreshToken(userId: number, refreshToken: string): Promise<Tokens>;
    private _updateRefreshToken;
    private _hashData;
    private _getTokens;
}
