import {
  Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';

export type ConfigCategory = 'cpu' | 'gpu' | 'ram' | 'storage' | 'cooling' | 'chassis';

@Entity('config_options')
export class ConfigOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category: string; // cpu | gpu | ram | storage | cooling | chassis

  @Column()
  name: string;

  @Column({ nullable: true })
  subtitle: string;

  @Column()
  brand: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  priceDelta: number;

  @Column({ default: false })
  isDefault: boolean;

  @Column({ nullable: true })
  badge: string;

  @Column('jsonb', { nullable: true })
  specs: { label: string; value: string }[];

  @Column({ nullable: true })
  benchmarkGain: string;
}
