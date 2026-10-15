import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promotion, DiscountType } from './promotion.entity';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private readonly repo: Repository<Promotion>,
  ) {}

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: string) {
    const promo = await this.repo.findOne({ where: { id } });
    if (!promo) throw new NotFoundException('Promotion introuvable');
    return promo;
  }

  async validate(code: string, cartTotal: number): Promise<Promotion> {
    const promo = await this.repo.findOne({ where: { code: code.toUpperCase() } });
    if (!promo) throw new BadRequestException('Code promo invalide');
    if (!promo.isActive) throw new BadRequestException('Code promo expiré ou inactif');
    const now = new Date();
    if (now < promo.startDate || now > promo.endDate) throw new BadRequestException('Code promo hors période de validité');
    if (promo.usageLimit > 0 && promo.usageCount >= promo.usageLimit) throw new BadRequestException('Code promo épuisé');
    if (cartTotal < promo.minPurchase) throw new BadRequestException(`Achat minimum requis : ${promo.minPurchase}€`);
    return promo;
  }

  calculateDiscount(promo: Promotion, subtotal: number): number {
    if (promo.discountType === DiscountType.PERCENTAGE) {
      return (subtotal * promo.discountValue) / 100;
    }
    return Math.min(promo.discountValue, subtotal);
  }

  async create(data: Partial<Promotion>) {
    const promo = this.repo.create({ ...data, code: (data.code as string).toUpperCase() });
    return this.repo.save(promo);
  }

  async update(id: string, data: Partial<Promotion>) {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async remove(id: string) {
    const promo = await this.findById(id);
    return this.repo.remove(promo);
  }

  async toggle(id: string) {
    const promo = await this.findById(id);
    promo.isActive = !promo.isActive;
    return this.repo.save(promo);
  }

  async incrementUsage(id: string) {
    await this.repo.increment({ id }, 'usageCount', 1);
  }
}
