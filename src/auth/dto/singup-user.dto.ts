import { ApiProperty } from "@nestjs/swagger";
//import { IsEmail, IsString, Matches, MinLength } from "class-validator";
import { IsEmail } from "class-validator";

export class SingupUserDto {
  @ApiProperty({ example: 'username'})
  name: string;

  @ApiProperty({ example: 'username@username.com'})
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password2222'})
  //@MinLength(8)
  //@Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //  message:
  //    'La contraseña debe tener una letra mayúscula, minúscula, un número y ocho caracteres mínimo',
  //})
  password: string;
}