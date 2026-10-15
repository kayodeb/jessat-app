import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockMovement, StockMovementType } from './stock-movement.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockMovement)
    private readonly repo: Repository<StockMovement>,
  ) {}

  async findAll(query: { page?: number; limit?: number; productId?: string }) {
    const { page = 1, limit = 50, productId } = query;
    const where = productId ? { productId } : {};
    const [data, total] = await this.repo.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }

  async recordMovement(data: {
    productId: string;
    changeQuantity: number;
    type: StockMovementType;
    reason?: string;
  }) {
    const movement = this.repo.create(data);
    return this.repo.save(movement);
  }
}
