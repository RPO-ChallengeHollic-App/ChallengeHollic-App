"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(_prisma, _jwt, _config) {
        this._prisma = _prisma;
        this._jwt = _jwt;
        this._config = _config;
    }
    async signupLocal(dto, profileImageFile) {
        try {
            let profileImage = null;
            const passwordHash = await this._hashData(dto.password);
            if (profileImageFile) {
                profileImage = await this._prisma.media.create({
                    data: {
                        FK_media_type_id: 2,
                        path: profileImageFile.originalname,
                    }
                });
            }
            const newUser = await this._prisma.user.create({
                data: {
                    username: dto.username,
                    email: dto.email,
                    password_hash: passwordHash,
                    FK_media_id: profileImage ? profileImage.id : null
                },
            });
            const tokens = await this._getTokens(newUser.id, newUser.email, newUser.username);
            await this._updateRefreshToken(newUser.id, tokens.refresh_token);
            return tokens;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(`Unable to signup user. Username or email may already be taken`);
        }
    }
    async signinLocal(dto) {
        const user = await this._prisma.user.findFirst({
            where: {
                OR: [
                    { email: dto.username },
                    { username: dto.username }
                ]
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Access denied');
        }
        if (!(await argon.verify(user.password_hash, dto.password))) {
            throw new common_1.NotFoundException('Access denied');
        }
        const tokens = await this._getTokens(user.id, user.email, user.username);
        await this._updateRefreshToken(user.id, tokens.refresh_token);
        return tokens;
    }
    async logout(usedId) {
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
    async refreshToken(userId, refreshToken) {
        const user = await this._prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Access denied');
        }
        if (!(await argon.verify(user.refresh_token_hash, refreshToken))) {
            throw new common_1.ForbiddenException('Access Denied');
        }
        const tokens = await this._getTokens(user.id, user.email, user.username);
        await this._updateRefreshToken(userId, tokens.refresh_token);
        return tokens;
    }
    async _updateRefreshToken(userId, refreshToken) {
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
    _hashData(data) {
        return argon.hash(data);
    }
    async _getTokens(userId, email, username) {
        const accessToken = await this._jwt.signAsync({
            uid: userId,
            email: email,
            username: username,
        }, {
            secret: this._config.get('JWT_SECRET'),
            expiresIn: 60 * 15,
        });
        const refreshToken = await this._jwt.signAsync({
            uid: userId,
            email: email,
            username: username,
        }, {
            secret: this._config.get('JWT_REFRESH_SECRET'),
            expiresIn: 60 * 60 * 24 * 7,
        });
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map