import { IsEmail, IsString } from "class-validator";

export class SigninUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}