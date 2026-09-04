'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react'
import { PRODUCTS } from '@/data/products'
import { Product } from '@/types/product'
import { ProductCard } from '@/components/product/ProductCard'
import { Reveal } from '@/components/animations/Reveal'

interface FeaturedProductsSectionProps {
  onQuickView: (product: Product) => void
  selectedCategorySlug?: string | null
}

export function FeaturedProductsSection({
  onQuickView,
}: FeaturedProductsSectionProps) {
  // Sélection de 8 produits phares pour la page d'accueil
  const featuredProducts = PRODUCTS.slice(0, 8)

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-blue-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sélection du Moment • Jessat Multi Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-950">
            Quelques un de nos produits
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Une sélection de nos meilleurs ordinateurs portables, PC de bureau et accessoires informatiques.
            </p>
          </div>

          {/* Bouton de redirection vers le catalogue */}
          <Link
            href="/produits"
            className="inline-flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm hover:shadow-md hover:gap-3 group flex-shrink-0"
          >
            <span>Voir tout le catalogue</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid with Reveal Stagger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, idx) => (
            <Reveal key={product.id} delay={idx * 50}>
              <ProductCard product={product} onQuickView={onQuickView} />
            </Reveal>
          ))}
        </div>

        {/* Bottom Redirection & Assistance Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <span className="text-base font-bold text-zinc-950 block">
              Vous cherchez une marque ou un modèle spécifique ?
            </span>
            <span className="text-xs sm:text-sm text-zinc-500 max-w-xl block leading-relaxed">
              HP EliteBook, Dell Latitude, Lenovo ThinkPad, Asus, Acer ou accessoires : découvrez toutes nos configurations neuves et d'occasion dans notre catalogue complet.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
            <Link
              href="/produits"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-md hover:shadow-xl hover:gap-3 group"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Consulter l'ensemble du catalogue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
