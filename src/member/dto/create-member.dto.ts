import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateMemberDto {
    @IsString()
    nickname?:string;
    @IsNumber()
    @IsNotEmpty()
    userId:number;
    @IsNumber()
    @IsNotEmpty()
    groupId:number;

}