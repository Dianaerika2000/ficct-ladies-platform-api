import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ){}
  
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const rol = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(rol);
  }

  async findAll() {
    return await this.roleRepository.find();
  }

  async findOne(term: number | string) {
    return typeof term === 'number'
      ? await this.roleRepository.findOneBy({ id: term})
      : await this.roleRepository.findOneBy({ name: term});
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);
    
    if (!role) {
      throw new NotFoundException(`El rol con el ID ${id} no fue encontrado`);
    }

    Object.assign(role, updateRoleDto);
    return await this.roleRepository.save(role);
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
