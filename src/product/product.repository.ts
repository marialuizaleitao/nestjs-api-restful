import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private products = [];

  async save(product: ProductEntity) {
    this.products.push(product);
    return product;
  }

  async findAll() {
    return this.products;
  }

  async update(id: string, productData: Partial<ProductEntity>) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new Error('Product not found');
    }

    Object.entries(productData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      product[key] = value;
    });

    return product;
  }

  async delete(id: string) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    this.products.splice(productIndex, 1);
  }
}
