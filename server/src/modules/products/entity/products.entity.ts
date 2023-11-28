import { Categories } from 'src/modules/categories/entity/categories.entity';
import { OrderDetail } from 'src/modules/orderDetail/entity/orderDetail.entity';
import { Pictures } from 'src/modules/pictures/entity/pictures.entity';
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
  name: 'products',
})
export class Products {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  productId: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'decimal', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'int', nullable: false })
  wattage: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  pin: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  connect: string;

  @Column({ type: 'int', nullable: false })
  weight: number;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'bigint', nullable: false })
  categoryId: number;

  @CreateDateColumn()
  createAt: Date;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Categories;

  @OneToMany(() => Pictures, (picture) => picture.product)
  pictures: Pictures[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];
}
