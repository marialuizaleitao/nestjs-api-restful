import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dto/createUser.dto';
import { FindAllUsersDTO } from './dto/findAllUsers.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userData: CreateUserDto) {
    const user = new UserEntity();
    user.id = uuid();
    user.email = userData.email;
    user.name = userData.name;
    user.password = userData.password;

    await this.userRepository.save(user);
    return { id: user.id, name: user.name };
  }

  async findAll() {
    const users = await this.userRepository.find();
    const usersList = users.map(
      (user) => new FindAllUsersDTO(user.id, user.name),
    );

    return usersList;
  }
}
