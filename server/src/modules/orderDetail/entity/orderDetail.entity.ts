import { Order } from 'src/modules/order/entity/order.entity';
import { Products } from 'src/modules/products/entity/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'order_detail',
})
export class OrderDetail {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  orderDetailId: number;

  @Column({ type: 'bigint', nullable: false })
  orderId: number;

  @Column({ type: 'bigint', nullable: false })
  productId: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  productName: string;

  @Column({ type: 'decimal', nullable: false })
  price: number;

  @Column({ type: 'text', nullable: false })
  image: string;

  @Column({ type: 'bigint', nullable: false })
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Products, (product) => product.orderDetails)
  @JoinColumn({ name: 'productId' })
  product: Products;
}
