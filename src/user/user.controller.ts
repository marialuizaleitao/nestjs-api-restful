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
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dto/createUser.dto';
import { FindAllUsersDTO } from './dto/findAllUsers.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

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
    return {
      user: new FindAllUsersDTO(user.id, user.name),
      message: 'User created',
    };
  }

  @Get()
  async findAll() {
    const users = await this.userRepository.findAll();
    const userList = users.map(
      (user) => new FindAllUsersDTO(user.id, user.name),
    );

    return userList;
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
