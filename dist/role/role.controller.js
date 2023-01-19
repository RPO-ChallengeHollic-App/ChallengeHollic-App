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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const get_role_id_param_decorator_1 = require("./decorator/get-role-id.param.decorator");
const role_service_1 = require("../role/role.service");
const role_dto_1 = require("./dto/role.dto");
let RoleController = class RoleController {
    constructor(_roleService) {
        this._roleService = _roleService;
    }
    async getAllRoles() {
        return await this._roleService.getAllRoles();
    }
    async getRolesId(memberId) {
        return await this._roleService.getRolesById(memberId);
    }
    async createRole(roleDto) {
        const newRole = await this._roleService.createNewRole(roleDto);
        return {
            message: newRole,
        };
    }
    async deleteRole(roleId) {
        await this._roleService.deleteRole(roleId);
    }
    async updateRole(roleId, roleDto) {
        const updaterole = await this._roleService.updateRole(roleId, roleDto);
        return {
            role: updaterole,
        };
    }
};
__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getAllRoles", null);
__decorate([
    (0, common_1.Get)(':roleId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, get_role_id_param_decorator_1.GetRoleIdParamDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getRolesId", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.RoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "createRole", null);
__decorate([
    (0, common_1.Delete)(':roleId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, get_role_id_param_decorator_1.GetRoleIdParamDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "deleteRole", null);
__decorate([
    (0, common_1.Patch)(':roleId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, get_role_id_param_decorator_1.GetRoleIdParamDecorator)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, role_dto_1.RoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "updateRole", null);
RoleController = __decorate([
    (0, common_1.Controller)('role'),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map