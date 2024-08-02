import { Body, Controller, Inject, Post } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/createProduct.dto';

@Controller('/products')
export class ProductController {
  @Inject()
  private productRepository: ProductRepository;

  @Post()
  async create(@Body() productData: CreateProductDTO) {
    const product = new ProductEntity();
    product.id = uuid();
    product.name = productData.name;
    product.userId = productData.userId;
    product.price = productData.price;
    product.quantity = productData.quantity;
    product.description = productData.description;
    product.category = productData.category;
    product.characteristics = productData.characteristics;
    product.images = productData.images;

    const registeredProduct = this.productRepository.save(product);
    return {
      product: registeredProduct,
      message: 'Product created',
    };
  }
}
