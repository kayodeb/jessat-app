/**
 * Jessat DB Seeder
 * Migre l'ensemble des données mockées (Catégories, Produits, Options Configurateur, Utilisateurs)
 * vers PostgreSQL (Neon ou local) via TypeORM.
 *
 * Usage : npm run seed ou npx ts-node -r tsconfig-paths/register src/seed.ts
 */

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as bcrypt from 'bcryptjs';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

// ── Entities ──────────────────────────────────────────────────────────────────
import { User, UserRole, UserStatus } from './modules/users/user.entity';
import { Product } from './modules/products/product.entity';
import { Category } from './modules/categories/category.entity';
import { ConfigOption } from './modules/configurator/config-option.entity';
import { CartItem } from './modules/cart/cart-item.entity';
import { Order } from './modules/orders/order.entity';
import { OrderItem } from './modules/orders/order-item.entity';
import { Payment } from './modules/payments/payment.entity';
import { Promotion } from './modules/promotions/promotion.entity';
import { Wishlist } from './modules/wishlist/wishlist.entity';
import { Review } from './modules/reviews/review.entity';
import { StockMovement } from './modules/stock/stock-movement.entity';

// ── DataSource Configuration ───────────────────────────────────────────────────
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
        synchronize: true,
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
        synchronize: true,
      }
);

// ── Categories Data ───────────────────────────────────────────────────────────
const CATEGORIES_DATA = [
  {
    name: 'Ordinateurs',
    slug: 'ordinateurs',
    icon: '🖥️',
    description: 'PC Gaming 4K, stations de travail IA, PC portables ultra-fins et tours sur-mesure.',
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Claviers',
    slug: 'claviers',
    icon: '⌨️',
    description: 'Claviers mécaniques Rapid Trigger, switches magnétiques et châssis usiné CNC.',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Souris',
    slug: 'souris',
    icon: '🖱️',
    description: 'Souris gaming ultra-légères, capteurs optiques 36K DPI et grip ergonomique.',
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Imprimantes',
    slug: 'imprimantes',
    icon: '🖨️',
    description: 'Imprimantes jet & laser couleur et multifonctions haute résolution.',
    imageUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Projecteurs',
    slug: 'projecteurs',
    icon: '📽️',
    description: 'Vidéoprojecteurs 4K laser, courte focale et projecteurs portables ultra-lumineux.',
    imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Accessoires',
    slug: 'accessoires',
    icon: '🎧',
    description: 'Tapis de souris XXL, casques Hi-Res, webcams 4K et hubs USB-C pro.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
  },
];

