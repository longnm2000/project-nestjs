import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './modules/users/entity/users.entity';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/categories/category.module';
import { Categories } from './modules/categories/entity/categories.entity';
import { Products } from './modules/products/entity/products.entity';
import { ProductsModule } from './modules/products/products.module';
import { Pictures } from './modules/pictures/entity/pictures.entity';
import { PicturesModule } from './modules/pictures/pictures.module';
import { Order } from './modules/order/entity/order.entity';
import { OrderDetail } from './modules/orderDetail/entity/orderDetail.entity';
import { OrderModule } from './modules/order/order.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'project5',
      entities: [Users, Categories, Products, Pictures, Order, OrderDetail],
      synchronize: true,
    }),
    AuthModule,
    CategoryModule,
    ProductsModule,
    PicturesModule,
    OrderModule,
  ],
})
export class AppModule {}
