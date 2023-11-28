import { OrderDetail } from 'src/modules/orderDetail/entity/orderDetail.entity';
import { Users } from 'src/modules/users/entity/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'order',
})
export class Order {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  orderId: number;

  @Column({ type: 'bigint', nullable: false })
  userId: number;

  @Column({ type: 'decimal', nullable: false })
  total: number;

  @Column({ type: 'text', nullable: false })
  address: string;

  @CreateDateColumn()
  createAt: Date;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: Users;
}
