import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entity/orderDetail.entity';
import { Module } from '@nestjs/common';
import { OrderDetailService } from './orderDetail.service';
import { OrderDetailController } from './orderDetail.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail])],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
  exports: [OrderDetailService],
})
export class OrderDetailModule {}
