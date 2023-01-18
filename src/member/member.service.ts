import {Injectable, InternalServerErrorException, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {Member} from 'prisma';
import {CreateMemberDto} from "./dto/create-member.dto";
@Injectable()

export class MemberService{
    constructor(private _prisma: PrismaService) {}

    async getAllMembers(): Promise<Member[]>{
        const member = await this._prisma.member.findMany();
        return member;
    }

    async getMembersById(memberId: number): Promise<Member>{
        const member = await this._prisma.member.findUnique({
           where: {
               id: memberId
           },
        });
        if (!member){
            throw new NotFoundException('Member not found')
        }
        return member;
    }

    async createNewMember(memberDto:CreateMemberDto): Promise<Member>{
        try {
            return await this._prisma.member.create({
                data:{
                    FK_group_id: memberDto.groupId,
                    FK_user_id: memberDto.userId,
                    nickname: memberDto.nickname
                },
            });
        }catch (ex: any){
            throw new InternalServerErrorException('Member not created');
        }
    }

    async deleteMember(memberId: number): Promise<Member> {
        try {
            return await this._prisma.member.delete({
                    where: {
                    id: memberId,
                },
            });
        }catch (ex:any){
            throw new NotFoundException('Member not found');
        }
    }

    async updateMember(memberId: number, memberDto:CreateMemberDto){
        try {
            return await this._prisma.member.update({
                where: {
                    id: memberId,
                },
                data:{
                    FK_group_id: memberDto.groupId,
                    FK_user_id: memberDto.userId,
                    nickname: memberDto.nickname
                },
            });
    }catch (ex: any){
            throw new NotFoundException('Member not found');
        }
    }
}