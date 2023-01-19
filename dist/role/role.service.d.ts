import { PrismaService } from "../prisma/prisma.service";
import { Role } from 'prisma';
import { RoleDto } from "./dto/role.dto";
export declare class RoleService {
    private _prisma;
    constructor(_prisma: PrismaService);
    getAllRoles(): Promise<Role[]>;
    getRolesById(roleId: number): Promise<Role>;
    createNewRole(roleDto: RoleDto): Promise<Role>;
    deleteRole(roleId: number): Promise<Role>;
    updateRole(roleId: number, roleDto: RoleDto): Promise<import(".prisma/client").Role>;
}
