import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

import { OrderDetailModule } from '../orderDetail/orderDetail.module';

@Module({
  imports: [OrderDetailModule, TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
