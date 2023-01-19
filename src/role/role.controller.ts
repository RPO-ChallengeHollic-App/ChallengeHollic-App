import {Patch,Post,Body,Controller, Delete, Get, HttpCode, HttpStatus} from '@nestjs/common';
import {GetRoleIdParamDecorator} from "./decorator/get-role-id.param.decorator";
import {RoleService} from "../role/role.service";
import { Role } from 'prisma';
import {RoleDto} from "./dto/role.dto";

@Controller('role')
export class RoleController {
    constructor(private _roleService: RoleService) {}

    @Get('all')
    @HttpCode(HttpStatus.OK)
    async getAllRoles(): Promise<Role[]>{
        return await this._roleService.getAllRoles()
    }

    @Get(':roleId')
    @HttpCode(HttpStatus.OK)
    async getRolesId(@GetRoleIdParamDecorator() memberId: number){
        return await this._roleService.getRolesById(memberId)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createRole(@Body() roleDto:RoleDto){
        const newRole = await this._roleService.createNewRole(roleDto)
        return {
            message: newRole,
        };
    }

    @Delete(':roleId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteRole(@GetRoleIdParamDecorator() roleId: number): Promise<void>{
        await this._roleService.deleteRole(roleId);
    }

    @Patch(':roleId')
    @HttpCode(HttpStatus.OK)
    async updateRole(@GetRoleIdParamDecorator() roleId: number,@Body() roleDto: RoleDto):Promise<{role: Role}>{
        const updaterole = await this._roleService.updateRole(roleId,roleDto);
        return {
            role: updaterole,
        };
    }
}
