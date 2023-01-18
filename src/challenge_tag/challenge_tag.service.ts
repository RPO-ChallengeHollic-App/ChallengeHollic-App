import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {ChallengeTagDto} from "./dto/challengeTag.dto";
import { ChallengeTag } from 'prisma';
@Injectable()
export class ChallengeTagService {
    constructor(private _prisma: PrismaService) {}

    async getAllChallengeTags(): Promise<ChallengeTag[]>{
        const challengeTag = await this._prisma.challenge_Tag.findMany();
        return challengeTag;
    }

    async getChallengeTagsById(challengeTagId: number): Promise<ChallengeTag>{
        const challengeTag = await this._prisma.challenge_Tag.findUnique({
            where: {
                id: challengeTagId
            },
        });
        if (!challengeTag){
            throw new NotFoundException('Challenge tag not found')
        }
        return challengeTag;
    }

    async createNewChallengeTag(challengeTagDto:ChallengeTagDto): Promise<ChallengeTag>{
        try {
            return await this._prisma.challenge_Tag.create({
                data:{
                    FK_challenge_id: challengeTagDto.challengeId,
                    FK_tag_id:challengeTagDto.tagId
                },
            });
        }catch (ex: any){
            throw new InternalServerErrorException('Challenge tag not created');
        }
    }

    async deleteChallengeTag(challengeTagId: number): Promise<ChallengeTag> {
        try {
            return await this._prisma.challenge_Tag.delete({
                where: {
                    id: challengeTagId,
                },
            });
        }catch (ex:any){
            throw new NotFoundException('Challenge tag not found');
        }
    }

    async updateChallengeTag(challengeTagId: number, challengeTagDto:ChallengeTagDto){
        try {
            return await this._prisma.challenge_Tag.update({
                where: {
                    id: challengeTagId,
                },
                data:{
                    FK_challenge_id: challengeTagDto.challengeId,
                    FK_tag_id:challengeTagDto.tagId
                },
            });
        }catch (ex: any){
            throw new NotFoundException('Challenge tag not found');
        }
    }

}
