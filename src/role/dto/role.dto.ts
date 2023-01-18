import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class RoleDto{

    @IsNumber()
    @IsNotEmpty()
    memberId:number;
    @IsNumber()
    @IsNotEmpty()
    memberTypeId:number;

}