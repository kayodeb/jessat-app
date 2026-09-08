'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Truck,
  ArrowLeft,
  CreditCard,
} from 'lucide-react'
import { useCart } from '@/lib/context/cart-context'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { AnimatedCounter } from '@/components/animations/AnimatedCounter'

export default function PanierPage() {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, totalItems } = useCart()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-zinc-950 transition-colors">
            Accueil
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-950 font-semibold">Mon Panier</span>
        </nav>

        {/* Page Title */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold mb-2">
              <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
              <span>Articles Sélectionnés ({totalItems})</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight">
              Mon Panier
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Vérifiez vos articles, ajustez vos quantités puis passez au paiement.
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-zinc-500 hover:text-rose-600 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <Trash2 className="w-4 h-4" />
              <span>Vider tout le panier</span>
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* EMPTY CART VIEW */
          <div className="bg-white rounded-3xl border border-zinc-200 p-12 text-center max-w-xl mx-auto my-8 shadow-sm">
            <div className="w-20 h-20 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-blue-600 mb-5">
              <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-950 mb-2">Votre panier est actuellement vide</h2>
            <p className="text-xs sm:text-sm text-zinc-500 mb-6 leading-relaxed">
              Explorez nos ordinateurs neufs et d'occasion, imprimantes et accessoires informatiques au meilleur prix.
            </p>
            <Link href="/produits">
              <Button variant="primary" size="lg" className="gap-2 text-xs font-bold shadow-md">
                <span>Découvrir le catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        ) : (
          /* MAIN PANIER GRID */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Cart Items (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-3xl border border-zinc-200 p-5 sm:p-6 shadow-sm">
                <div className="divide-y divide-zinc-100">
                  {items.map((item) => {
                    const itemPrice = item.customConfigurationTotal ?? item.product.price
                    return (
                      <div key={item.id} className="py-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="relative w-24 h-24 sm:w-20 sm:h-20 rounded-2xl bg-zinc-100 overflow-hidden flex-shrink-0 border border-zinc-150">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>

                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 truncate">
                                {item.product.name}
                              </h3>
                              <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                                {item.product.specifications.cpu || item.product.tagline}
                              </p>
                              {item.selectedOptions && (
                                <span className="inline-block mt-1 text-[10px] text-blue-600 font-semibold px-2 py-0.5 bg-blue-50 rounded">
                                  Config Sur-Mesure
                                </span>
                              )}
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1.5 text-zinc-400 hover:text-rose-600 transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity controls */}
                            <div className="flex items-center border border-zinc-200 rounded-lg bg-zinc-50">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 hover:bg-zinc-200 rounded-l-lg text-zinc-600 transition-colors"
                                aria-label="Diminuer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-3 text-xs font-bold text-zinc-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 hover:bg-zinc-200 rounded-r-lg text-zinc-600 transition-colors"
                                aria-label="Augmenter"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Item total */}
                            <span className="text-sm font-black text-zinc-950">
                              {formatPrice(itemPrice * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="bg-blue-50/70 border border-blue-200/60 rounded-3xl p-5 text-xs text-blue-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-blue-950">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Avantages &amp; Sécurité</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-blue-800">
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>Livraison à Calavi, Cotonou &amp; tout le Bénin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Paiement 100% à la livraison</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary & 2 Action Buttons (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-md sticky top-24 space-y-5">
                <h2 className="text-base font-bold text-zinc-950 pb-3 border-b border-zinc-150">
                  Récapitulatif de commande
                </h2>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-zinc-600">
                    <span>Nombre d'articles</span>
                    <span className="font-semibold text-zinc-900">{totalItems}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>Sous-total HT</span>
                    <span>{formatPrice(subtotal * 0.8)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>TVA (20%)</span>
                    <span>{formatPrice(subtotal * 0.2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>Frais de livraison</span>
                    <span className="text-emerald-600 font-bold">À la livraison</span>
                  </div>

                  <div className="pt-3 border-t border-zinc-200 flex justify-between items-center text-sm font-black text-zinc-950">
                    <span>Total TTC :</span>
                    <span className="text-lg text-blue-700">
                      <AnimatedCounter value={subtotal} suffix=" FCFA" />
                    </span>
                  </div>
                </div>

                {/* TWO MAIN BUTTONS AS REQUESTED */}
                <div className="pt-3 space-y-3">
                  {/* Button 2: Passer au paiement -> redirects to /checkout */}
                  <Link href="/checkout" className="block w-full">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full flex items-center justify-center gap-2 text-xs font-bold py-3.5 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                    >
                      <span>Passer au paiement</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>

                  {/* Button 1: Continuer vos achats -> redirects to /produits */}
                  <Link href="/produits" className="block w-full">
                    <Button
                      variant="outline"
                      size="md"
                      className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-zinc-700 hover:text-zinc-950 border-zinc-200 hover:bg-zinc-100"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Continuer vos achats</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
