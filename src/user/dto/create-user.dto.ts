import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { isEmailUnique } from '../validation/is-email-unique';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail(undefined, { message: 'Invalid email' })
  @isEmailUnique({ message: 'Email already exists' })
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
