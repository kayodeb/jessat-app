'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Star, ShoppingBag, Check, ArrowRight, Zap, Cpu } from 'lucide-react'
import { PRODUCTS } from '@/data/products'
import { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/lib/context/cart-context'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/animations/Reveal'

interface BestSellersSectionProps {
  onQuickView: (product: Product) => void
}

export function BestSellersSection({ onQuickView }: BestSellersSectionProps) {
  const { addToCart } = useCart()
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({})

  // Pick bestsellers from products
  const bestSellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 3)

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product)
    setAddedMap((prev) => ({ ...prev, [product.id]: true }))
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }))
    }, 2000)
  }

  return (
    <section id="bestsellers" className="py-20 bg-zinc-50/70 border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching reference */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-amber-600 mb-1">
              Les Meilleurs ventes
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-950">
              Les produits les plus achetés par nos clients
            </h2>
          </div>

          <a
            href="#products"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 hover:text-blue-600 transition-colors group"
          >
            <span>Voir Tous les Best-Sellers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 3 Horizontal Cards matching the reference image layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {bestSellers.map((product, idx) => {
            const isAdded = addedMap[product.id]
            return (
              <Reveal key={product.id} delay={idx * 100}>
                <div
                  onClick={() => onQuickView(product)}
                  className="bg-white rounded-3xl p-5 border border-zinc-200/80 hover:border-zinc-300 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group h-full"
                >
                  <div className="flex items-start gap-4">
                    {/* Square Image Container */}
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-zinc-100 overflow-hidden flex-shrink-0 border border-zinc-150">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="128px"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant="bestseller" className="text-[10px] px-2 py-0.5">
                          Bestseller
                        </Badge>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className="text-sm sm:text-base font-bold text-zinc-950 truncate group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-zinc-900">{product.rating}</span>
                        <span className="text-zinc-400 text-[11px]">({product.reviewCount})</span>
                      </div>

                      <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                        {product.tagline}
                      </p>

                      <div className="pt-2 flex items-baseline gap-2">
                        <span className="text-base font-extrabold text-zinc-950">
                          {formatPrice(product.price)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-xs text-zinc-400 line-through">
                            {formatPrice(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Specs Pill List */}
                  <div className="grid grid-cols-2 gap-2 my-4 pt-4 border-t border-zinc-100 text-xs">
                    <div className="flex items-center gap-1.5 text-zinc-600 bg-zinc-50 p-2 rounded-xl">
                      <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="truncate">{product.specifications.cpu?.split('(')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-blue-700 bg-blue-50/70 p-2 rounded-xl font-medium">
                      <Zap className="w-3.5 h-3.5 text-blue-500" />
                      <span className="truncate">{product.specifications.gpu?.replace('NVIDIA GeForce ', '')}</span>
                    </div>
                  </div>

                  {/* Quick Action Buttons matching reference */}
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={(e) => handleQuickAdd(product, e)}
                      variant={isAdded ? 'secondary' : 'primary'}
                      size="sm"
                      className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Ajouté</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Ajout Rapide</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
