import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly repo: Repository<Wishlist>,
  ) {}

  findByUser(userId: string) {
    return this.repo.find({ where: { userId } });
  }

  async add(userId: string, productId: string) {
    const exists = await this.repo.findOne({ where: { userId, productId } });
    if (exists) return exists;
    return this.repo.save(this.repo.create({ userId, productId }));
  }

  async remove(userId: string, productId: string) {
    await this.repo.delete({ userId, productId });
    return { message: 'Retiré de la wishlist' };
  }
}
