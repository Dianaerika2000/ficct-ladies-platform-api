import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {
    const { email, password, ...userData } = createUserDto;

    const userExists = await this.userRepository.findOneBy({ email });
    if (userExists) {
      throw new BadRequestException(`El usuario con el email ${email} ya existe`);
    }

    const user = this.userRepository.create({
      ...userData,
      email,
      password: await bcrypt.hash(password, 10)
    })

    return await this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all user`;
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
