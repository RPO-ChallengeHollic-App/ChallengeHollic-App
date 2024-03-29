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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const image_file_validator_1 = require("../shared/validators/file/image-file.validator");
const multer_1 = require("multer");
const signin_dto_1 = require("./dto/signin.dto");
const signup_dto_1 = require("./dto/signup.dto");
let AuthController = class AuthController {
    constructor(_authService) {
        this._authService = _authService;
    }
    async signupLocal(req, profileImage, dto) {
        if (req.fileValidationError) {
            throw new common_1.BadRequestException(req.fileValidationError);
        }
        const tokens = await this._authService.signupLocal(dto, profileImage);
        return {
            tokens: tokens,
        };
    }
    async signinLocal(dto) {
        const tokens = await this._authService.signinLocal(dto);
        return {
            tokens: tokens,
        };
    }
    logout(req) {
        const user = req.user;
        this._authService.logout(user['uid']);
    }
    async refreshToken(req) {
        const user = req.user;
        const refreshToken = await this._authService.refreshToken(user['uid'], user['refreshToken']);
        return {
            token: refreshToken,
        };
    }
};
__decorate([
    (0, common_1.Post)('local/signup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profile_image', {
        limits: {
            fileSize: 5e6,
        },
        fileFilter: image_file_validator_1.imageFileValidator,
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                callback(null, `${uniquePrefix}-${file.originalname}`);
            },
        }),
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, signup_dto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signupLocal", null);
__decorate([
    (0, common_1.Post)('local/signin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_dto_1.SigninDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signinLocal", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt-refresh')),
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
AuthController = __decorate([
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map