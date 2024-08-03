import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/createProduct.dto';
import { FindAllProductsDTO } from './dto/findAllProducts.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(productData: CreateProductDTO) {
    const product = new ProductEntity();
    
    product.name = productData.name;
    product.userId = productData.userId;
    product.price = productData.price;
    product.availableQuantity = productData.availableQuantity;
    product.description = productData.description;
    product.category = productData.category;
    product.characteristics = productData.characteristics;
    product.images = productData.images;

    await this.productRepository.save(product);
    return {
      id: product.id,
      name: product.name,
    };
  }

  async findAll() {
    const products = await this.productRepository.find();
    const productsList = products.map(
      (product) => new FindAllProductsDTO(product.id, product.name),
    );

    return productsList;
  }

  async update(id: string, productData: Partial<ProductEntity>) {
    const product = await this.productRepository.findOneBy({ id });
    Object.assign(product, productData);
    await this.productRepository.save(product);
  }

  async delete(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new Error('Product not found');
    }

    await this.productRepository.delete(id);
  }
}
