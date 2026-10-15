import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, ILike, Between } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  async findAll(query: ProductQueryDto) {
    const {
      category, brand, minPrice, maxPrice, inStock, featured,
      search, sort, page = 1, limit = 12,
    } = query;

    const qb = this.repo.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category');

    if (category) qb.andWhere('category.slug = :category', { category });
    if (brand) qb.andWhere('product.brand ILIKE :brand', { brand: `%${brand}%` });
    if (minPrice) qb.andWhere('product.price >= :minPrice', { minPrice });
    if (maxPrice) qb.andWhere('product.price <= :maxPrice', { maxPrice });
    if (inStock !== undefined) qb.andWhere('product.inStock = :inStock', { inStock });
    if (featured !== undefined) qb.andWhere('product.featured = :featured', { featured });
    if (search) {
      qb.andWhere('(product.name ILIKE :search OR product.brand ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    switch (sort) {
      case 'price_asc': qb.orderBy('product.price', 'ASC'); break;
      case 'price_desc': qb.orderBy('product.price', 'DESC'); break;
      case 'rating': qb.orderBy('product.rating', 'DESC'); break;
      case 'newest': qb.orderBy('product.createdAt', 'DESC'); break;
      default: qb.orderBy('product.createdAt', 'DESC');
    }

    const total = await qb.getCount();
    qb.skip((page - 1) * limit).take(limit);
    const products = await qb.getMany();

    return { data: products, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findBySlug(slug: string) {
    const product = await this.repo.findOne({ where: { slug } });
    if (!product) throw new NotFoundException(`Produit "${slug}" introuvable`);
    return product;
  }

  async findById(id: string) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Produit introuvable');
    return product;
  }

  async findFeatured() {
    return this.repo.find({ where: { featured: true }, take: 10 });
  }

  async findBestsellers() {
    return this.repo.find({ where: { isBestseller: true }, take: 10 });
  }

  async findNew() {
    return this.repo.find({ where: { isNew: true }, take: 10 });
  }

  async findPromos() {
    return this.repo
      .createQueryBuilder('product')
      .where('product.compareAtPrice IS NOT NULL')
      .andWhere('product.compareAtPrice > product.price')
      .take(20)
      .getMany();
  }

  async create(dto: CreateProductDto) {
    const product = this.repo.create(dto as any);
    return this.repo.save(product);
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.findById(id);
    Object.assign(product, dto);
    return this.repo.save(product);
  }

  async remove(id: string) {
    const product = await this.findById(id);
    return this.repo.remove(product);
  }

  async addImage(id: string, imageUrl: string) {
    const product = await this.findById(id);
    product.images = [...(product.images || []), imageUrl];
    return this.repo.save(product);
  }

  async removeImage(id: string, imageUrl: string) {
    const product = await this.findById(id);
    product.images = (product.images || []).filter((img) => img !== imageUrl);
    return this.repo.save(product);
  }

  async updateStock(id: string, quantity: number) {
    const product = await this.findById(id);
    product.stockCount = quantity;
    product.inStock = quantity > 0;
    return this.repo.save(product);
  }

  async decrementStock(id: string, quantity: number) {
    const product = await this.findById(id);
    product.stockCount = Math.max(0, product.stockCount - quantity);
    product.inStock = product.stockCount > 0;
    return this.repo.save(product);
  }

  async updateRating(productId: string) {
    const result = await this.repo
      .createQueryBuilder('product')
      .select('AVG(review.rating)', 'avg')
      .addSelect('COUNT(review.id)', 'count')
      .leftJoin('product.reviews', 'review')
      .where('product.id = :productId AND review.isApproved = true', { productId })
      .getRawOne();

    await this.repo.update(productId, {
      rating: parseFloat(result.avg) || 0,
      reviewCount: parseInt(result.count) || 0,
    });
  }
}
