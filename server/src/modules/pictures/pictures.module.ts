import { TypeOrmModule } from '@nestjs/typeorm';
import { Pictures } from './entity/pictures.entity';
import { PicturesController } from './pictures.controller';
import { PicturesService } from './pictures.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Pictures])],
  controllers: [PicturesController],
  providers: [PicturesService],
  exports: [PicturesService],
})
export class PicturesModule {}
