import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigOption } from './config-option.entity';

@Injectable()
export class ConfiguratorService {
  constructor(
    @InjectRepository(ConfigOption)
    private readonly repo: Repository<ConfigOption>,
  ) {}

  async findAll() {
    const options = await this.repo.find();
    // Group by category
    return options.reduce((acc, opt) => {
      if (!acc[opt.category]) acc[opt.category] = [];
      acc[opt.category].push(opt);
      return acc;
    }, {} as Record<string, ConfigOption[]>);
  }

  findByCategory(category: string) {
    return this.repo.find({ where: { category } });
  }

  async validate(selectedOptions: Record<string, string>) {
    let total = 0;
    const validated = {};
    for (const [category, optionId] of Object.entries(selectedOptions)) {
      const option = await this.repo.findOne({ where: { id: optionId as string, category } });
      if (!option) throw new NotFoundException(`Option ${optionId} invalide pour ${category}`);
      total += option.priceDelta;
      validated[category] = option;
    }
    return { isValid: true, totalPrice: total, options: validated };
  }

  create(data: Partial<ConfigOption>) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: string, data: Partial<ConfigOption>) {
    await this.repo.update(id, data);
    return this.repo.findOne({ where: { id } });
  }

  async remove(id: string) {
    const option = await this.repo.findOne({ where: { id } });
    if (!option) throw new NotFoundException();
    return this.repo.remove(option);
  }
}
