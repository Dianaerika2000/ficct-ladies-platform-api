import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../common/enums/valid-roles';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(ValidRoles.superAdmin)
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Auth(ValidRoles.superAdmin)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Auth(ValidRoles.superAdmin)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Auth(ValidRoles.superAdmin)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Auth(ValidRoles.superAdmin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
