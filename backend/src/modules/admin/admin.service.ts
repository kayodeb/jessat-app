import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../orders/order.entity';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
import { OrderItem } from '../orders/order-item.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
    @InjectRepository(OrderItem) private readonly itemRepo: Repository<OrderItem>,
  ) {}

  async getStats() {
    const [totalOrders, totalUsers, totalProducts] = await Promise.all([
      this.orderRepo.count(),
      this.userRepo.count(),
      this.productRepo.count(),
    ]);

    const revenueResult = await this.orderRepo
      .createQueryBuilder('order')
      .select('SUM(order.total)', 'total')
      .where('order.status NOT IN (:...excluded)', {
        excluded: [OrderStatus.CANCELLED, OrderStatus.REFUNDED],
      })
      .getRawOne();

    const pendingOrders = await this.orderRepo.count({ where: { status: OrderStatus.PENDING } });
    const lowStockProducts = await this.productRepo
      .createQueryBuilder('p')
      .where('p.stockCount <= 5')
      .getCount();

    return {
      totalOrders,
      totalUsers,
      totalProducts,
      totalRevenue: parseFloat(revenueResult?.total || '0'),
      pendingOrders,
      lowStockProducts,
    };
  }

  async getRevenueByPeriod(period: 'day' | 'week' | 'month' = 'month') {
    const trunc = period === 'day' ? 'day' : period === 'week' ? 'week' : 'month';
    return this.orderRepo
      .createQueryBuilder('order')
      .select(`DATE_TRUNC('${trunc}', order.createdAt)`, 'period')
      .addSelect('SUM(order.total)', 'revenue')
      .addSelect('COUNT(order.id)', 'orders')
      .where('order.status NOT IN (:...excluded)', {
        excluded: [OrderStatus.CANCELLED, OrderStatus.REFUNDED],
      })
      .groupBy(`DATE_TRUNC('${trunc}', order.createdAt)`)
      .orderBy('period', 'DESC')
      .limit(12)
      .getRawMany();
  }

  async getTopProducts(limit = 10) {
    return this.itemRepo
      .createQueryBuilder('item')
      .select('item.productId', 'productId')
      .addSelect('item.productName', 'productName')
      .addSelect('SUM(item.quantity)', 'totalSold')
      .addSelect('SUM(item.price * item.quantity)', 'totalRevenue')
      .groupBy('item.productId, item.productName')
      .orderBy('totalSold', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  async getOrdersByStatus() {
    return this.orderRepo
      .createQueryBuilder('order')
      .select('order.status', 'status')
      .addSelect('COUNT(order.id)', 'count')
      .groupBy('order.status')
      .getRawMany();
  }
}
