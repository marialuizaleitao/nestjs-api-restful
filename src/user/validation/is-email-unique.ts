import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUnique implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(
    email: string,
    ValidationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const user = await this.userRepository.isEmailUnique(email);
    return !user;
  }
}

export const isEmailUnique = (validationOptions: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUnique,
    });
  };
};
