import {Body,Post,Patch,Controller, Delete, Get, HttpCode, HttpStatus} from '@nestjs/common';
import {MemberTypeService} from "./member-type.service";
import {GetMemberTypeIdParamDecorator} from "./decorator/get-memberType-id.param.decorator";
import { MemberType } from 'prisma';
import {MemberTypeDto} from "./dto/memberType.dto";

@Controller('member-type')
export class MemberTypeController {
    constructor(private _memberTypeService: MemberTypeService) {}

    @Get('all')
    @HttpCode(HttpStatus.OK)
    async getAllMemberTypes(): Promise<MemberType[]>{
        return await this._memberTypeService.getAllMemberTypes()
    }

    @Get(':memberTypeId')
    @HttpCode(HttpStatus.OK)
    async getMemberTypesId(@GetMemberTypeIdParamDecorator() memberTypeId: number){
        return await this._memberTypeService.getMemberTypesId(memberTypeId)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createMemberType(@Body() memberTypeDto:MemberTypeDto){
        const newMemberType = await this._memberTypeService.createNewMemberType(memberTypeDto)
        return {
            message: newMemberType,
        };
    }

    @Delete(':memberTypeId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteMemberType(@GetMemberTypeIdParamDecorator() memberTypeId: number): Promise<void>{
        await this._memberTypeService.deleteMemberType(memberTypeId);
    }

    @Patch(':memberTypeId')
    @HttpCode(HttpStatus.OK)
    async updateMemberType(@GetMemberTypeIdParamDecorator() memberTypeId: number,@Body() memberTypeDto: MemberTypeDto):Promise<{memberType: MemberType}>{
        const updatememberType = await this._memberTypeService.updateMemberType(memberTypeId,memberTypeDto);
        return {
            memberType: updatememberType,
        };
    }
}
