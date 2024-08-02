import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateUserDTO } from './dto/createUser.dto';
import { FindAllUsersDTO } from './dto/findAllUsers.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userData: CreateUserDTO) {
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

  async update(id: string, userData: Partial<UserEntity>) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.update(id, userData);
  }

  async delete(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.delete(id);
  }
}
