import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';

@Controller('/users')
export class UserController {
  @Inject()
  private userRepository: UserRepository;

  @Post()
  async create(@Body() userData: CreateUserDto) {
    const user = new UserEntity();
    user.id = uuid();
    user.email = userData.email;
    user.name = userData.name;
    user.password = userData.password;

    this.userRepository.save(user);
    return { id: user.id, message: 'User created' };
  }

  @Get()
  async findAll() {
    return this.userRepository.findAll();
  }
}
