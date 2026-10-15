import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { ProductsService } from '../products/products.service';
import { PromotionsService } from '../promotions/promotions.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem) private readonly repo: Repository<CartItem>,
    private readonly productsService: ProductsService,
    private readonly promotionsService: PromotionsService,
  ) {}

  async getCart(userId: string) {
    const items = await this.repo.find({ where: { userId } });
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    return { items, subtotal, totalItems: items.reduce((s, i) => s + i.quantity, 0) };
  }

  async addItem(userId: string, dto: { productId: string; quantity: number; selectedOptions?: Record<string, string>; customConfigurationId?: string }) {
    await this.productsService.findById(dto.productId); // validate product exists

    const existing = await this.repo.findOne({
      where: { userId, productId: dto.productId },
    });

    if (existing) {
      existing.quantity += dto.quantity;
      return this.repo.save(existing);
    }

    const item = this.repo.create({ userId, ...dto });
    return this.repo.save(item);
  }

  async updateItem(userId: string, itemId: string, quantity: number) {
    if (quantity <= 0) throw new BadRequestException('La quantité doit être supérieure à 0');
    const item = await this.repo.findOne({ where: { id: itemId, userId } });
    if (!item) throw new NotFoundException('Article non trouvé dans le panier');
    item.quantity = quantity;
    return this.repo.save(item);
  }

  async removeItem(userId: string, itemId: string) {
    const item = await this.repo.findOne({ where: { id: itemId, userId } });
    if (!item) throw new NotFoundException('Article non trouvé dans le panier');
    return this.repo.remove(item);
  }

  async clearCart(userId: string) {
    await this.repo.delete({ userId });
    return { message: 'Panier vidé' };
  }

  async applyPromo(userId: string, code: string) {
    const cart = await this.getCart(userId);
    const promo = await this.promotionsService.validate(code, cart.subtotal);
    return { ...cart, promo, discount: this.promotionsService.calculateDiscount(promo, cart.subtotal) };
  }
}
