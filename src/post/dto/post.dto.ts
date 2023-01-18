import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class PostDto{

    @IsNumber()
    @IsNotEmpty()
    postId:number;
    @IsString()
    @IsNotEmpty()
    postName:string;
    @IsNumber()
    @IsNotEmpty()
    participentId:number;

}