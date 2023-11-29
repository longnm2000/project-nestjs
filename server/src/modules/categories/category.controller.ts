import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Controller('/api/v1/categories')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}

  @Get()
  async getAllProduct(): Promise<any> {
    return await this.CategoryService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<any> {
    return await this.CategoryService.findOne(Number(id));
  }

  @Post()
  async createCategory(@Body() categoryData: CreateCategoryDto): Promise<any> {
    return await this.CategoryService.createCategory(categoryData);
  }
  @Delete('/:id')
  async deleteCategory(@Param('id') id: number): Promise<any> {
    return await this.CategoryService.deleteCategory(id);
  }
  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() updateData: CreateCategoryDto,
  ): Promise<any> {
    return await this.CategoryService.updateCategory(id, updateData);
  }
}
