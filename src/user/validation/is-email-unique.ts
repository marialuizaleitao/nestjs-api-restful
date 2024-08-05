import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUnique implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(
    email: string,
    ValidationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const user = await this.userService.isEmailUnique(email);
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
