import { IsEnum, IsString } from "class-validator";
import { ValidRoles } from "../../common/enums/valid-roles";

export class CreateRoleDto {
  @IsEnum(ValidRoles, {
    message: 'El rol debe ser ADMINISTRADOR O SUPERADMINISTRADOR'
  })
  name: ValidRoles

  @IsString()
  description: string
}
