import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ConfiguratorModule } from './modules/configurator/configurator.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PromotionsModule } from './modules/promotions/promotions.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { StockModule } from './modules/stock/stock.module';
import { UploadModule } from './modules/upload/upload.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const dbUrl = config.get<string>('DATABASE_URL');
        const isNeon = Boolean(dbUrl && dbUrl.includes('neon.tech'));
        const useSsl = isNeon || config.get<string>('DATABASE_SSL') === 'true';

        return dbUrl
          ? {
              type: 'postgres',
              url: dbUrl,
              ssl: useSsl ? { rejectUnauthorized: false } : false,
              autoLoadEntities: true,
              synchronize: config.get('NODE_ENV') !== 'production',
            }
          : {
              type: 'postgres',
              host: config.get<string>('DATABASE_HOST', 'localhost'),
              port: config.get<number>('DATABASE_PORT', 5432),
              username: config.get<string>('DATABASE_USER', 'postgres'),
              password: config.get<string>('DATABASE_PASSWORD', 'postgres'),
              database: config.get<string>('DATABASE_NAME', 'jessat_db'),
              ssl: useSsl ? { rejectUnauthorized: false } : false,
              autoLoadEntities: true,
              synchronize: config.get('NODE_ENV') !== 'production',
            };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    ConfiguratorModule,
    CartModule,
    OrdersModule,
    PaymentsModule,
    PromotionsModule,
    WishlistModule,
    ReviewsModule,
    StockModule,
    UploadModule,
    AdminModule,
  ],
})
export class AppModule {}
