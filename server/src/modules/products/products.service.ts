import { PicturesService } from './../pictures/pictures.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entity/products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProduct.dto';
import { Pictures } from '../pictures/entity/pictures.entity';
// import { UpdateProductDto } from './DTO/updateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
    @InjectRepository(Pictures)
    private pictureRepository: Repository<Pictures>,
    private readonly picturesService: PicturesService,
  ) {}

  // get all
  async getAllProducts(): Promise<Products[]> {
    try {
      return await this.productRepository
        .createQueryBuilder('product')
        .select('product.productId', 'productId')
        .addSelect('product.name', 'name')
        .addSelect('product.price', 'price')
        .addSelect('pictures.source', 'source')
        .addSelect('category.name', 'categoryName')
        .leftJoin('product.pictures', 'pictures')
        .leftJoin('product.category', 'category')
        .where('pictures.type = :type', { type: true })
        .getRawMany();
    } catch (error) {
      throw new Error('Unable to fetch products');
    }
  }

  // filter by category
  //   async filterByCategory(
  //     category: string,
  //     pageNumber: number,
  //     pageSize: number,
  //   ) {
  //     const skip = pageNumber ? (pageNumber - 1) * pageSize : 0;

  //     const query = this.productRepository
  //       .createQueryBuilder('product')
  //       .select([
  //         'product.product_id',
  //         'product.name',
  //         'product.number',
  //         'product.title',
  //         'product.price',
  //         'product.sale',
  //         'product.img',
  //         'category.name',
  //         'category.description',
  //       ])
  //       .innerJoin('product.category', 'category')
  //       .where('category.name = :category', { category });

  //     if (pageNumber && pageSize) {
  //       query.take(pageSize).skip(skip);
  //     }

  //     const [data, count] = await Promise.all([
  //       query.getMany(),
  //       this.productRepository.count({
  //         where: { categories: { id: category } },
  //       }),
  //     ]);

  //     return { data, length: count };
  //   }

  // Phân trang
  async getPaginatedProducts(
    pageIndex: number,
    pageNumber: number,
  ): Promise<{ data: Products[]; length: number }> {
    try {
      const query = this.productRepository
        .createQueryBuilder('product')
        .select([
          'product.product_id',
          'product.name',
          'product.number',
          'product.title',
          'product.price',
          'product.sale',
          'product.img',
        ])
        .leftJoinAndSelect('product.category', 'category');

      const data = await query
        .take(pageNumber)
        .skip((pageIndex - 1) * pageNumber)
        .getMany();

      const length = await this.productRepository.count();

      return { data, length };
    } catch (error) {
      throw new Error('Unable to fetch paginated products');
    }
  }

  // Get product by id
  //   async getProductById(id: string) {
  //     try {
  //       const queryBuilder = this.productRepository.createQueryBuilder('product');
  //       queryBuilder
  //         .leftJoinAndSelect('product.category', 'category')
  //         .where('product.product_id = :id', { id });

  //       const product = await queryBuilder.getOne();
  //       return product;
  //     } catch (error) {
  //       throw new Error('Unable to fetch product ');
  //     }
  //   }
  async getProductById(id: string): Promise<Products> {
    try {
      const product = await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .where('product.productId = :id', { id })
        .getOne();

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      return product;
    } catch (error) {
      throw new Error('Unable to fetch product');
    }
  }

  // Create product
  async createProduct(productData: CreateProductDto): Promise<any> {
    const { avatar, optionalImages, ...data } = productData;
    try {
      const newProduct = this.productRepository.create(data);
      const result = await this.productRepository.save(newProduct);
      await this.picturesService.createOtherPictures(result.productId, {
        optionalImages,
      });
      await this.picturesService.createAvatar(result.productId, avatar);
      return new HttpException('Add product successfully', HttpStatus.CREATED);
    } catch (error) {
      throw new Error('Create product error');
    }
  }

  // Update product
  // async updateProduct(id: number, updatedData: UpdateProductDto): Promise<any> {
  //   console.log(id);

  //   try {
  //     await this.productRepository.update(id, updatedData);
  //     return { message: 'Update product success' };
  //   } catch (error) {
  //     console.log(error);

  //     throw new Error('Update not success');
  //   }
  // }

  //   async updateProduct(id: number, data: UpdateProductDto) {
  //     console.log(id, data);

  //     // try {
  //     await this.productRepository.update(id, data);

  //     //   return {
  //     //     message: 'Update product success',
  //     //   };
  //     // } catch (error) {
  //     //   throw error;
  //     // }
  //   }

  // Delete product
  async deleteProduct(id: number): Promise<any> {
    try {
      await this.productRepository.delete(id);
      return new HttpException('Delete product successfully', HttpStatus.OK);
    } catch (error) {
      throw new Error('Delete not successful');
    }
  }
}
