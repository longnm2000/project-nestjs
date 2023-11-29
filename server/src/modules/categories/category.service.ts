import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number): Promise<Categories> {
    try {
      return await this.categoryRepository.findOne({
        where: { categoryId: id },
      });
    } catch (error) {
      return error;
    }
  }

  async createCategory(categoryData: CreateCategoryDto): Promise<any> {
    try {
      await this.categoryRepository.save(categoryData);
      return new HttpException('Add new category successfully', HttpStatus.OK);
    } catch (error) {
      return error;
    }
  }
  async deleteCategory(categoryId: number): Promise<any> {
    try {
      await this.categoryRepository
        .createQueryBuilder('categories')
        .delete()
        .from(Categories)
        .where('categoryId = :id', { id: categoryId })
        .execute();
      return new HttpException('Delete category successfully', HttpStatus.OK);
    } catch (error) {
      return error;
    }
  }
  async updateCategory(
    categoryId: number,
    updateData: CreateCategoryDto,
  ): Promise<any> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { categoryId: categoryId },
      });
      if (!category) {
        return new HttpException('Category Not Found', HttpStatus.NOT_FOUND);
      }

      await this.categoryRepository
        .createQueryBuilder()
        .update(Categories)
        .set({ name: updateData.name, description: updateData.description })
        .where('categoryId = :id', { id: categoryId })
        .execute();
      return new HttpException('Update category successfully', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(
        "Can't update status for this user",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
