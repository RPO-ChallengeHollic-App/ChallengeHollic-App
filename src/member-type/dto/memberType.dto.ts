import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class MemberTypeDto{
    @IsString()
    type:string;
    @IsNumber()
    @IsNotEmpty()
    memberTypeId:number;

}