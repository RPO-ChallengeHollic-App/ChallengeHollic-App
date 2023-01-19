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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RoleService = class RoleService {
    constructor(_prisma) {
        this._prisma = _prisma;
    }
    async getAllRoles() {
        const roles = await this._prisma.role.findMany();
        return roles;
    }
    async getRolesById(roleId) {
        const role = await this._prisma.role.findUnique({
            where: {
                id: roleId
            },
        });
        if (!role) {
            throw new common_1.NotFoundException('Role not found');
        }
        return role;
    }
    async createNewRole(roleDto) {
        try {
            return await this._prisma.role.create({
                data: {
                    FK_member_id: roleDto.memberId,
                    FK_member_type_id: roleDto.memberTypeId
                },
            });
        }
        catch (ex) {
            throw new common_1.InternalServerErrorException('Role not created');
        }
    }
    async deleteRole(roleId) {
        try {
            return await this._prisma.role.delete({
                where: {
                    id: roleId,
                },
            });
        }
        catch (ex) {
            throw new common_1.NotFoundException('Role not found');
        }
    }
    async updateRole(roleId, roleDto) {
        try {
            return await this._prisma.role.update({
                where: {
                    id: roleId,
                },
                data: {
                    FK_member_id: roleDto.memberId,
                    FK_member_type_id: roleDto.memberTypeId
                },
            });
        }
        catch (ex) {
            throw new common_1.NotFoundException('Role not found');
        }
    }
};
RoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map