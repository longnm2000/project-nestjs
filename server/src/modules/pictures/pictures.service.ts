import { Repository } from 'typeorm';
import {
  // HttpException,
  // HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Pictures } from 'src/modules/pictures/entity/pictures.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOtherPicturesDto } from './dto/createOtherPicture.dto';
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
      throw new Error('Unable to fetch pictures');
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
      throw new Error('Unable to fetch picture');
    }
  }
  // async deletePicturesByProductId(id: number): Promise<any> {
  //   try {
  //     await this.pictureRepository
  //       .createQueryBuilder('pictures')
  //       .delete()
  //       .from(Pictures)
  //       .where('pictureId = :id', { id })
  //       .execute();
  //     return new HttpException('Delte pictures successfully', HttpStatus.OK);
  //   } catch (error) {
  //     throw new Error('Unable to fetch product');
  //   }
  // }
  async createOtherPictures(
    productId: number,
    otherPicturesData: CreateOtherPicturesDto,
  ): Promise<any> {
    try {
      for (const e of otherPicturesData.optionalImages) {
        const newOrderDetail = this.pictureRepository.create({
          productId,
          source: e,
        });
        await this.pictureRepository.save(newOrderDetail);
      }
      return { status: 201, message: 'Add successfully' };
    } catch (error) {
      return error;
    }
  }
  async createAvatar(productId: number, avatar: string): Promise<any> {
    try {
      const newOrderDetail = this.pictureRepository.create({
        productId,
        source: avatar,
        type: true,
      });
      await this.pictureRepository.save(newOrderDetail);

      return { status: 201, message: 'Add successfully' };
    } catch (error) {
      return error;
    }
  }
}
