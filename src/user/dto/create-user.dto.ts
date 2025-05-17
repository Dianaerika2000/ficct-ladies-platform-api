import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'juan.perez@example.com',
    description: 'Correo electrónico del usuario',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd',
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 1,
    description: 'ID del rol asignado al usuario',
  })
  @IsNumber()
  @IsNotEmpty()
  roleId: number;
}
