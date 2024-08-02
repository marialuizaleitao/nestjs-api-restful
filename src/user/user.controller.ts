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
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  @Inject()
  private userService: UserService;

  @Post()
  async create(@Body() userData: CreateUserDTO) {
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
  async update(@Param('id') id: string, @Body() userData: UpdateUserDTO) {
    await this.userService.update(id, userData);
    return {
      message: 'User updated',
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
    return {
      message: 'User deleted',
    };
  }
}
