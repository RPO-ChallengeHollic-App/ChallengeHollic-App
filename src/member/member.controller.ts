import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import { MemberService } from "./member.service";
import { Member } from 'prisma';
import {GetMemberIdParamDecorator} from "./decorator/get-member-id.param.decorator";
import {CreateMemberDto} from "./dto/create-member.dto";

@Controller('api/member')
export class MemberController{
    constructor(private _memberService: MemberService) {}

    @Get('all')
    @HttpCode(HttpStatus.OK)
    async getAllMembers(): Promise<Member[]>{
        return await this._memberService.getAllMembers()
    }

    @Get(':memberId')
    @HttpCode(HttpStatus.OK)
    async getMembersId(@GetMemberIdParamDecorator() memberId: number){
        return await this._memberService.getMembersById(memberId)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createNewMember(@Body() createMemberDto:CreateMemberDto): Promise<{member: Member}>{
        const newMember = await this._memberService.createNewMember(createMemberDto)
        return {
            member: newMember,
        };
    }

    @Delete(':memberId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteMember(@GetMemberIdParamDecorator() memberId: number): Promise<void>{
        await this._memberService.deleteMember(memberId);
    }

    @Patch(':memberId')
    @HttpCode(HttpStatus.OK)
    async updateMember(@GetMemberIdParamDecorator() memberId: number,@Body() memberDto: CreateMemberDto):Promise<{member: Member}>{
        const updateMember = await this._memberService.updateMember(memberId,memberDto);
        return {
            member: updateMember,
        };
    }
}


