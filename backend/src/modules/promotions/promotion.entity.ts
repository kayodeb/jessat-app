import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
} from 'typeorm';

export enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

@Entity('promotions')
export class Promotion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: DiscountType })
  discountType: DiscountType;

  @Column('decimal', { precision: 10, scale: 2 })
  discountValue: number;

  @Column('timestamp')
  startDate: Date;

  @Column('timestamp')
  endDate: Date;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  minPurchase: number;

  @Column({ default: 0 })
  usageLimit: number;

  @Column({ default: 0 })
  usageCount: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  targetCategory: string; // 'all' | ProductCategory

  @CreateDateColumn()
  createdAt: Date;
}
