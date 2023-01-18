import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Role} from 'prisma';
import {RoleDto} from "./dto/role.dto";
@Injectable()

export class RoleService {
    constructor(private _prisma: PrismaService) {}

    async getAllRoles(): Promise<Role[]>{
        const roles = await this._prisma.role.findMany();
        return roles;
    }

    async getRolesById(roleId: number): Promise<Role>{
        const role = await this._prisma.role.findUnique({
            where: {
                id: roleId
            },
        });
        if (!role){
            throw new NotFoundException('Role not found')
        }
        return role;
    }

    async createNewRole(roleDto:RoleDto): Promise<Role>{
        try {
            return await this._prisma.role.create({
                data:{
                    FK_member_id: roleDto.memberId,
                    FK_member_type_id:roleDto.memberTypeId
                },
            });
        }catch (ex: any){
            throw new InternalServerErrorException('Role not created');
        }
    }

    async deleteRole(roleId: number): Promise<Role> {
        try {
            return await this._prisma.role.delete({
                where: {
                    id: roleId,
                },
            });
        }catch (ex:any){
            throw new NotFoundException('Role not found');
        }
    }

    async updateRole(roleId: number, roleDto:RoleDto){
        try {
            return await this._prisma.role.update({
                where: {
                    id: roleId,
                },
                data:{
                    FK_member_id: roleDto.memberId,
                    FK_member_type_id:roleDto.memberTypeId
                },
            });
    }catch (ex: any){
            throw new NotFoundException('Role not found');
        }
    }

}





