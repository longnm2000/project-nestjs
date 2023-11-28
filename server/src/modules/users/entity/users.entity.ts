import { Order } from 'src/modules/order/entity/order.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({
  name: 'users',
})
@Unique(['email'])
export class Users {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: 'user',
  })
  role: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  active: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
