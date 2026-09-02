'use client'

import React from 'react'
import Image from 'next/image'
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react'
import { useCart } from '@/lib/context/cart-context'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { AnimatedCounter } from '@/components/animations/AnimatedCounter'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart()

  if (!isOpen) return null

  const freeShippingThreshold = 150
  const missingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100)

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-zinc-900" />
              <h2 className="text-base font-bold text-zinc-950">Mon Panier</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 font-semibold">
                {totalItems}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping bar */}
          <div className="px-5 py-3 bg-zinc-50 border-b border-zinc-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 text-zinc-700 font-medium">
                <Truck className="w-3.5 h-3.5 text-blue-600" />
                {missingForFreeShipping === 0
                  ? 'Félicitations ! Livraison Express offerte.'
                  : `Plus que ${formatPrice(missingForFreeShipping)} pour la livraison express gratuite`}
              </span>
              <span className="font-semibold text-zinc-900">{Math.round(shippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-base font-semibold text-zinc-900">Votre panier est vide</p>
                  <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                    Explorez nos configurations d'exception et configurez votre machine sur-mesure.
                  </p>
                </div>
                <Button onClick={closeCart} variant="primary" size="md">
                  Découvrir les ordinateurs
                </Button>
              </div>
            ) : (
              items.map((item) => {
                const itemPrice = item.customConfigurationTotal ?? item.product.price
                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl border border-zinc-150 bg-white hover:border-zinc-300 transition-all flex gap-3.5 group"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 rounded-xl bg-zinc-100 overflow-hidden flex-shrink-0 border border-zinc-100">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="80px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-xs font-bold text-zinc-900 truncate">
                            {item.product.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-zinc-400 hover:text-red-600 transition-colors p-1"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-0.5 truncate">
                          {item.product.specifications.cpu || item.product.tagline}
                        </p>
                        {item.selectedOptions && (
                          <div className="text-[10px] text-blue-600 font-medium mt-1">
                            Configuration Personnalisée
                          </div>
                        )}
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-50">
                        <div className="flex items-center border border-zinc-200 rounded-lg bg-zinc-50">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-zinc-200 rounded-l-lg text-zinc-600"
                            aria-label="Diminuer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-zinc-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-zinc-200 rounded-r-lg text-zinc-600"
                            aria-label="Augmenter"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-zinc-950">
                          {formatPrice(itemPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-zinc-200 bg-zinc-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-zinc-500">
                  <span>Sous-total HT</span>
                  <span>{formatPrice(subtotal * 0.8)}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-500">
                  <span>TVA (20%)</span>
                  <span>{formatPrice(subtotal * 0.2)}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-500">
                  <span>Livraison</span>
                  <span className="text-emerald-600 font-medium">Offerte</span>
                </div>
                <div className="pt-2 border-t border-zinc-200 flex items-center justify-between text-sm font-bold text-zinc-950">
                  <span>Total TTC</span>
                  <span className="text-base text-zinc-950">
                    <AnimatedCounter value={subtotal} suffix=" €" />
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => alert('Paiement sécurisé simulé. Votre commande a été reçue !')}
              >
                <span>Commander ({totalItems})</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Paiement SSL 256-bit
                </span>
                <span>•</span>
                <span>Garantie 3 ans incluse</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
