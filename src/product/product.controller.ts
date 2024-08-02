import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateProductDTO } from './dto/createProduct.dto';
import { FindAllProductsDTO } from './dto/findAllProducts.dto';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';
import { UpdateProductDTO } from './dto/updateProduct.dto';

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

    this.productRepository.save(product);
    return {
      product: new FindAllProductsDTO(
        product.id,
        product.name,
        product.characteristics,
        product.images,
      ),
      message: 'Product created',
    };
  }

  @Get()
  async findAll() {
    const products = await this.productRepository.findAll();
    const productList = products.map(
      (product) =>
        new FindAllProductsDTO(
          product.id,
          product.name,
          product.characteristics,
          product.images,
        ),
    );

    return productList;
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() productData: UpdateProductDTO) {
    await this.productRepository.update(id, productData);

    return {
      message: 'Product updated',
    };
  }
}
