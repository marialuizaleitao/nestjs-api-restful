import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  @Inject()
  private userRepository: UserRepository;
  @Inject()
  private userService: UserService;

  @Post()
  async create(@Body() userData: CreateUserDto) {
    const user = await this.userService.create(userData);
    return {
      user,
      message: 'User created',
    };
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    await this.userRepository.update(id, userData);

    return {
      message: 'User updated',
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.userRepository.delete(id);

    return {
      message: 'User deleted',
    };
  }
}
