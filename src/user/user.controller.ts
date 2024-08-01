import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('/users')
export class UserController {
  @Inject()
  private userRepository: UserRepository;

  @Post()
  async create(@Body() userData: CreateUserDto) {
    this.userRepository.save(userData);
    return userData;
  }

  @Get()
  async findAll() {
    return this.userRepository.findAll();
  }
}
