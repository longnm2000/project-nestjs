import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Pictures } from 'src/modules/pictures/entity/pictures.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Pictures)
    private pictureRepository: Repository<Pictures>,
  ) {}
  // get all
  async getAllPictures(): Promise<Pictures[]> {
    try {
      return await this.pictureRepository.find();
    } catch (error) {
      throw new Error('Unable to fetch products');
    }
  }

  // get one
  async getPicturesByProductId(id: number): Promise<Pictures[]> {
    try {
      const pictures = await this.pictureRepository.find({
        where: { productId: id },
      });

      if (!pictures) {
        throw new NotFoundException('Pictures not found');
      }

      return pictures;
    } catch (error) {
      throw new Error('Unable to fetch product');
    }
  }
}
