import {IsNotEmpty, IsNumber} from "class-validator";

export class ChallengeTagDto {
    @IsNumber()
    @IsNotEmpty()
    challengeId:number;
    @IsNumber()
    @IsNotEmpty()
    tagId:number;

}