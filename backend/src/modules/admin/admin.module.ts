import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Order } from '../orders/order.entity';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
import { OrderItem } from '../orders/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Product, OrderItem])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