// ── Configurator Options Data ─────────────────────────────────────────────────
const CONFIGURATOR_DATA = [
  // CPU
  {
    category: 'cpu',
    name: 'AMD Ryzen 5 7600X',
    subtitle: '6 cœurs / 12 threads @ 5.3 GHz',
    brand: 'AMD',
    priceDelta: 0,
    isDefault: true,
    specs: [
      { label: 'Cœurs / Threads', value: '6 / 12' },
      { label: 'Fréquence Max', value: '5.3 GHz' },
      { label: 'Mémoire Cache L3', value: '32 Mo' },
    ],
    benchmarkGain: 'Base 1440p fluide',
  },
  {
    category: 'cpu',
    name: 'AMD Ryzen 7 7800X3D',
    subtitle: '8 cœurs / 16 threads avec cache 3D V-Cache',
    brand: 'AMD',
    priceDelta: 240,
    badge: 'Favori Gaming',
    isDefault: false,
    specs: [
      { label: 'Cœurs / Threads', value: '8 / 16' },
      { label: 'Fréquence Max', value: '5.0 GHz' },
      { label: 'Cache 3D V-Cache', value: '96 Mo' },
    ],
    benchmarkGain: '+24% FPS en jeu',
  },
  {
    category: 'cpu',
    name: 'AMD Ryzen 7 9800X3D',
    subtitle: 'Architecture Zen 5, le processeur de référence absolue',
    brand: 'AMD',
    priceDelta: 360,
    badge: 'Performances Maximales',
    isDefault: false,
    specs: [
      { label: 'Cœurs / Threads', value: '8 / 16' },
      { label: 'Fréquence Max', value: '5.2 GHz' },
      { label: 'Cache 3D V-Cache Gen 2', value: '104 Mo' },
    ],
    benchmarkGain: '+38% FPS 1% Low',
  },
  {
    category: 'cpu',
    name: 'Intel Core Ultra 7 265K',
    subtitle: '20 cœurs (8 Performance + 12 Efficacité) @ 5.5 GHz avec NPU IA',
    brand: 'Intel',
    priceDelta: 280,
    isDefault: false,
    specs: [
      { label: 'Cœurs Hybrides', value: '20 Cœurs' },
      { label: 'Fréquence Max', value: '5.5 GHz' },
      { label: 'NPU Dédié IA', value: '13 TOPS' },
    ],
    benchmarkGain: '+32% Rendu 3D',
  },

  // GPU
  {
    category: 'gpu',
    name: 'NVIDIA GeForce RTX 5070 12 Go',
    subtitle: 'Architecture Blackwell, Ray Tracing 4e Génération',
    brand: 'NVIDIA',
    priceDelta: 0,
    isDefault: true,
    specs: [
      { label: 'Mémoire VRAM', value: '12 Go GDDR7' },
      { label: 'Bande Passante', value: '672 Go/s' },
      { label: 'Cible Résolution', value: '1440p Ultra' },
    ],
    benchmarkGain: '85+ FPS en 1440p',
  },
  {
    category: 'gpu',
    name: 'NVIDIA GeForce RTX 5070 Ti 16 Go',
    subtitle: '16 Go GDDR7, idéal pour 1440p Ultra et 4K avec DLSS',
    brand: 'NVIDIA',
    priceDelta: 290,
    badge: 'Recommandé',
    isDefault: false,
    specs: [
      { label: 'Mémoire VRAM', value: '16 Go GDDR7' },
      { label: 'Bande Passante', value: '896 Go/s' },
      { label: 'Cible Résolution', value: '4K DLSS 4' },
    ],
    benchmarkGain: '+30% en 4K',
  },
  {
    category: 'gpu',
    name: 'NVIDIA GeForce RTX 5080 16 Go',
    subtitle: 'Puissance brute d\'exception pour le 4K natif sans compromis',
    brand: 'NVIDIA',
    priceDelta: 690,
    badge: 'Très Haut de Gamme',
    isDefault: false,
    specs: [
      { label: 'Mémoire VRAM', value: '16 Go GDDR7' },
      { label: 'Cœurs CUDA', value: '10 752' },
      { label: 'Cible Résolution', value: '4K Ultra 120 FPS' },
    ],
    benchmarkGain: '+65% FPS 4K',
  },
  {
    category: 'gpu',
    name: 'NVIDIA GeForce RTX 5090 24 Go',
    subtitle: 'Le monstre de calcul graphique et IA sans équivalent mondial',
    brand: 'NVIDIA',
    priceDelta: 1650,
    badge: 'Puissance Ultime',
    isDefault: false,
    specs: [
      { label: 'Mémoire VRAM', value: '24 Go GDDR7' },
      { label: 'Cœurs CUDA', value: '21 760' },
      { label: 'Cible Résolution', value: '4K Max Path Tracing' },
    ],
    benchmarkGain: '+125% Puissance Brute',
  },

  // RAM
  {
    category: 'ram',
    name: '32 Go (2x16Go) DDR5 6000MHz CL30',
    subtitle: 'Profil EXPO / XMP certifié ultra-faible latence',
    brand: 'Corsair Vengeance',
    priceDelta: 0,
    isDefault: true,
    specs: [
      { label: 'Capacité', value: '32 Go' },
      { label: 'Vitesse', value: '6000 MT/s' },
      { label: 'Latence', value: 'CL30' },
    ],
    benchmarkGain: 'Standard Idéal',
  },
  {
    category: 'ram',
    name: '64 Go (2x32Go) DDR5 6000MHz CL30',
    subtitle: 'Confort total pour montage 4K/8K, modélisation 3D et multitâche lourd',
    brand: 'Corsair Vengeance',
    priceDelta: 140,
    badge: 'Créateur Pro',
    isDefault: false,
    specs: [
      { label: 'Capacité', value: '64 Go' },
      { label: 'Vitesse', value: '6000 MT/s' },
      { label: 'Latence', value: 'CL30' },
    ],
    benchmarkGain: 'Capacité Doublée',
  },
  {
    category: 'ram',
    name: '64 Go (2x32Go) DDR5 Dominator Titanium 6400MHz',
    subtitle: 'Puces haute précision avec dissipateur en aluminium massif anodisé',
    brand: 'Corsair Dominator',
    priceDelta: 220,
    isDefault: false,
    specs: [
      { label: 'Capacité', value: '64 Go' },
      { label: 'Vitesse', value: '6400 MT/s' },
      { label: 'Finition', value: 'Aluminium Sablé' },
    ],
    benchmarkGain: '+5% Débit Mémoire',
  },

  // STORAGE
  {
    category: 'storage',
    name: '1 To SSD NVMe M.2 PCIe 4.0',
    subtitle: 'Débit lecture 7 000 Mo/s, écriture 6 000 Mo/s',
    brand: 'Kingston Fury Renegade',
    priceDelta: 0,
    isDefault: true,
    specs: [
      { label: 'Capacité', value: '1 To' },
      { label: 'Débit Lecture', value: '7 000 Mo/s' },
      { label: 'Endurance', value: '1000 To écrits' },
    ],
    benchmarkGain: 'Démarrage Instantané',
  },
  {
    category: 'storage',
    name: '2 To SSD NVMe M.2 PCIe 4.0',
    subtitle: 'Capacité doublée pour installer votre bibliothèque complète de jeux',
    brand: 'Samsung 990 PRO',
    priceDelta: 95,
    badge: 'Le Plus Choisi',
    isDefault: false,
    specs: [
      { label: 'Capacité', value: '2 To' },
      { label: 'Débit Lecture', value: '7 450 Mo/s' },
      { label: 'Mémoire Cache', value: '2 Go LPDDR4' },
    ],
    benchmarkGain: '2x Plus d\'Espace',
  },
  {
    category: 'storage',
    name: '4 To SSD NVMe M.2 PCIe 5.0 Haute Vitesse',
    subtitle: 'Le summum de la vitesse Gen5 : 12 400 Mo/s avec dissipateur thermique dédié',
    brand: 'Crucial T705 Gen5',
    priceDelta: 340,
    badge: 'Vitesse Ultime',
    isDefault: false,
    specs: [
      { label: 'Capacité', value: '4 To' },
      { label: 'Débit Lecture', value: '12 400 Mo/s' },
      { label: 'Interface', value: 'PCIe 5.0 x4' },
    ],
    benchmarkGain: 'Zéro Temps d\'Attente',
  },

  // COOLING
  {
    category: 'cooling',
    name: 'Watercooling AERO Flow 240mm AIO',
    subtitle: 'Pompe en céramique ultra-silencieuse et 2 ventilateurs haute pression hydrodynamique',
    brand: 'AERO Cooling',
    priceDelta: 0,
    isDefault: true,
    specs: [
      { label: 'Radiateur', value: '240 mm Aluminium' },
      { label: 'Bruit Sonore', value: '< 21 dBA' },
    ],
    benchmarkGain: 'Silence Assuré',
  },
  {
    category: 'cooling',
    name: 'Watercooling AERO Glace 360mm avec Écran LCD 2.8"',
    subtitle: 'Affichage des températures en direct, 3 ventilateurs à lévitation magnétique',
    brand: 'AERO Cooling',
    priceDelta: 160,
    badge: 'Esthétique Studio',
    isDefault: false,
    specs: [
      { label: 'Radiateur', value: '360 mm Haute Densité' },
      { label: 'Écran Intégré', value: '2.8" IPS 480x480' },
      { label: 'Bruit Sonore', value: '< 18 dBA' },
    ],
    benchmarkGain: '-8°C en Pleine Charge',
  },

  // CHASSIS
  {
    category: 'chassis',
    name: 'AERO PURE MESH NOIR',
    subtitle: 'Façade micro-perforée à flux d\'air direct, verre trempé fumé latéral',
    brand: 'AERO Boîtiers',
    priceDelta: 0,
    isDefault: true,
    specs: [
      { label: 'Flux d\'Air', value: 'Pression Positive' },
      { label: 'Connectique', value: 'USB-C 20Gbps + 2x USB 3.0' },
    ],
  },
  {
    category: 'chassis',
    name: 'AERO VISION DOUBLE CHAMBRE BLANC',
    subtitle: 'Design panoramique sans pilier d\'angle, finition blanc mat et aluminium anodisé',
    brand: 'AERO Boîtiers',
    priceDelta: 110,
    badge: 'Vue Panoramique',
    isDefault: false,
    specs: [
      { label: 'Architecture', value: 'Double Compartiment' },
      { label: 'Vitre', value: 'Verre trempé courbé 4mm' },
    ],
  },
];

