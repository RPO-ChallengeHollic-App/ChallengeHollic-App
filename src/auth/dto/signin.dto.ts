import {
    IsEmail,
    IsNotEmpty,
    IsNotIn,
    IsString, Length,
    MinLength,
} from 'class-validator';

export class SigninDto {
    @IsString()
    username: string;

    @Length(6)
    password: string;
}
