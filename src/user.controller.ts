import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Controller('/users')
export class UserController {
  @Inject()
  private userRepository: UserRepository;

  @Post()
  async create(@Body() userData) {
    this.userRepository.save(userData);
    return userData;
  }
}