// ── Products Data (Full Catalog) ──────────────────────────────────────────────
const PRODUCTS_DATA = [
  // ORDINATEURS
  {
    name: 'AERO APEX ONE EXTREME',
    slug: 'aero-apex-one-extreme',
    brand: 'AERO RIGS',
    tagline: 'L\'apogée de l\'architecture gaming 4K Ultra.',
    description: 'Une machine sculptée dans l\'aluminium usiné CNC et le verre trempé fumé. Équipée du Ryzen 7 9800X3D et de la RTX 5090 24GB pour dominer tous les titres compétitifs et AAA en 4K avec ray tracing complet.',
    price: 3899,
    compareAtPrice: 4299,
    badge: 'Bestseller',
    isBestseller: true,
    rating: 4.9,
    reviewCount: 148,
    categorySlug: 'ordinateurs',
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      cpu: 'AMD Ryzen 7 9800X3D (8 cœurs / 16 threads @ 5.2GHz)',
      gpu: 'NVIDIA GeForce RTX 5090 24 Go GDDR7',
      ram: '64 Go DDR5 6000MHz CL30 RGB EXPO',
      storage: '2 To SSD NVMe PCIe 5.0 Gen5 (12 000 Mo/s)',
      cooling: 'Watercooling AIO 360mm avec écran LCD dynamique',
      motherboard: 'ASUS ROG Strix X870E Gaming WiFi',
      powerSupply: '1000W 80+ Platinum ATX 3.1 PCIe 5',
    },
    benchmarks: {
      gamingScore4k: 99,
      fpsCyberpunk4k: 112,
      fpsWarzone4k: 245,
      productivityScore: 96,
    },
    condition: 'neuf',
    inStock: true,
    stockCount: 6,
    featured: true,
  },
  {
    name: 'PHANTOM PRO STEALTH',
    slug: 'phantom-pro-stealth-5080',
    brand: 'AERO RIGS',
    tagline: 'Sobriété noire absolue, silence acoustique zéro décibel.',
    description: 'Conception acoustique sur-mesure sans RGB agressif. Panneaux en mesh anodisé noir mat, flux d\'air laminaire à pression positive et refroidissement par liquide haute densité.',
    price: 2699,
    compareAtPrice: 2949,
    isNew: true,
    rating: 4.8,
    reviewCount: 92,
    categorySlug: 'ordinateurs',
    images: [
      'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      cpu: 'Intel Core Ultra 7 265K (20 cœurs @ 5.5GHz)',
      gpu: 'NVIDIA GeForce RTX 5080 16 Go GDDR7',
      ram: '32 Go DDR5 6400MHz Profil Bas',
      storage: '2 To SSD NVMe PCIe 4.0 (7 400 Mo/s)',
      cooling: 'Double Tour Dark Rock Pro 5 Furtif',
      motherboard: 'MSI MAG Z890 Tomahawk WiFi',
      powerSupply: '850W 80+ Gold Modulaire',
    },
    benchmarks: {
      gamingScore4k: 94,
      fpsCyberpunk4k: 88,
      fpsWarzone4k: 195,
      productivityScore: 92,
    },
    condition: 'neuf',
    inStock: true,
    stockCount: 11,
    featured: true,
  },
  {
    name: 'HORIZON STUDIO WORKSTATION',
    slug: 'horizon-studio-workstation',
    brand: 'AERO LABS',
    tagline: 'Station de calcul pour IA locale, 3D Unreal Engine et montage 8K.',
    description: 'Certifiée pour les workflows de deep learning, rendu 3D temps réel et post-production cinéma. Stabilité ECC et refroidissement continu testé 72h à pleine charge.',
    price: 4599,
    compareAtPrice: 4999,
    rating: 5.0,
    reviewCount: 34,
    categorySlug: 'ordinateurs',
    images: [
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      cpu: 'AMD Ryzen 9 9950X (16 cœurs / 32 threads @ 5.7GHz)',
      gpu: 'NVIDIA GeForce RTX 5090 24 Go Pilotes Studio',
      ram: '96 Go DDR5 ECC 5600MHz',
      storage: '4 To Gen5 Raid 0 NVMe SSD (12 000 Mo/s)',
      cooling: 'Watercooling Sur-Mesure Circuit Fermé 420mm',
      motherboard: 'ProArt X870E-Creator WiFi 10GbE LAN',
      powerSupply: '1200W Titanium 80+ Certifié',
    },
    benchmarks: {
      gamingScore4k: 99,
      fpsCyberpunk4k: 110,
      fpsWarzone4k: 240,
      productivityScore: 100,
    },
    condition: 'reconditionne',
    inStock: true,
    stockCount: 4,
    featured: true,
  },
  {
    name: 'KINESIS 16 ULTRA PORTABLE',
    slug: 'kinesis-16-ultra-portable',
    brand: 'AERO MOBILE',
    tagline: 'Châssis unibody magnésium 1.8kg, écran 3.2K 240Hz OLED.',
    description: 'La puissance d\'un PC de bureau dans un profil ultra-fin de 17.9mm. Dalle OLED calibrée Delta-E inférieur à 1.0, batterie 99.9Wh et chargeur GaN 240W ultra-compact.',
    price: 2499,
    compareAtPrice: 2799,
    badge: 'Promo',
    rating: 4.8,
    reviewCount: 86,
    categorySlug: 'ordinateurs',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      cpu: 'Intel Core Ultra 9 185H (16 cœurs avec NPU Dédié IA)',
      gpu: 'NVIDIA GeForce RTX 4080 Mobile 12 Go TGP 175W',
      ram: '32 Go LPDDR5X 7467MHz',
      storage: '1 To SSD NVMe PCIe 4.0 M.2',
      screen: '16" 3.2K (3200x2000) OLED 240Hz 0.2ms 100% DCI-P3',
      weight: '1.85 kg',
    },
    benchmarks: {
      gamingScore4k: 86,
      fpsCyberpunk4k: 68,
      fpsWarzone4k: 165,
      productivityScore: 91,
    },
    condition: 'reconditionne',
    inStock: true,
    stockCount: 8,
    featured: true,
  },
  {
    name: 'STRATA CRÉATEUR PRO RTX 5070 Ti',
    slug: 'strata-createur-pro-5070ti',
    brand: 'AERO RIGS',
    tagline: 'L\'équilibre parfait pour créateurs de contenu, streamers et gamers 1440p / 4K.',
    description: 'Châssis double chambre panoramique avec verre sans montant. Équipé du Core Ultra 7 et de la RTX 5070 Ti 16GB, optimisé pour OBS, DaVinci Resolve et les jeux en ultra.',
    price: 2199,
    compareAtPrice: 2399,
    badge: 'Bestseller',
    isBestseller: true,
    rating: 4.8,
    reviewCount: 164,
    categorySlug: 'ordinateurs',
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      cpu: 'AMD Ryzen 7 7800X3D (8 cœurs / 16 threads)',
      gpu: 'NVIDIA GeForce RTX 5070 Ti 16 Go GDDR7',
      ram: '32 Go DDR5 6000MHz RGB',
      storage: '2 To SSD NVMe PCIe 4.0',
      cooling: 'Watercooling AIO 240mm Miroir Infini Blanc',
      motherboard: 'B650 Gaming WiFi Plus',
      powerSupply: '750W 80+ Gold Modulaire',
    },
    benchmarks: {
      gamingScore4k: 88,
      fpsCyberpunk4k: 78,
      fpsWarzone4k: 180,
      productivityScore: 88,
    },
    condition: 'neuf',
    inStock: true,
    stockCount: 9,
    featured: true,
  },
  {
    name: 'NOVA COMPACT MINI-ITX',
    slug: 'nova-compact-mini-itx',
    brand: 'AERO RIGS',
    tagline: 'Puissance desktop dans un volume de 10 litres.',
    description: 'Le PC le plus compact de notre gamme sans compromis sur les performances. Refroidissement custom à double ventilateurs, alimentation SFX 750W et RTX 4070 Super dans un boîtier de 10L.',
    price: 1799,
    compareAtPrice: 1999,
    isNew: true,
    rating: 4.7,
    reviewCount: 53,
    categorySlug: 'ordinateurs',
    images: [
      'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      cpu: 'AMD Ryzen 5 7600X (6 cœurs @ 5.3GHz)',
      gpu: 'NVIDIA GeForce RTX 4070 Super 12 Go GDDR6X',
      ram: '32 Go DDR5 6000MHz',
      storage: '1 To SSD NVMe PCIe 4.0',
      cooling: 'AIO 240mm format slim adapté ITX',
      motherboard: 'ASUS ROG Strix B650E-I Mini-ITX',
      powerSupply: '750W 80+ Gold SFX',
    },
    benchmarks: {
      gamingScore4k: 82,
      fpsCyberpunk4k: 65,
      fpsWarzone4k: 158,
      productivityScore: 80,
    },
    condition: 'reconditionne',
    inStock: true,
    stockCount: 15,
    featured: false,
  },
  {
    name: 'ECLIPSE OFFICE PRO',
    slug: 'eclipse-office-pro',
    brand: 'AERO LABS',
    tagline: 'Productivité silencieuse, fiabilité entreprise, design épuré.',
    description: 'Tour de bureau professionnelle certifiée entreprise. Processeur Intel Core Ultra 5, 32 Go de RAM ECC, SSD 512 Go et triple sortie vidéo. Parfaite pour les usages bureautiques intensifs.',
    price: 1099,
    compareAtPrice: 1249,
    badge: 'Bestseller',
    isBestseller: true,
    rating: 4.6,
    reviewCount: 204,
    categorySlug: 'ordinateurs',
    images: [
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      cpu: 'Intel Core Ultra 5 245K (14 cœurs @ 5.2GHz)',
      gpu: 'Intel Arc A770 16 Go (Rendu Vidéo Accéléré)',
      ram: '32 Go DDR5 ECC 4800MHz',
      storage: '512 Go SSD NVMe PCIe 4.0',
      cooling: 'Ventirad Noctua NH-D15G2 Ultra-Silencieux',
      motherboard: 'MSI PRO Z890-A WiFi 6E',
      powerSupply: '650W 80+ Gold Modulaire',
    },
    condition: 'reconditionne',
    inStock: true,
    stockCount: 22,
    featured: false,
  },

  // CLAVIERS
  {
    name: 'PULSE 75% MAGNÉTIQUE HALL EFFECT',
    slug: 'pulse-clavier-magnetique-hall-effect',
    brand: 'AERO TACTILE',
    tagline: 'Interrupteurs magnétiques Rapid Trigger 0.1mm ajustables.',
    description: 'Clavier mécanique sans fil 2.4GHz / Bluetooth 5.2 / Filaire. Châssis en aluminium anodisé bloc massif, insonorisation 5 couches de silicone Poron et touches PBT double-shot.',
    price: 189,
    compareAtPrice: 219,
    badge: 'Promo',
    rating: 4.9,
    reviewCount: 310,
    categorySlug: 'claviers',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      switch: 'Magnétique Hall Effect Rapid Trigger 0.1mm',
      connectivity: 'USB-C / 2.4GHz sans fil / Bluetooth 5.2',
      weight: '1.2 kg Châssis usiné CNC aluminium',
    },
    condition: 'neuf',
    inStock: true,
    stockCount: 28,
    featured: true,
    isBestseller: true,
  },
  {
    name: 'NEXUS TKL ROUGE LINÉAIRE',
    slug: 'nexus-tkl-rouge-lineaire',
    brand: 'AERO TACTILE',
    tagline: 'Format TKL compact, switches linéaires pré-lubrifiés usine.',
    description: 'Tenkeyless idéal pour les joueurs compétitifs. Switches linéaires silencieux pré-lubrifiés, stabilisateurs soudés à 45 degrés et rétro-éclairage RGB 16,8M couleurs.',
    price: 129,
    compareAtPrice: 149,
    isNew: true,
    rating: 4.7,
    reviewCount: 187,
    categorySlug: 'claviers',
    images: [
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      switch: 'AERO Linear Rouge (45g actuation, 2.0mm point)',
      connectivity: 'USB-C filaire 6000Hz anti-ghosting',
      weight: '980g aluminium brossé',
    },
    inStock: true,
    stockCount: 42,
    featured: true,
  },
  {
    name: 'SIGMA 60% ULTRA-COMPACT',
    slug: 'sigma-60-ultra-compact',
    brand: 'AERO TACTILE',
    tagline: 'Format 60%, gasket mount flottant, frappe aérienne premium.',
    description: 'Pour les minimalistes exigeants. Montage sur gasket qui absorbe les vibrations de frappe, keycaps PBT dyesub épaisse 1.5mm et compatibilité Via/Vial pour reprogrammation totale.',
    price: 99,
    compareAtPrice: 119,
    badge: 'Bestseller',
    isBestseller: true,
    rating: 4.8,
    reviewCount: 256,
    categorySlug: 'claviers',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      switch: 'AERO Tactile Brown (55g actuation, bump à 1.5mm)',
      connectivity: 'USB-C filaire détachable + Bluetooth 5.3',
      weight: '760g aluminium anodisé',
    },
    inStock: true,
    stockCount: 35,
    featured: false,
  },
  {
    name: 'ARC WIRELESS SILENCIEUX',
    slug: 'arc-wireless-silencieux',
    brand: 'AERO TACTILE',
    tagline: 'Clavier bureau silencieux sans fil, frappe coton sous 40dB.',
    description: 'Clavier professionnel ultra-silencieux avec switches linéaires insonorisés à 38dB. Batterie 6000mAh pour 6 mois autonomie, connexion USB-C / 2.4GHz / Bluetooth multi-appareils.',
    price: 79,
    compareAtPrice: 99,
    badge: 'Promo',
    rating: 4.5,
    reviewCount: 328,
    categorySlug: 'claviers',
    images: [
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      switch: 'Silent Linear Brown 38dB (sur mesure)',
      connectivity: 'USB-C / 2.4GHz / Bluetooth 5.3 (3 appareils)',
      battery: '6000mAh - 6 mois autonomie sans rétro-éclairage',
      weight: '620g châssis plastique ABS premium',
    },
    inStock: true,
    stockCount: 60,
    featured: false,
  },

  // SOURIS
  {
    name: 'VIPER ULTRA LIGHT 48G',
    slug: 'viper-ultra-light-48g',
    brand: 'AERO TACTILE',
    tagline: 'Coque honeycomb 48g, capteur PixArt 3950 36K DPI.',
    description: 'Souris gaming ultra-légère conçue pour les pros de l\'esport. Structure en nid d\'abeille en polymère renforcé, capteur optique PixArt 3950 sans accélération, pieds PTFE 100% purs.',
    price: 79,
    compareAtPrice: 99,
    badge: 'Bestseller',
    isBestseller: true,
    rating: 4.9,
    reviewCount: 892,
    categorySlug: 'souris',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      sensor: 'PixArt PAW3950 (36 000 DPI max, 1ms latence)',
      dpi: '100 - 36 000 DPI (par pas de 50)',
      weight: '48g hors câble',
      connectivity: 'USB-C filaire + dongle 2.4GHz optionnel',
    },
    inStock: true,
    stockCount: 74,
    featured: true,
  },
  {
    name: 'PHANTOM ERGO PRO',
    slug: 'phantom-ergo-pro',
    brand: 'AERO TACTILE',
    tagline: 'Forme ergonomique pronation neutre, préhension palm et claw.',
    description: 'Souris ergonomique droitier conçue pour les sessions longues. Forme sculpted haute soutenant toute la paume, capteur PixArt 3395 et 7 boutons programmables avec mémoire interne 3 profils.',
    price: 69,
    compareAtPrice: 89,
    badge: 'Bestseller',
    isBestseller: true,
    rating: 4.8,
    reviewCount: 541,
    categorySlug: 'souris',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      sensor: 'PixArt PAW3395 (26 000 DPI, IPS 750)',
      dpi: '400 - 26 000 DPI',
      weight: '88g forme ergonomique',
      connectivity: 'USB-C filaire 8000Hz + Bluetooth 5.3',
    },
    inStock: true,
    stockCount: 48,
    featured: true,
  },
  {
    name: 'STEALTH SANS FIL 2.4GHz',
    slug: 'stealth-sans-fil-2-4ghz',
    brand: 'AERO TACTILE',
    tagline: 'Autonomie 70h, charge rapide 5 min = 3h de jeu.',
    description: 'Zéro latence perçue en 2.4GHz grâce au dongle USB AERO HyperLink. Capteur PixArt 3370, coque ABS texturée anti-sueur et base de charge magnétique USB-C incluse.',
    price: 89,
    compareAtPrice: 109,
    isNew: true,
    rating: 4.7,
    reviewCount: 213,
    categorySlug: 'souris',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      sensor: 'PixArt PAW3370 (18 000 DPI)',
      dpi: '200 - 18 000 DPI',
      battery: '70h en 2.4GHz - charge 5min = 3h',
      connectivity: 'Dongle 2.4GHz HyperLink + USB-C',
      weight: '72g',
    },
    inStock: true,
    stockCount: 31,
    featured: false,
  },

  // IMPRIMANTES
  {
    name: 'LUMIX PRO COULEUR LASER',
    slug: 'lumix-pro-couleur-laser',
    brand: 'AERO PRINT',
    tagline: 'Laser couleur recto/verso auto, 30 ppm réseau WiFi 6.',
    description: 'Imprimante laser couleur professionnelle haute vélocité avec scanner intégré 1200 dpi. Impression recto-verso automatique, bac de 500 feuilles et gestion de flotte via panel web.',
    price: 449,
    compareAtPrice: 549,
    badge: 'Bestseller',
    isBestseller: true,
    rating: 4.7,
    reviewCount: 187,
    categorySlug: 'imprimantes',
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      resolution: '1200 x 1200 dpi Couleur et Noir',
      printSpeed: '30 ppm Noir / 24 ppm Couleur recto-verso',
      connectivity: 'WiFi 6 / Ethernet Gigabit / USB 3.0',
      weight: '18.4 kg',
    },
    inStock: true,
    stockCount: 17,
    featured: true,
  },
  {
    name: 'AQUA PHOTO A3+ JET D\'ENCRE',
    slug: 'aqua-photo-a3-inkjet',
    brand: 'AERO PRINT',
    tagline: 'Reproduction photo A3+ 12 couleurs, gamut 98% AdobeRGB.',
    description: 'Imprimante photo grand format 12 couleurs pigmentaires. Technologie MicroPiezo pour des points de 1.5 picolitres, impression sans bordure A3+ et support papier épais jusqu\'à 300g/m2.',
    price: 699,
    compareAtPrice: 849,
    rating: 4.9,
    reviewCount: 64,
    categorySlug: 'imprimantes',
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      resolution: '5760 x 1440 dpi (MicroPiezo 12 couleurs)',
      printSpeed: '4.5 min pour A3+ photo sans bordure',
      connectivity: 'WiFi / Ethernet / USB-C / Slot SD Card',
      weight: '14.2 kg',
    },
    inStock: true,
    stockCount: 8,
    featured: false,
  },
  {
    name: 'RAPID MONO COMPACT',
    slug: 'rapid-mono-compact',
    brand: 'AERO PRINT',
    tagline: 'Laser monochrome ultra-compact 40 ppm, toner longue durée.',
    description: 'Imprimante laser monochrome de bureau ultra-rapide idéale PME et télétravail. Toner haute capacité 8000 pages, démarrage rapide 8 secondes et bac 350 feuilles.',
    price: 219,
    compareAtPrice: 269,
    badge: 'Promo',
    rating: 4.6,
    reviewCount: 412,
    categorySlug: 'imprimantes',
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      resolution: '1200 x 1200 dpi Noir et Blanc',
      printSpeed: '40 ppm recto, 32 ppm recto-verso',
      connectivity: 'WiFi 5 / USB 2.0 / AirPrint',
      weight: '7.8 kg',
    },
    inStock: true,
    stockCount: 29,
    featured: false,
  },

  // PROJECTEURS
  {
    name: 'LUMINUS 4K LASER 3000 ANSI',
    slug: 'luminus-4k-laser-3000-ansi',
    brand: 'AERO VISION',
    tagline: 'Laser Tri-Color 4K natif, 3000 ANSI Lumen, 25 000h de durée de vie.',
    description: 'Vidéoprojecteur laser 4K professionnel avec technologie Tri-Color RGB pour une couverture de 100% DCI-P3. Motorisation électrique sur 4 axes et intégration HDR10+ / HLG.',
    price: 2999,
    compareAtPrice: 3499,
    rating: 4.9,
    reviewCount: 38,
    categorySlug: 'projecteurs',
    images: [
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      resolution: '4K UHD 3840x2160 Natif (Triple Laser RGB)',
      brightness: '3000 ANSI Lumens - HDR Peak 6000 Lumens',
      throwRatio: '1.39~2.09:1 (zoom motorisé x1.5)',
      connectivity: '2x HDMI 2.1 / USB-A / LAN / WiFi 6 / ARC',
      weight: '12.5 kg',
    },
    inStock: true,
    stockCount: 5,
    featured: true,
  },
  {
    name: 'POCKET BEAM ULTRA PORTABLE',
    slug: 'pocket-beam-ultra-portable',
    brand: 'AERO VISION',
    tagline: 'Tient dans la poche, projette jusqu\'à 120 pouces, batterie 3h.',
    description: 'Micro-projecteur portable DLP 1080p avec batterie interne 3h. Android 11 intégré, compatibilité Netflix / Disney+ offline, haut-parleurs stéréo 10W et charge rapide USB-C PD 65W.',
    price: 399,
    compareAtPrice: 499,
    isNew: true,
    rating: 4.5,
    reviewCount: 124,
    categorySlug: 'projecteurs',
    images: [
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      resolution: '1920x1080p Full HD DLP',
      brightness: '700 ANSI Lumens LED',
      throwRatio: '1.2:1 (image 40 à 120 pouces)',
      battery: '3h autonomie - charge USB-C PD 65W',
      connectivity: 'WiFi 5 / Bluetooth 5.0 / USB-C / HDMI mini',
      weight: '0.45 kg',
    },
    inStock: true,
    stockCount: 21,
    featured: false,
  },
  {
    name: 'PRISM ULTRA COURTE FOCALE 4K',
    slug: 'prism-ultra-courte-focale-4k',
    brand: 'AERO VISION',
    tagline: 'Posé à 15 cm du mur, image 100 pouces, 2500 lm laser.',
    description: 'Projecteur ultra-courte focale 4K DLP à source laser. Parfait pour les salons modernes sans câblage complexe. Rapport de projection 0.23:1 et compatibilité Dolby Atmos.',
    price: 1799,
    compareAtPrice: 2199,
    badge: 'Bestseller',
    isBestseller: true,
    rating: 4.8,
    reviewCount: 91,
    categorySlug: 'projecteurs',
    images: [
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      resolution: '4K UHD 3840x2160 DLP Laser',
      brightness: '2500 ANSI Lumens (HDR)',
      throwRatio: '0.23:1 (15cm = 100 pouces)',
      connectivity: '3x HDMI 2.0 / USB-A / LAN / Android TV',
      weight: '5.9 kg',
    },
    inStock: true,
    stockCount: 11,
    featured: true,
  },

  // ACCESSOIRES
  {
    name: 'SPECTRE 34" QD-OLED 240Hz',
    slug: 'spectre-34-incurve-qd-oled',
    brand: 'AERO VISION',
    tagline: 'Courbure 1800R, noirs absolus, réactivité 0.03ms GTG.',
    description: 'Moniteur Ultrawide 34 pouces QD-OLED de 3ème génération. Revêtement anti-reflet mat avancé, certification VESA DisplayHDR True Black 400 et port USB-C 90W PD.',
    price: 999,
    compareAtPrice: 1199,
    badge: 'Bestseller',
    isBestseller: true,
    rating: 4.9,
    reviewCount: 215,
    categorySlug: 'accessoires',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      screen: '34" QD-OLED 3440 x 1440 (21:9) 240Hz 0.03ms',
      ports: ['2x DisplayPort 1.4', '1x HDMI 2.1', '1x USB-C 90W PD', 'Hub 4x USB 3.2'],
      weight: '6.7 kg avec pied aluminium',
    },
    inStock: true,
    stockCount: 14,
    featured: true,
  },
  {
    name: 'NVIDIA GEFORCE RTX 5080',
    slug: 'nvidia-geforce-rtx-5080',
    brand: 'NVIDIA',
    tagline: 'Architecture Blackwell, mémoire GDDR7 ultra-rapide 28Gbps.',
    description: 'La référence incontournable de la nouvelle génération. 10 752 cœurs CUDA, 16 Go de mémoire GDDR7 à 256-bit, DLSS 4 et Ray Tracing de 4e génération.',
    price: 1199,
    compareAtPrice: 1299,
    isNew: true,
    rating: 4.9,
    reviewCount: 77,
    categorySlug: 'accessoires',
    images: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      gpu: 'RTX 5080 16 Go GDDR7 (10 752 Cœurs CUDA)',
      powerSupply: 'Alimentation recommandée 850W PCIe 5.0 12V-2x6',
    },
    benchmarks: {
      gamingScore4k: 95,
      fpsCyberpunk4k: 92,
      fpsWarzone4k: 210,
    },
    inStock: true,
    stockCount: 5,
    featured: true,
  },
  {
    name: 'ATLAS XXL TAPIS DE BUREAU',
    slug: 'atlas-xxl-tapis-bureau',
    brand: 'AERO TACTILE',
    tagline: 'Tapis bureau XL 900x400mm, surface micro-texturée vitesse.',
    description: 'Surface de contrôle laminée micro-texturée optimisée pour les capteurs haute DPI. Base en caoutchouc naturel 5mm anti-dérapage, bords cousus sur 3 rangées.',
    price: 49,
    compareAtPrice: 69,
    badge: 'Bestseller',
    isBestseller: true,
    rating: 4.7,
    reviewCount: 1204,
    categorySlug: 'accessoires',
    images: [
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      weight: '680g (900x400x5mm)',
    },
    inStock: true,
    stockCount: 95,
    featured: false,
  },
  {
    name: 'HUB USB-C PRO 12-EN-1',
    slug: 'hub-usbc-pro-12-en-1',
    brand: 'AERO LABS',
    tagline: '12 ports en un - 4K HDMI, Ethernet 2.5G, charge 100W PD.',
    description: 'Hub USB-C aluminium haute densité avec dissipateur thermique intégré. Compatible Thunderbolt 4 et USB4, sortie vidéo 4K@60Hz, Ethernet 2.5GbE et lecteur de cartes SD/MicroSD UHS-II.',
    price: 89,
    compareAtPrice: 119,
    isNew: true,
    rating: 4.6,
    reviewCount: 318,
    categorySlug: 'accessoires',
    images: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=85',
    ],
    specifications: {
      ports: ['1x HDMI 2.0 (4K@60Hz)', '2x USB-A 3.2 Gen2', '2x USB-C dont PD 100W', 'Ethernet 2.5GbE', 'SD + MicroSD UHS-II'],
      connectivity: 'USB-C Thunderbolt 4 / USB4 40Gbps',
      weight: '128g aluminium',
    },
    inStock: true,
    stockCount: 57,
    featured: false,
  },
];

