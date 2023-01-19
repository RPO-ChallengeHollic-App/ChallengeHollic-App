/// <reference types="multer" />
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Tokens } from "../shared/types/tokens.type";
import { SigninDto } from "./dto/signin.dto";
import { SignupDto } from "./dto/signup.dto";
export declare class AuthService {
    private _prisma;
    private _jwt;
    private _config;
    constructor(_prisma: PrismaService, _jwt: JwtService, _config: ConfigService);
    signupLocal(dto: SignupDto, profileImageFile?: Express.Multer.File): Promise<Tokens>;
    signinLocal(dto: SigninDto): Promise<Tokens>;
    logout(usedId: number): Promise<void>;
    refreshToken(userId: number, refreshToken: string): Promise<Tokens>;
    private _updateRefreshToken;
    private _hashData;
    private _getTokens;
}
