'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { X, Check, Star, ShoppingBag, ShieldCheck, Truck, Cpu, Zap, HardDrive, Layers } from 'lucide-react'
import { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/lib/context/cart-context'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface ProductQuickViewProps {
  product: Product | null
  onClose: () => void
}

export function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const { addToCart } = useCart()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isAdded, setIsAdded] = useState(false)

  if (!product) return null

  const handleAdd = () => {
    addToCart(product)
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
      onClose()
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-950 transition-colors z-20 border border-zinc-200"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Gallery */}
          <div className="p-6 sm:p-8 bg-zinc-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-100">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white border border-zinc-200/80 mb-4 shadow-sm">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-all duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {product.badge && (product.badge === 'Bestseller' || product.badge === 'Promo') && (
                <div className="absolute top-4 left-4">
                  <Badge variant={product.badge === 'Bestseller' ? 'bestseller' : 'promo'}>
                    {product.badge}
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-zinc-900 ring-2 ring-zinc-900/10 scale-105'
                        : 'border-zinc-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="Angle produit" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Technical specifications and purchase */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span className="font-semibold uppercase tracking-wider">{product.brand}</span>
                <div className="flex items-center gap-1 text-zinc-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-zinc-400">({product.reviewCount} avis certifiés)</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
                {product.name}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
                {product.description || product.tagline}
              </p>

              {/* Hardware specifications list */}
              <div className="mt-5 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Composants Inclus :
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {product.specifications.cpu && (
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-50 border border-zinc-150">
                      <Cpu className="w-4 h-4 text-zinc-500" />
                      <span className="truncate">{product.specifications.cpu}</span>
                    </div>
                  )}
                  {product.specifications.gpu && (
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-blue-50/70 border border-blue-100 text-blue-900 font-medium">
                      <Zap className="w-4 h-4 text-blue-600" />
                      <span className="truncate">{product.specifications.gpu}</span>
                    </div>
                  )}
                  {product.specifications.ram && (
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-50 border border-zinc-150">
                      <Layers className="w-4 h-4 text-zinc-500" />
                      <span className="truncate">{product.specifications.ram}</span>
                    </div>
                  )}
                  {product.specifications.storage && (
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-50 border border-zinc-150">
                      <HardDrive className="w-4 h-4 text-zinc-500" />
                      <span className="truncate">{product.specifications.storage}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Benchmarks if present */}
              {product.benchmarks && (
                <div className="mt-4 p-3 rounded-2xl bg-zinc-900 text-zinc-100 text-xs">
                  <div className="flex items-center justify-between font-semibold mb-2 text-zinc-300">
                    <span>Performances Mesurées 4K Ultra</span>
                    <span className="text-emerald-400 font-bold">
                      Score {product.benchmarks.gamingScore4k}/100
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span>Cyberpunk 2077 (4K Ultra + RT) :</span>
                    <span className="font-bold text-white">~{product.benchmarks.fpsCyberpunk4k} FPS</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-1">
                    <span>Warzone 3 (4K Compétitif) :</span>
                    <span className="font-bold text-white">~{product.benchmarks.fpsWarzone4k} FPS</span>
                  </div>
                </div>
              )}
            </div>

            {/* Price & CTA */}
            <div className="pt-4 border-t border-zinc-100 space-y-4">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-zinc-950">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-zinc-400 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Prêt à expédier
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAdd}
                  variant="primary"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Ajouté au panier !</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Ajouter au Panier</span>
                    </>
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  Livraison sécurisée sous 48h
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Garantie 3 ans incluse
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
