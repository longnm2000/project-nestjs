import { Controller, Get, Param } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PicturesService } from './pictures.service';

@Controller('api/v1/pictures')
export class PicturesController {
  constructor(private readonly PicturesService: PicturesService) {}
  @Get()
  async getAllPictures() {
    try {
      const products = await this.PicturesService.getAllPictures();
      return products;
    } catch (error) {
      return { error: 'Internal Server Error' };
    }
  }
  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const pictures = await this.PicturesService.getPicturesByProductId(+id);
      if (!pictures) {
        return { message: 'pictures not found' };
      }
      return pictures;
    } catch (error) {
      return { error: 'Internal Server Error' };
    }
  }
}
