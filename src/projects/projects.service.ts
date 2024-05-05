import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly _projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>
  ) { }

  async create(createProjectDto: CreateProjectDto) {
    const { name, description, imageUrl, startDate, userId } = createProjectDto;
    const foundUser = await this._userRepository.findOneBy({ id: userId})

    const newProject = await this._projectRepository.save({
      name: name,
      description: description,
      imageUrl: imageUrl,
      startDate: startDate,
      user: foundUser
    });

    return newProject;
  }

  async findAll() {
    return await this._projectRepository.find();
  }

  async findOne(id: number) {
    const projectExist = await this._projectRepository.findOneBy({id});

    if (!projectExist) {
      throw new NotFoundException(`El proyecto #${id} no existe.`);
    } 

    return projectExist;
  }

  async update(id: number, updateProjectDto: Partial<UpdateProjectDto>) {
    const projectExist = await this._projectRepository.findOneBy({id});
    
    if (!projectExist) {
      throw new NotFoundException(`El proyecto #${id} no existe.`);
    }

    const updateProject = { ...projectExist, ...updateProjectDto};

    return await this._projectRepository.save(updateProject);
  }

  async remove(id: number) {
    const projectExist = await this._projectRepository.findOneBy({id});
    
    if (!projectExist) throw new NotFoundException(`El proyecto con ID ${id} no existe.`);

    return this._projectRepository.delete(id);
  }
}
