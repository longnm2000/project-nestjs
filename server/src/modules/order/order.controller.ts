import { Body, Controller, Get, Post } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';

@Controller('api/v1/order')
export class OrderController {
  constructor(private readonly OrderService: OrderService) {}

  @Get()
  async getAllOrders() {
    try {
      const orders = await this.OrderService.getAllOrders();
      return orders;
    } catch (error) {
      return { error: 'Internal Server Error' };
    }
  }

  @Post()
  async createProduct(@Body() orderData: CreateOrderDto) {
    try {
      const result = await this.OrderService.createOrder(orderData);
      return result;
    } catch (error) {
      return { error: 'Internal Server Error' };
    }
  }
}
