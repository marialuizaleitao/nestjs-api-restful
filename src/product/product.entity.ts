import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCharacteristic } from './product-characteristics.entity';
import { ProductImage } from './product-image.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'quantity', length: 100, nullable: false })
  quantity: number;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @Column({ name: 'category', length: 100, nullable: false })
  category: string;

  characteristics: ProductCharacteristic[];
  images: ProductImage[];
}
