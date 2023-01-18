import {
  IsEmail,
  IsNotEmpty,
  IsNotIn,
  IsString, Length,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @Length(6)
  password: string;
}
