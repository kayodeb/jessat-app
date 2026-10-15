import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repo: Repository<Category>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findBySlug(slug: string) {
    const cat = await this.repo.findOne({ where: { slug }, relations: ['products'] });
    if (!cat) throw new NotFoundException(`Catégorie "${slug}" introuvable`);
    return cat;
  }

  async create(data: Partial<Category>) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: string, data: Partial<Category>) {
    await this.repo.update(id, data);
    return this.repo.findOne({ where: { id } });
  }

  async remove(id: string) {
    const cat = await this.repo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException();
    return this.repo.remove(cat);
  }
}
