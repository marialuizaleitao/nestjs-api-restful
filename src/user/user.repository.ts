import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private users = [];

  async save(user) {
    this.users.push(user);
  }

  async findAll() {
    return this.users;
  }

  async isEmailUnique(email: string) {
    const user = this.users.find((user) => user.email === email);

    return user !== undefined;
  }
}
