import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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
  @Get('/user/:id')
  async getAllOrdersByUserId(@Param('id') userId: number) {
    try {
      const orders = await this.OrderService.getAllOrdersByUserId(userId);
      return orders;
    } catch (error) {
      return { error: 'Internal Server Error' };
    }
  }

  @Post()
  async createProduct(@Body() orderData: CreateOrderDto) {
    console.log(orderData);

    try {
      const result = await this.OrderService.createOrder(orderData);
      return result;
    } catch (error) {
      return { error: 'Internal Server Error' };
    }
  }
  @Patch('/:id')
  async changeStatus(@Param('id') orderId: number, @Body() data: any) {
    return await this.OrderService.changeOrderStatus(orderId, data.value);
  }
}
