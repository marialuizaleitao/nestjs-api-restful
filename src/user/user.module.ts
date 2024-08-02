import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { IsEmailUnique } from './validation/is-email-unique';

@Module({
  controllers: [UserController],
  providers: [UserRepository, IsEmailUnique],
})
export class UserModule {}
