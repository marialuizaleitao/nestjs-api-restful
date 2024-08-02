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
import { ProductService } from './product.service';

@Controller('/products')
export class ProductController {
  @Inject()
  private productRepository: ProductRepository;
  @Inject()
  private productService: ProductService;

  @Post()
  async create(@Body() productData: CreateProductDTO) {
    const product = await this.productService.create(productData);
    return {
      product,
      message: 'Product created',
    };
  }
}
