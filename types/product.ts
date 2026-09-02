export interface ProductSpecification {
  cpu?: string
  gpu?: string
  ram?: string
  storage?: string
  cooling?: string
  motherboard?: string
  powerSupply?: string
  screen?: string
  weight?: string
  ports?: string[]
  connectivity?: string
  sensor?: string
  dpi?: string
  switch?: string
  printSpeed?: string
  resolution?: string
  brightness?: string
  throwRatio?: string
  battery?: string
}

export interface ProductBenchmark {
  gamingScore4k?: number
  fpsCyberpunk4k?: number
  fpsWarzone4k?: number
  productivityScore?: number
}

export type ProductCategory =
  | 'ordinateurs'
  | 'claviers'
  | 'souris'
  | 'imprimantes'
  | 'projecteurs'
  | 'accessoires'

export interface Product {
  id: string
  name: string
  slug: string
  brand: string
  tagline: string
  description: string
  price: number
  compareAtPrice?: number
  badge?: 'Nouveau' | 'Bestseller' | 'N°1 des Ventes' | 'Meilleure Vente' | 'Promo -15%' | 'Promo -20%' | 'Édition Limitée' | 'Édition Spéciale'
  isNew?: boolean
  isBestseller?: boolean
  rating: number
  reviewCount: number
  category: ProductCategory
  images: string[]
  specifications: ProductSpecification
  benchmarks?: ProductBenchmark
  inStock: boolean
  stockCount: number
  featured?: boolean
  colorVariants?: { name: string; hex: string }[]
}
