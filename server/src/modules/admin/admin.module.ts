import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entity/admins.entity';
import { AdminsService } from './admin.service';
@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
