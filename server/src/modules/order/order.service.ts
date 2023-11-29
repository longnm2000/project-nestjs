import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderDetailService } from '../orderDetail/orderDetail.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private readonly orderDetailService: OrderDetailService,
  ) {}

  // get all
  async getAllOrders(): Promise<Order[]> {
    try {
      const ordersWithUser = await this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.user', 'user')
        .select([
          'order.orderId',
          'order.total',
          'order.address',
          'order.status',
          'order.createAt',
          'user.name',
          'user.email',
          'user.phone',
        ])
        .getMany();

      return ordersWithUser;
    } catch (error) {
      throw new Error('Unable to fetch orders with user names');
    }
  }

  async getAllOrdersByUserId(userId: number): Promise<Order[]> {
    try {
      const orders = await this.orderRepository.find({
        where: { userId },
        order: {
          createAt: 'DESC',
        },
      });

      return orders;
    } catch (error) {
      throw new Error('Unable to fetch orders with user names');
    }
  }

  // post
  async createOrder(orderData: CreateOrderDto): Promise<any> {
    const { totalAmount, shippingAddress, orderDetails, user } = orderData;
    try {
      const newOrder = await this.orderRepository.create({
        userId: user,
        total: totalAmount,
        address: shippingAddress,
      });
      console.log(newOrder);

      const addOrder = await this.orderRepository.save(newOrder);
      const orderDetailData = { orderId: addOrder.orderId, orderDetails };
      await this.orderDetailService.createOrderDetail(orderDetailData);
      return { message: 'Create order success', status: 201 };
    } catch (error) {
      throw new Error('Create product error');
    }
  }

  async changeOrderStatus(orderId: number, newStatus: number): Promise<any> {
    try {
      const order = await this.orderRepository.findOne({
        where: { orderId },
      });
      if (!order) {
        throw new Error('Order not found');
      }

      await this.orderRepository
        .createQueryBuilder()
        .update(Order)
        .set({ status: newStatus })
        .where('orderId = :id', { id: orderId })
        .execute();
      return new HttpException(
        'Update status for this order successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      throw new HttpException(
        "Can't update status for this order",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
