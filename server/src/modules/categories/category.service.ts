import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from './entity/categories.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
  ) {}

  async findAll(): Promise<any> {
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<any> {
    return await this.categoryRepository.findOne({
      where: { categoryId: id },
    });
  }

  async createCategory(categoryData: CreateCategoryDto): Promise<any> {
    return await this.categoryRepository.save(categoryData);
  }
}
