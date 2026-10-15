import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';

export enum StockMovementType {
  RESTOCK = 'RESTOCK',
  SALE = 'SALE',
  ADJUSTMENT = 'ADJUSTMENT',
  RETURN = 'RETURN',
}

@Entity('stock_movements')
export class StockMovement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (p) => p.stockMovements, { eager: true })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  productId: string;

  @Column('int')
  changeQuantity: number; // positive = IN, negative = OUT

  @Column({ type: 'enum', enum: StockMovementType })
  type: StockMovementType;

  @Column('text', { nullable: true })
  reason: string;

  @CreateDateColumn()
  createdAt: Date;
}
