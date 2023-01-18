import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post} from '@nestjs/common';
import {ChallengeTagService} from "./challenge_tag.service";
import { ChallengeTag } from 'prisma';
import {ChallengeTagDto} from "./dto/challengeTag.dto";
import {GetChallengeTagIdParamDecorator} from "./decorator/get-challengeTag-id.param.decorator";

@Controller('challenge-tag')
export class ChallengeTagController {
    constructor(private _challengeTagService: ChallengeTagService) {}

    @Get('all')
    @HttpCode(HttpStatus.OK)
    async getAllChallengeTag(): Promise<ChallengeTag[]>{
        return await this._challengeTagService.getAllChallengeTags()
    }

    @Get(':ChallengeTagId')
    @HttpCode(HttpStatus.OK)
    async getChallengeTagsId(@GetChallengeTagIdParamDecorator() challengeTagId: number){
        return await this._challengeTagService.getChallengeTagsById(challengeTagId)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createChallengeTag(@Body() challengeTagDto:ChallengeTagDto){
        const newChallengeTag = await this._challengeTagService.createNewChallengeTag(challengeTagDto)
        return {
            message: newChallengeTag
        };
    }

    @Delete(':ChallengeTagId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteChallengeTagDto(@GetChallengeTagIdParamDecorator() challengeTagId: number): Promise<void>{
        await this._challengeTagService.deleteChallengeTag(challengeTagId);
    }

    @Patch(':ChallengeTagId')
    @HttpCode(HttpStatus.OK)
    async updateChallengeTag(@GetChallengeTagIdParamDecorator() challengeTagId: number,@Body() challengeTagDto: ChallengeTagDto):Promise<{challengeTag: ChallengeTag}>{
        const updateChallengeTag = await this._challengeTagService.updateChallengeTag(challengeTagId,challengeTagDto);
        return {
           challengeTag: updateChallengeTag,
        };
    }
}
