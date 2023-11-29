import { OrderDetailService } from './orderDetail.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('api/v1/order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}
  @Get('/:id')
  async getAllOrderDetailByOrderId(@Param('id') id: number) {
    return this.orderDetailService.getAllOrderDetailByOrderId(id);
  }
}
