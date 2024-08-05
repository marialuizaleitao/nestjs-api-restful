import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { FindAllUsersDTO } from './dto/find-all-users.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userData: CreateUserDTO) {
    const user = new UserEntity();

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

  async isEmailUnique(email: string): Promise<boolean> {
    const user = this.userRepository.find({ where: { email } });

    return (await user).length === 0;
  }
}
