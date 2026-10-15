import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { ProductsService } from '../products/products.service';
import { UserRole } from '../users/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private readonly repo: Repository<Review>,
    private readonly productsService: ProductsService,
  ) {}

  findByProduct(productId: string) {
    return this.repo.find({ where: { productId, isApproved: true }, order: { createdAt: 'DESC' } });
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async create(userId: string, data: { productId: string; rating: number; comment?: string }) {
    const review = this.repo.create({ userId, ...data, isApproved: false });
    const saved = await this.repo.save(review);
    await this.productsService.updateRating(data.productId);
    return saved;
  }

  async update(id: string, userId: string, data: { rating?: number; comment?: string }) {
    const review = await this.repo.findOne({ where: { id } });
    if (!review) throw new NotFoundException('Avis introuvable');
    if (review.userId !== userId) throw new ForbiddenException('Non autorisé');
    Object.assign(review, data);
    const saved = await this.repo.save(review);
    await this.productsService.updateRating(review.productId);
    return saved;
  }

  async remove(id: string, userId: string, role: UserRole) {
    const review = await this.repo.findOne({ where: { id } });
    if (!review) throw new NotFoundException('Avis introuvable');
    if (role !== UserRole.ADMIN && role !== UserRole.SUPER_ADMIN && review.userId !== userId) {
      throw new ForbiddenException('Non autorisé');
    }
    const productId = review.productId;
    await this.repo.remove(review);
    await this.productsService.updateRating(productId);
    return { message: 'Avis supprimé' };
  }

  async approve(id: string) {
    await this.repo.update(id, { isApproved: true });
    const review = await this.repo.findOne({ where: { id } });
    await this.productsService.updateRating(review.productId);
    return review;
  }
}
