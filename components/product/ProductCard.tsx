'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Check } from 'lucide-react'
import { Product } from '@/types/product'
import { formatPrice, cn } from '@/lib/utils'
import { useCart } from '@/lib/context/cart-context'
import { useWishlist } from '@/lib/context/wishlist-context'
import { useMouseTilt } from '@/hooks/useMouseParallax'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Badge } from '@/components/ui/Badge'

interface ProductCardProps {
  product: Product
  onQuickView?: (product: Product) => void
}

export function ProductCard({ product }: ProductCardProps) {
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

  return (
    <div
      ref={tiltRef}
      className="group relative bg-white rounded-3xl p-4 border border-zinc-200/80 hover:border-zinc-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
      style={{ willChange: 'transform' }}
    >
      {/* Image */}
      <div className="relative w-full aspect-square rounded-2xl bg-zinc-50 overflow-hidden mb-4 border border-zinc-100">
        {/* Hover glow */}
        <div className="absolute inset-0 bg-radial from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <Link href={`/produits/${product.slug}`} className="absolute inset-0 block z-0">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Badge */}
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

        {/* Wishlist */}
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
      </div>

      {/* Name + Price + Cart */}
      <div className="flex items-center justify-between gap-2 mt-auto">
        <Link href={`/produits/${product.slug}`} className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-zinc-950 group-hover:text-blue-600 transition-colors truncate">
            {product.name}
          </h3>
          <span className="text-sm font-extrabold text-zinc-950 mt-0.5 block">
            {formatPrice(product.price)}
          </span>
        </Link>

        <button
          onClick={handleAddToCart}
          className={cn(
            'shrink-0 p-2.5 rounded-xl transition-all flex items-center shadow-sm active:scale-95',
            isAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-zinc-950 text-white hover:bg-zinc-800'
          )}
          aria-label="Ajouter au panier"
        >
          {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}
