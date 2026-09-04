'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Check, Star, Cpu, Eye, Zap, ArrowUpRight } from 'lucide-react'
import { Product } from '@/types/product'
import { formatPrice, cn } from '@/lib/utils'
import { useCart } from '@/lib/context/cart-context'
import { useWishlist } from '@/lib/context/wishlist-context'
import { useMouseTilt } from '@/hooks/useMouseParallax'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface ProductCardProps {
  product: Product
  onQuickView?: (product: Product) => void
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [isAdded, setIsAdded] = useState(false)
  const prefersReduced = useReducedMotion()
  const tiltRef = useMouseTilt<HTMLDivElement>({ disabled: prefersReduced })

  const isFavorite = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    addToCart(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    toggleWishlist(product.id)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onQuickView?.(product)
  }

  return (
    <div
      ref={tiltRef}
      className="group relative bg-white rounded-3xl p-4 border border-zinc-200/80 hover:border-zinc-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
      style={{ willChange: 'transform' }}
    >
      {/* Top Media Container */}
      <div className="relative w-full aspect-square rounded-2xl bg-zinc-50 overflow-hidden mb-4 border border-zinc-100 flex items-center justify-center">
        {/* Subtle radial glow on hover */}
        <div className="absolute inset-0 bg-radial from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Clickable Image leading to product page */}
        <Link href={`/produits/${product.slug}`} className="absolute inset-0 block z-0">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (product.badge === 'Bestseller' || product.badge === 'Promo') && (
            <Badge variant={product.badge === 'Bestseller' ? 'bestseller' : 'promo'}>
              {product.badge}
            </Badge>
          )}
          {product.condition === 'venu' && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider shadow-sm text-white bg-amber-600">
              Venu
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={cn(
            'absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all z-10',
            isFavorite
              ? 'bg-rose-50 text-rose-600 border border-rose-200 shadow-sm'
              : 'bg-white/80 text-zinc-600 hover:text-zinc-950 hover:bg-white border border-white/60'
          )}
          aria-label="Ajouter aux favoris"
        >
          <Heart className={cn('w-4 h-4', isFavorite ? 'fill-rose-500' : '')} />
        </button>

        {/* Quick View trigger on hover */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full bg-white/90 backdrop-blur-md hover:bg-white text-xs gap-1.5 shadow-md"
            onClick={handleQuickView}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Aperçu rapide</span>
          </Button>
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-2 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand and Rating */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold uppercase tracking-wider text-zinc-400 text-[10px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-zinc-700">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-bold text-xs">{product.rating}</span>
              <span className="text-zinc-400 text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name linking to dedicated product page */}
          <Link href={`/produits/${product.slug}`} className="block">
            <h3 className="text-sm font-bold text-zinc-950 group-hover:text-blue-600 transition-colors line-clamp-1 flex items-center justify-between">
              <span>{product.name}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
            </h3>
          </Link>

          {/* Tagline */}
          <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Specs Chips */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-zinc-100">
            {product.specifications.cpu && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-zinc-100/90 text-zinc-700 px-2 py-0.5 rounded-lg border border-zinc-200/50">
                <Cpu className="w-3 h-3 text-zinc-400" />
                {product.specifications.cpu.split('(')[0]}
              </span>
            )}
            {product.specifications.gpu && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-blue-50 text-blue-700 font-medium px-2 py-0.5 rounded-lg border border-blue-100">
                <Zap className="w-3 h-3 text-blue-500" />
                {product.specifications.gpu.replace('NVIDIA GeForce ', '')}
              </span>
            )}
            {product.specifications.ram && (
              <span className="text-[11px] bg-zinc-100/90 text-zinc-600 px-2 py-0.5 rounded-lg border border-zinc-200/50">
                {product.specifications.ram.split(' ')[0]} {product.specifications.ram.split(' ')[1]}
              </span>
            )}
            {product.specifications.storage && (
              <span className="text-[11px] bg-zinc-100/90 text-zinc-600 px-2 py-0.5 rounded-lg border border-zinc-200/50">
                {product.specifications.storage.split(' ')[0]} {product.specifications.storage.split(' ')[1]}
              </span>
            )}
          </div>
        </div>

        {/* Pricing and Action */}
        <div className="pt-4 mt-2 border-t border-zinc-100 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
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

          {/* Quick Add to cart button */}
          <button
            onClick={handleAddToCart}
            className={cn(
              'p-2.5 rounded-xl transition-all font-medium text-xs flex items-center gap-1.5 shadow-sm active:scale-95',
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-950 text-white hover:bg-zinc-800'
            )}
            aria-label="Ajouter au panier"
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Ajouté</span>
              </>
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
