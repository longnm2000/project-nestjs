import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';
// import { OrderDetail } from '../orderDetail/entity/orderDetail.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    // @InjectRepository(OrderDetail)
    // private orderDetailRepository: Repository<OrderDetail>,
  ) {}

  // get all
  async getAllOrders(): Promise<Order[]> {
    try {
      return await this.orderRepository.find();
    } catch (error) {
      throw new Error('Unable to fetch order');
    }
  }
  async createOrder(orderData: CreateOrderDto): Promise<any> {
    const { totalAmount, shippingAddress, orderDetails, user } = orderData;
    try {
      const newOrder = await this.orderRepository.create({
        userId: user,
        total: totalAmount,
        address: shippingAddress,
      });
      console.log(newOrder);

      await this.orderRepository.save(newOrder);
      return { message: 'Create product success' };
    } catch (error) {
      throw new Error('Create product error');
    }
  }
}
