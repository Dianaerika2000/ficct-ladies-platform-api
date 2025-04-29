import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleService } from '../role/role.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ){}

  async create(createUserDto: CreateUserDto) {
    const { email, password, roleId, ...userData } = createUserDto;
    const role = await this.roleService.findOne(roleId);

    const userExists = await this.userRepository.findOneBy({ email });
    if (userExists) {
      throw new BadRequestException(`El usuario con el email ${email} ya existe`);
    }

    const user = this.userRepository.create({
      ...userData,
      email,
      password: await bcrypt.hash(password, 10),
      rol: role
    })

    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]>{
    return await this.userRepository.find({
      where: { status: true },
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({id});

    if (!user) {
      throw new NotFoundException(`El usuario con el ID ${id} no fue encontrado`);
    }

    return user;
  }

  async findOneByEmail(email: string){
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(`El usuario con el email ${email} no fue encontrado`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User>{
    const user = await this.findOne(id);

    Object.assign(user, updateUserDto);

    if (updateUserDto.password) {
      user.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    user.status = false;

    return await this.userRepository.save(user);
  }
}
