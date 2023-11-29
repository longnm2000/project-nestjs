import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './entity/orderDetail.entity';
import { CreateOrderDetailDto } from './dto/createOrderDetail.dto';
@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async createOrderDetail(orderDetailData: CreateOrderDetailDto): Promise<any> {
    try {
      for (const e of orderDetailData.orderDetails) {
        const newOrderDetail = this.orderDetailRepository.create({
          orderId: orderDetailData.orderId,
          productId: +e.productId,
          productName: e.productName,
          price: e.price,
          image: e.image,
          quantity: e.quantity,
        });
        await this.orderDetailRepository.save(newOrderDetail);
      }
      return { status: 201, message: 'Add successfully' };
    } catch (error) {
      return error;
    }
  }

  async getAllOrderDetailByOrderId(orderId: number): Promise<any> {
    try {
      return await this.orderDetailRepository.find({ where: { orderId } });
    } catch (error) {
      return error;
    }
  }
}
