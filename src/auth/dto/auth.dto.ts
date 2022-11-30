import {
  IsEmail,
  IsNotEmpty,
  IsNotIn,
  IsString,
  MinLength,
} from 'class-validator';

export class AuthDto {
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
