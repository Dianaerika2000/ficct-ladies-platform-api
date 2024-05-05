import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class SigninUserDto {
  @ApiProperty({ example: 'username@username.com'})
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password2222'})
  password: string;
}