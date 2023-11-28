import { Products } from 'src/modules/products/entity/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'pictures',
})
export class Pictures {
  @PrimaryGeneratedColumn()
  pictureId: number;

  @Column({ type: 'bigint', nullable: false })
  productId: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  source: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  type: boolean;

  @ManyToOne(() => Products, (product) => product.pictures)
  @JoinColumn({ name: 'productId' })
  product: Products;
}
