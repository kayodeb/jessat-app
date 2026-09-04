'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Heart,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  Sparkles,
  PackageOpen,
  Check,
} from 'lucide-react'
import { PRODUCTS } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { useWishlist } from '@/lib/context/wishlist-context'
import { useCart } from '@/lib/context/cart-context'
import { formatPrice } from '@/lib/utils'
import { Navbar } from '@/components/layout/Navbar'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/layout/CartDrawer'
import { SearchModal } from '@/components/layout/SearchModal'
import { Button } from '@/components/ui/Button'

export default function WishlistPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [allAdded, setAllAdded] = useState(false)
  const { wishlistIds, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  // Match saved wishlist IDs with actual products
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id))

  // Recommended products if wishlist is empty
  const recommendedProducts = PRODUCTS.filter((p) => p.isBestseller || p.featured).slice(0, 4)

  // Total price in FCFA of wishlist items
  const totalPrice = wishlistProducts.reduce((acc, p) => acc + p.price, 0)

  // Add all items in wishlist to the cart
  const handleAddAllToCart = () => {
    wishlistProducts.forEach((product) => {
      addToCart(product)
    })
    setAllAdded(true)
    setTimeout(() => setAllAdded(false), 2500)
  }

  // Clear all wishlist items
  const handleClearWishlist = () => {
    if (confirm('Voulez-vous vraiment vider votre liste d\'envies ?')) {
      wishlistIds.forEach((id) => toggleWishlist(id))
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <AnnouncementBar />
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-zinc-950 transition-colors">
            Accueil
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-950 font-semibold">Ma Liste d'Envies</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-zinc-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold mb-2">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Articles Sauvegardés</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight">
              Ma Liste d'Envies
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Retrouvez ici vos ordinateurs et accessoires favoris pour les commander au meilleur moment.
            </p>
          </div>

          {wishlistProducts.length > 0 && (
            <div className="flex flex-wrap items-center gap-2.5">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearWishlist}
                className="text-xs text-zinc-600 hover:text-rose-600 hover:border-rose-300 gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Vider la liste</span>
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={handleAddAllToCart}
                className="text-xs gap-1.5 shadow-md shadow-blue-500/20"
              >
                {allAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Tout est dans le panier !</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Tout ajouter au panier</span>
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Wishlist Content */}
        {wishlistProducts.length > 0 ? (
          <div className="space-y-8">
            {/* Total estimation bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs">
              <div className="text-xs text-zinc-600">
                Vous avez <strong className="text-zinc-950">{wishlistProducts.length}</strong> article{wishlistProducts.length > 1 ? 's' : ''} dans vos favoris
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-500">Estimation totale :</span>
                <span className="text-lg font-black text-blue-700">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="py-14 text-center">
            <div className="w-20 h-20 rounded-3xl bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-500 mb-5 shadow-sm">
              <Heart className="w-10 h-10 stroke-[1.5]" />
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-zinc-950 mb-2">
              Votre liste d'envies est vide
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto mb-6 leading-relaxed">
              Explorez nos ordinateurs neufs et d'occasion, imprimantes et accessoires, puis cliquez sur l'icône en forme de cœur pour sauvegarder vos coups de cœur.
            </p>

            <Link href="/produits">
              <Button variant="primary" size="md" className="gap-2 text-xs font-bold shadow-lg">
                <span>Explorer le catalogue complet</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            {/* Suggested Popular Products */}
            <div className="mt-16 pt-12 border-t border-zinc-200/80 text-left">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="text-base font-bold text-zinc-950">
                  Nos meilleures ventes recommandées pour vous
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  )
}
