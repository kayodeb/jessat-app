import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { Category } from '../categories/category.entity';
import { Review } from '../reviews/review.entity';
import { StockMovement } from '../stock/stock-movement.entity';

export type ProductBadge = 'Bestseller' | 'Promo';
export type ProductCondition = 'neuf' | 'reconditionne';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  brand: string;

  @Column()
  tagline: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  compareAtPrice: number;

  @Column({ nullable: true })
  badge: string;

  @Column({ default: false })
  isNew: boolean;

  @Column({ default: false })
  isBestseller: boolean;

  @Column('decimal', { precision: 3, scale: 2, default: 0 })
  rating: number;

  @Column({ default: 0 })
  reviewCount: number;

  @Column({ default: true })
  inStock: boolean;

  @Column({ default: 0 })
  stockCount: number;

  @Column({ default: false })
  featured: boolean;

  @Column({ nullable: true })
  condition: string;

  // JSON columns
  @Column('jsonb', { nullable: true })
  specifications: Record<string, any>;

  @Column('jsonb', { nullable: true })
  benchmarks: Record<string, any>;

  @Column('jsonb', { nullable: true })
  colorVariants: { name: string; hex: string }[];

  @Column('simple-array', { nullable: true })
  images: string[];

  @ManyToOne(() => Category, (cat) => cat.products, { eager: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ nullable: true })
  categoryId: string;

  @OneToMany(() => Review, (r) => r.product)
  reviews: Review[];

  @OneToMany(() => StockMovement, (s) => s.product)
  stockMovements: StockMovement[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
