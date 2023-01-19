import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import { MemberType } from 'prisma';
import {MemberTypeDto} from "./dto/memberType.dto";

@Injectable()
export class MemberTypeService {
    constructor(private _prisma: PrismaService) {}

    async getAllMemberTypes(): Promise<MemberType[]>{
        const memberTypes = await this._prisma.member_Type.findMany();
        return memberTypes;
    }

    async getMemberTypesId(memberTypeId: number): Promise<MemberType>{
        const member = await this._prisma.member_Type.findUnique({
            where: {
                id: memberTypeId
            },
        });
        if (!member){
            throw new NotFoundException('Member Type not found')
        }
        return member;
    }

    async createNewMemberType(memberTypeDto:MemberTypeDto): Promise<MemberType>{
        try {
            return await this._prisma.member_Type.create({
                data:{
                    id:memberTypeDto.memberTypeId,
                    type:memberTypeDto.type
                },
            });
        }catch (ex: any){
            throw new InternalServerErrorException('Member Type not created');
        }
    }

    async deleteMemberType(memberTypeId: number): Promise<MemberType> {
        try {
            return await this._prisma.member_Type.delete({
                where: {
                    id: memberTypeId,
                },
            });
        }catch (ex:any){
            throw new NotFoundException('Member Type not found');
        }
    }

    async updateMemberType(memberTypeId: number, memberTypeDto:MemberTypeDto){
        try {
            return await this._prisma.member_Type.update({
                where: {
                    id: memberTypeId,
                },
                data:{
                    id:memberTypeDto.memberTypeId,
                    type:memberTypeDto.type
                },
            });
    }catch (ex: any){
            throw new NotFoundException('Member Type not found');
        }
    }
}
