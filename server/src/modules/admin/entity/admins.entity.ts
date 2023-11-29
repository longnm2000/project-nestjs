import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({
  name: 'admin',
})
@Unique(['email'])
export class Admin {
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
}
