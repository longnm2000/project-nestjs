import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entity/products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Pictures } from '../pictures/entity/pictures.entity';
import { PicturesModule } from '../pictures/pictures.module';

@Module({
  imports: [PicturesModule, TypeOrmModule.forFeature([Products, Pictures])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
