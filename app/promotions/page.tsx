'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, ChevronRight, Percent, Tag, ArrowRight, Filter, Flame } from 'lucide-react'
import { PRODUCTS } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductQuickView } from '@/components/product/ProductQuickView'
import { Product } from '@/types/product'
import { cn } from '@/lib/utils'

export default function PromotionsPage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedCondition, setSelectedCondition] = useState<string>('all')

  // Get all products that have a promotion (compareAtPrice > price OR badge === 'Promo')
  const promoProducts = PRODUCTS.filter((p) => {
    const hasDiscount = (p.compareAtPrice && p.compareAtPrice > p.price) || p.badge === 'Promo'
    if (!hasDiscount) return false

    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false
    if (selectedCondition !== 'all' && p.condition !== selectedCondition) return false

    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
        <Link href="/" className="hover:text-zinc-950 transition-colors">
          Accueil
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-zinc-950 font-semibold">Promotions &amp; Offres Spéciales</span>
      </nav>

      {/* Hero Banner for Promotions with purple background & overflowing laptop image */}
      <div className="relative rounded-3xl bg-gradient-to-r from-purple-950 via-indigo-900 to-slate-950 border border-purple-800/40 text-white p-6 sm:p-10 mb-12 shadow-2xl overflow-hidden md:overflow-visible">
        {/* Subtle background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-radial from-purple-500/20 via-transparent to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 relative z-10">
          {/* Left Content */}
          <div className="md:col-span-7 space-y-4">
            {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold shadow-sm">
                <Flame className="w-4 h-4 text-purple-400 animate-pulse" />
                <span>OFFRES SPÉCIALES &amp; PROMOTIONS</span>
              </div> */}

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Nos Meilleures Promotions Informatiques
            </h1>

            <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed max-w-xl">
              Profitez des meilleures réductions sur nos ordinateurs portables, PC de bureau, accessoires et imprimantes. Matériels venant et non-venant testés et garantis.
            </p>
          </div>

          {/* Right Image overflowing out of the card */}
          <div className="md:col-span-5 relative h-56 sm:h-72 md:h-80 w-full flex items-center justify-center">
            <div className="relative w-full h-full md:-mr-6 md:-my-10 md:scale-110 transform transition-transform duration-500 hover:scale-115">
              <Image
                src="/images/promo-laptos.png"
                alt="Promotions Ordinateurs Jessat"
                fill
                className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters bar */}
      <div className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-zinc-700 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            Catégorie :
          </span>

          {[
            { id: 'all', label: 'Toutes les promos' },
            { id: 'ordinateurs', label: 'Ordinateurs' },
            { id: 'claviers', label: 'Claviers' },
            { id: 'souris', label: 'Souris' },
            { id: 'imprimantes', label: 'Imprimantes' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-semibold transition-all',
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Condition Filter (Tous, Neuf, Venant) */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-700">État :</span>
          {[
            { id: 'all', label: 'Tous' },
            { id: 'neuf', label: 'Non Venant' },
            { id: 'venu', label: 'Venu' },
          ].map((cond) => (
            <button
              key={cond.id}
              onClick={() => setSelectedCondition(cond.id)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs font-bold transition-all',
                selectedCondition === cond.id
                  ? cond.id === 'neuf'
                    ? 'bg-emerald-600 text-white'
                    : cond.id === 'venu'
                      ? 'bg-amber-600 text-white'
                      : 'bg-zinc-900 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              )}
            >
              {cond.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {promoProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {promoProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 border border-zinc-200 text-center max-w-md mx-auto my-8">
          <Tag className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-zinc-900 mb-1">Aucune promotion dans cette sélection</h3>
          <p className="text-xs text-zinc-500 mb-4">
            Essayez de changer les filtres pour voir d'autres articles en promotion.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all')
              setSelectedCondition('all')
            }}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Réinitialiser tous les filtres
          </button>
        </div>
      )}
      <ProductQuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  )
}
