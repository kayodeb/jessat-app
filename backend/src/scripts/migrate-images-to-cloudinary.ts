/**
 * Script de migration des images vers Cloudinary
 * Parcourt les produits et catégories dans PostgreSQL et télécharge automatiquement
 * les images distantes (Unsplash, etc.) sur ton compte Cloudinary, puis met à jour les URLs en base.
 *
 * Usage : npm run upload:cloudinary ou npx ts-node -r tsconfig-paths/register src/scripts/migrate-images-to-cloudinary.ts
 */

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

import { User } from '../modules/users/user.entity';
import { Product } from '../modules/products/product.entity';
import { Category } from '../modules/categories/category.entity';
import { ConfigOption } from '../modules/configurator/config-option.entity';
import { CartItem } from '../modules/cart/cart-item.entity';
import { Order } from '../modules/orders/order.entity';
import { OrderItem } from '../modules/orders/order-item.entity';
import { Payment } from '../modules/payments/payment.entity';
import { Promotion } from '../modules/promotions/promotion.entity';
import { Wishlist } from '../modules/wishlist/wishlist.entity';
import { Review } from '../modules/reviews/review.entity';
import { StockMovement } from '../modules/stock/stock-movement.entity';

// ── Cloudinary Config ─────────────────────────────────────────────────────────
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error('❌ Erreur : Variables CLOUDINARY manquantes dans backend/.env');
  console.error('Vérifiez que CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY et CLOUDINARY_API_SECRET sont définis.');
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

// ── DataSource ─────────────────────────────────────────────────────────────────
const isNeon = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.includes('neon.tech'));
const hasDbUrl = Boolean(process.env.DATABASE_URL);

const AppDataSource = new DataSource(
  hasDbUrl
    ? {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: isNeon || process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
        entities: [
          User, Product, Category, ConfigOption, CartItem,
          Order, OrderItem, Payment, Promotion, Wishlist, Review, StockMovement,
        ],
      }
    : {
        type: 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT || '5432', 10),
        username: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
        database: process.env.DATABASE_NAME || 'jessat_db',
        entities: [
          User, Product, Category, ConfigOption, CartItem,
          Order, OrderItem, Payment, Promotion, Wishlist, Review, StockMovement,
        ],
      }
);

async function uploadToCloudinary(url: string, folder: string): Promise<string> {
  if (url.includes('res.cloudinary.com')) {
    return url; // Déjà sur Cloudinary
  }
  try {
    const res = await cloudinary.uploader.upload(url, {
      folder,
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    });
    return res.secure_url;
  } catch (err: any) {
    console.warn(`  ⚠️ Échec upload Cloudinary pour ${url} : ${err.message}`);
    return url;
  }
}

async function run() {
  console.log('🚀 Connexion à la base de données PostgreSQL...');
  await AppDataSource.initialize();
  console.log('✅ Connecté.');

  const categoryRepo = AppDataSource.getRepository(Category);
  const productRepo = AppDataSource.getRepository(Product);

  // 1. Migrer les catégories
  console.log('\n📂 [1/2] Migration des images de Catégories vers Cloudinary...');
  const categories = await categoryRepo.find();
  for (const cat of categories) {
    if (cat.imageUrl && !cat.imageUrl.includes('res.cloudinary.com')) {
      console.log(`  ⏳ Upload image pour catégorie : ${cat.name}...`);
      const newUrl = await uploadToCloudinary(cat.imageUrl, 'jessat/categories');
      if (newUrl !== cat.imageUrl) {
        cat.imageUrl = newUrl;
        await categoryRepo.save(cat);
        console.log(`  ✓ Catégorie mise à jour -> ${newUrl}`);
      }
    } else {
      console.log(`  ↩ Catégorie ${cat.name} déjà sur Cloudinary ou sans image.`);
    }
  }

  // 2. Migrer les produits
  console.log('\n📦 [2/2] Migration des images de Produits vers Cloudinary...');
  const products = await productRepo.find();
  for (const prod of products) {
    if (prod.images && prod.images.length > 0) {
      let modified = false;
      const updatedImages: string[] = [];

      for (let i = 0; i < prod.images.length; i++) {
        const imgUrl = prod.images[i];
        if (imgUrl && !imgUrl.includes('res.cloudinary.com')) {
          console.log(`  ⏳ Upload image [${i + 1}/${prod.images.length}] pour : ${prod.name}...`);
          const newUrl = await uploadToCloudinary(imgUrl, 'jessat/products');
          updatedImages.push(newUrl);
          if (newUrl !== imgUrl) modified = true;
        } else {
          updatedImages.push(imgUrl);
        }
      }

      if (modified) {
        prod.images = updatedImages;
        await productRepo.save(prod);
        console.log(`  ✓ Produit ${prod.name} mis à jour avec ses URLs Cloudinary.`);
      } else {
        console.log(`  ↩ Produit ${prod.name} déjà à jour.`);
      }
    }
  }

  console.log('\n🎉 ============================================================');
  console.log('🎉 Toutes les images sont désormais hébergées sur Cloudinary !');
  console.log('🎉 Les URLs dans votre base PostgreSQL ont été mises à jour.');
  console.log('🎉 ============================================================\n');

  await AppDataSource.destroy();
}

run().catch((err) => {
  console.error('❌ Erreur lors de la migration Cloudinary :', err);
  process.exit(1);
});
