import { RoleService } from "../role/role.service";
import { Role } from 'prisma';
import { RoleDto } from "./dto/role.dto";
export declare class RoleController {
    private _roleService;
    constructor(_roleService: RoleService);
    getAllRoles(): Promise<Role[]>;
    getRolesId(memberId: number): Promise<Role>;
    createRole(roleDto: RoleDto): Promise<{
        message: Role;
    }>;
    deleteRole(roleId: number): Promise<void>;
    updateRole(roleId: number, roleDto: RoleDto): Promise<{
        role: Role;
    }>;
}
