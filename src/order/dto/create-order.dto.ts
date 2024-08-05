import { IsNotEmpty, IsNumber } from 'class-validator';
import { OrderStatus } from '../enum/order-status';

export class CreateOrderDto {
  id: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Total cannot be empty' })
  total: number;

  @IsNotEmpty({ message: 'Status cannot be empty' })
  status: OrderStatus;
}
