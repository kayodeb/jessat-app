# Jessat Backend

Backend NestJS de l'application e-commerce Jessat.

## Stack
- **NestJS** — framework Node.js
- **PostgreSQL** — base de données (TypeORM)
- **Cloudinary** — gestion des images
- **Stripe** — paiements
- **JWT** — authentification

## Installation

```bash
npm install
```

## Configuration

Copie `.env.example` vers `.env` et remplis les variables :
```bash
cp .env.example .env
```

## Base de données

Crée la base PostgreSQL :
```sql
CREATE DATABASE jessat_db;
```

Les tables sont créées automatiquement au démarrage (`synchronize: true` en développement).

## Lancement

```bash
# Développement
npm run start:dev

# Production
npm run build
npm run start:prod
```

## Documentation Swagger

Disponible sur : http://localhost:3001/api/docs

## Modules et Routes

| Module | Préfixe |
|--------|---------|
| Auth | `/api/auth` |
| Users | `/api/users` |
| Products | `/api/products` |
| Categories | `/api/categories` |
| Configurator | `/api/configurator` |
| Cart | `/api/cart` |
| Orders | `/api/orders` |
| Payments | `/api/payments` |
| Promotions | `/api/promotions` |
| Wishlist | `/api/wishlist` |
| Reviews | `/api/reviews` |
| Stock | `/api/stock` |
| Upload | `/api/upload` |
| Admin | `/api/admin` |
