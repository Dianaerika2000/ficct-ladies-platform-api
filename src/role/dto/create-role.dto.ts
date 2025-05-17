import { IsEnum, IsString } from "class-validator";
import { ValidRoles } from "../../common/enums/valid-roles";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({
    description: 'Role name',
    enum: ValidRoles,
    example: ValidRoles.superAdmin,
  })
  @IsEnum(ValidRoles, {
    message: 'El rol debe ser ADMINISTRADOR O SUPERADMINISTRADOR'
  })
  name: ValidRoles

  @ApiProperty({
    description: 'Role description',
    example: 'Usuario con todos los permisos del software',
  })
  @IsString()
  description: string
}
