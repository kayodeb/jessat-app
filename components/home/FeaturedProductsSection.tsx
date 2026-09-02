'use client'

import React, { useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { PRODUCTS } from '@/data/products'
import { Product, ProductCategory } from '@/types/product'
import { ProductCard } from '@/components/product/ProductCard'
import { Reveal } from '@/components/animations/Reveal'
import { cn } from '@/lib/utils'

interface FeaturedProductsSectionProps {
  onQuickView: (product: Product) => void
  selectedCategorySlug?: string | null
}

export function FeaturedProductsSection({
  onQuickView,
  selectedCategorySlug,
}: FeaturedProductsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(selectedCategorySlug || 'all')

  const tabs = [
    { id: 'all', label: 'Tous les Produits' },
    { id: 'ordinateurs', label: 'Ordinateurs' },
    { id: 'claviers', label: 'Claviers' },
    { id: 'souris', label: 'Souris' },
    { id: 'imprimantes', label: 'Imprimantes' },
    { id: 'projecteurs', label: 'Projecteurs' },
    { id: 'accessoires', label: 'Accessoires' },
  ]

  const filteredProducts =
    activeTab === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === (activeTab as ProductCategory))

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-blue-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dernières Nouveautés • Gamme 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-950">
              Configurations Haute Précision
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all',
                  activeTab === tab.id
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70 hover:text-zinc-900'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid with Reveal Stagger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <Reveal key={product.id} delay={idx * 60}>
              <ProductCard product={product} onQuickView={onQuickView} />
            </Reveal>
          ))}
        </div>

        {/* Bottom Banner note */}
        <div className="mt-12 p-6 rounded-3xl bg-zinc-50 border border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-sm font-bold text-zinc-950 block">
              Besoin d'un composant ou d'un dimensionnement spécifique ?
            </span>
            <span className="text-xs text-zinc-500">
              Nos architectes matériel assemblent votre machine selon vos jeux ou logiciels métier.
            </span>
          </div>
          <a
            href="#configurator"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 group flex-shrink-0"
          >
            <span>Lancer l'outil de configuration sur-mesure</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
