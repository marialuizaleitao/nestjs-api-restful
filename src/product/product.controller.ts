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
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('/products')
export class ProductController {
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

  @Get()
  async findAll() {
    const products = await this.productService.findAll();
    return products;
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() productData: UpdateProductDTO) {
    await this.productService.update(id, productData);
    return {
      message: 'Product updated',
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.productService.delete(id);
    return {
      message: 'Product deleted',
    };
  }
}
