import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ValidRoles } from '../common/enums/valid-roles';

@Injectable()
export class SeedService {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) { }

  async executeSeed(): Promise<boolean> {
    const roleName = ValidRoles.superAdmin;

    let adminRole = await this.roleService.findOne(roleName);
    if (!adminRole) {
      adminRole = await this.roleService.create({
        name: roleName,
        description: 'Usuario con todos los permisos del software.',
      });
    }

    const adminUser: CreateUserDto = {
      name: this.configService.get('ADMIN_NAME'),
      email: this.configService.get('ADMIN_EMAIL'),
      password: this.configService.get('ADMIN_PASSWORD'),
      roleId: adminRole.id,
    };

    const existingUser = await this.userService.tryFindOneByEmail(adminUser.email);
    if (!existingUser) {
      await this.userService.create(adminUser);
    }

    return true;
  }
}
