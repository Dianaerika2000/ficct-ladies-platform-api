import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class SingupUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe tener una letra mayúscula, minúscula, un número y ocho caracteres mínimo',
  })
  password: string;
}