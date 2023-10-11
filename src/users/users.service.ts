import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './users.entity';
import { ActiveStatusEnum } from 'src/commom/enum/enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'firstName', 'lastName', 'email'],
    });
  }

  async findOneOrFail(
    id: string
  ) {
    try {
      return await this.usersRepository.findBy({id: id});
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(id: string) {
    const course = await this.usersRepository.findOneBy({id: id});
    return course;
  }

  async findOneByEmail(email: string) {
    const course = await this.usersRepository.findOneBy({email: email});
    return course;
  }

  async store(data: CreateUserDto) {
    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }



  async update(id: string, updateCourseDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({id: id})
    const userUpdated = await this.usersRepository.save(
      Object.assign(user, updateCourseDto),
    );
    return userUpdated;
  }

  remove(id: string) {
    this.usersRepository.update(id, {
      status: ActiveStatusEnum.INATIVE,
    });
    return;
  }
}
