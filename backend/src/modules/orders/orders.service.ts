import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CartService } from '../cart/cart.service';
import { ProductsService } from '../products/products.service';
import { PromotionsService } from '../promotions/promotions.service';
import { StockService } from '../stock/stock.service';
import { StockMovementType } from '../stock/stock-movement.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserRole } from '../users/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private readonly itemRepo: Repository<OrderItem>,
    private readonly cartService: CartService,
    private readonly productsService: ProductsService,
    private readonly promotionsService: PromotionsService,
    private readonly stockService: StockService,
  ) {}

  async create(userId: string, dto: CreateOrderDto): Promise<Order> {
    const cart = await this.cartService.getCart(userId);
    if (!cart.items.length) throw new NotFoundException('Panier vide');

    let subtotal = cart.subtotal;
    let discount = 0;
    let promoCode = null;

    if (dto.promoCode) {
      const promo = await this.promotionsService.validate(dto.promoCode, subtotal);
      discount = this.promotionsService.calculateDiscount(promo, subtotal);
      promoCode = dto.promoCode;
      await this.promotionsService.incrementUsage(promo.id);
    }

    const total = subtotal - discount;

    const order = this.orderRepo.create({
      userId,
      subtotal,
      discount,
      total,
      promoCode,
      shippingAddress: dto.shippingAddress,
      status: OrderStatus.PENDING,
    });
    await this.orderRepo.save(order);

    // Create order items + decrement stock
    for (const cartItem of cart.items) {
      const item = this.itemRepo.create({
        orderId: order.id,
        productId: cartItem.productId,
        productName: cartItem.product.name,
        price: cartItem.product.price,
        quantity: cartItem.quantity,
        selectedOptions: cartItem.selectedOptions,
        imageUrl: cartItem.product.images?.[0],
      });
      await this.itemRepo.save(item);

      await this.stockService.recordMovement({
        productId: cartItem.productId,
        changeQuantity: -cartItem.quantity,
        type: StockMovementType.SALE,
        reason: `Commande #${order.id}`,
      });
    }

    await this.cartService.clearCart(userId);
    return this.orderRepo.findOne({ where: { id: order.id }, relations: ['items'] });
  }

  async findAll(query: { page?: number; limit?: number; status?: OrderStatus }) {
    const { page = 1, limit = 20, status } = query;
    const where = status ? { status } : {};
    const [data, total] = await this.orderRepo.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }

  async findMyOrders(userId: string) {
    return this.orderRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId?: string, role?: UserRole) {
    const order = await this.orderRepo.findOne({ where: { id }, relations: ['items'] });
    if (!order) throw new NotFoundException('Commande introuvable');
    if (role !== UserRole.ADMIN && role !== UserRole.SUPER_ADMIN && order.userId !== userId) {
      throw new ForbiddenException('Accès refusé');
    }
    return order;
  }

  async updateStatus(id: string, status: OrderStatus) {
    await this.orderRepo.update(id, { status });
    return this.orderRepo.findOne({ where: { id } });
  }

  async cancel(id: string, userId: string, role: UserRole) {
    const order = await this.findOne(id, userId, role);
    if ([OrderStatus.SHIPPED, OrderStatus.DELIVERED].includes(order.status)) {
      throw new ForbiddenException('Cette commande ne peut plus être annulée');
    }
    return this.updateStatus(id, OrderStatus.CANCELLED);
  }
}
