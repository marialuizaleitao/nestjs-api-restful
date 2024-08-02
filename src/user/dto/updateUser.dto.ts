import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { isEmailUnique } from '../validation/is-email-unique';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'Invalid email' })
  @isEmailUnique({ message: 'Email already exists' })
  @IsOptional()
  email: string;

  @IsOptional()
  @MinLength(6)
  password: string;
}
