import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private products = [];

  async save(product: ProductEntity) {
    this.products.push(product);
    return product;
  }
}