// ── Default Users Data ────────────────────────────────────────────────────────
const USERS_DATA = [
  {
    name: 'Admin Jessat',
    email: 'admin@jessat.com',
    password: 'AdminPassword123!',
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
  },
  {
    name: 'Super Admin',
    email: 'superadmin@jessat.com',
    password: 'SuperAdmin123!',
    role: UserRole.SUPER_ADMIN,
    status: UserStatus.ACTIVE,
  },
  {
    name: 'Client Démo',
    email: 'client@jessat.com',
    password: 'ClientPassword123!',
    role: UserRole.USER,
    status: UserStatus.ACTIVE,
  },
];

// ── Main Seed Execution ───────────────────────────────────────────────────────
async function seed() {
  console.log('🚀 Initialisation de la connexion à la base de données PostgreSQL...');
  await AppDataSource.initialize();
  console.log('✅ Connexion établie avec succès !');

  const categoryRepo = AppDataSource.getRepository(Category);
  const productRepo = AppDataSource.getRepository(Product);
  const configRepo = AppDataSource.getRepository(ConfigOption);
  const userRepo = AppDataSource.getRepository(User);

  // 1. Seed Categories
  console.log('\n📂 [1/4] Seeding des catégories...');
  const categoryMap: Record<string, Category> = {};
  for (const catData of CATEGORIES_DATA) {
    let cat = await categoryRepo.findOne({ where: { slug: catData.slug } });
    if (!cat) {
      cat = categoryRepo.create(catData);
      cat = await categoryRepo.save(cat);
      console.log(`  ✓ Créé : ${cat.name} (${cat.slug})`);
    } else {
      console.log(`  ↩ Existant : ${cat.name}`);
    }
    categoryMap[cat.slug] = cat;
  }

  // 2. Seed Configurator Options
  console.log('\n⚙️ [2/4] Seeding des options du configurateur...');
  let configCount = 0;
  for (const optData of CONFIGURATOR_DATA) {
    const existing = await configRepo.findOne({
      where: { name: optData.name, category: optData.category },
    });
    if (!existing) {
      const opt = configRepo.create(optData);
      await configRepo.save(opt);
      configCount++;
      console.log(`  ✓ [${optData.category.toUpperCase()}] ${optData.name}`);
    }
  }
  console.log(`  📊 ${configCount} nouvelle(s) option(s) configurateur insérée(s).`);

  // 3. Seed Products
  console.log('\n📦 [3/4] Seeding des produits du catalogue...');
  let prodCount = 0;
  for (const prodData of PRODUCTS_DATA) {
    const existing = await productRepo.findOne({ where: { slug: prodData.slug } });
    if (!existing) {
      const { categorySlug, ...rest } = prodData;
      const category = categoryMap[categorySlug];
      if (!category) {
        console.warn(`  ⚠️ Catégorie introuvable pour slug : ${categorySlug}`);
        continue;
      }
      const product = productRepo.create({
        ...rest,
        category,
        categoryId: category.id,
      });
      await productRepo.save(product);
      prodCount++;
      console.log(`  ✓ Produit : ${prodData.name} -> Cat: [${category.name}]`);
    } else {
      console.log(`  ↩ Existant : ${prodData.name}`);
    }
  }
  console.log(`  📊 ${prodCount} nouveau(x) produit(s) inséré(s).`);

  // 4. Seed Users
  console.log('\n👤 [4/4] Seeding des utilisateurs initiaux...');
  for (const userData of USERS_DATA) {
    const existing = await userRepo.findOne({ where: { email: userData.email } });
    if (!existing) {
      const passwordHash = await bcrypt.hash(userData.password, 10);
      const user = userRepo.create({
        name: userData.name,
        email: userData.email,
        passwordHash,
        role: userData.role,
        status: userData.status,
      });
      await userRepo.save(user);
      console.log(`  ✓ Utilisateur [${userData.role}] : ${userData.email} (MDP: ${userData.password})`);
    } else {
      console.log(`  ↩ Existant : ${userData.email}`);
    }
  }

  console.log('\n🎉 ============================================================');
  console.log('🎉 Seeding terminé avec SUCCÈS !');
  console.log('🎉 Votre base de données PostgreSQL est prête et initialisée.');
  console.log('🎉 ============================================================\n');

  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('\n❌ Erreur fatale lors du seeding :', err);
  process.exit(1);
});
