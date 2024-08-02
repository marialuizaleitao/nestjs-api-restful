import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindAllUsersDTO } from './dto/findAllUsers.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();
    const usersList = users.map(
      (user) => new FindAllUsersDTO(user.id, user.name),
    );

    return usersList;
  }
}
