import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { OrderStatus } from '../enum/order-status';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  id: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Total cannot be empty' })
  total: number;

  @IsNotEmpty({ message: 'Status cannot be empty' })
  status: OrderStatus;
}
