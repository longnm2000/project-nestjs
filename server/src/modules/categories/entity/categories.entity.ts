import { Products } from 'src/modules/products/entity/products.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'categories',
})
export class Categories {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  categoryId: number;
  @Column({ type: 'varchar', length: 100 })
  name: string;
  @Column({ type: 'varchar', length: 255 })
  description: string;
  @OneToMany(() => Products, (product) => product.category)
  products: Products[];
}
