'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Filter, SlidersHorizontal, ChevronRight, Search, Sparkles } from 'lucide-react'
import { PRODUCTS } from '@/data/products'
import { ProductCategory } from '@/types/product'
import { ProductCard } from '@/components/product/ProductCard'
import { Navbar } from '@/components/layout/Navbar'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/layout/CartDrawer'
import { SearchModal } from '@/components/layout/SearchModal'

export default function ProductsCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating'>('rating')
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const categories = [
    { id: 'all', label: 'Tous les produits' },
    { id: 'ordinateurs', label: 'Ordinateurs' },
    { id: 'claviers', label: 'Claviers' },
    { id: 'souris', label: 'Souris' },
    { id: 'imprimantes', label: 'Imprimantes' },
    { id: 'projecteurs', label: 'Projecteurs' },
    { id: 'accessoires', label: 'Accessoires' },
  ]

  let filtered =
    selectedCategory === 'all'
      ? [...PRODUCTS]
      : PRODUCTS.filter((p) => p.category === (selectedCategory as ProductCategory))

  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price)
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating)
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
          <span className="text-zinc-950 font-semibold">Catalogue Complet</span>
        </nav>

        {/* Page Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catalogue Officiel AERO RIGS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
            Toutes Nos Machines & Composants
          </h1>
          <p className="text-sm text-zinc-600 mt-2 max-w-2xl">
            Découvrez nos configurations prêtes à l'emploi, conçues avec les composants les plus
            rapides du marché et testées intensivement en France.
          </p>
        </div>

        {/* Filters and Sorting Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs mb-8">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-950'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-zinc-500" />
            <span className="text-xs text-zinc-500 font-medium">Trier par :</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 outline-none text-zinc-900"
            >
              <option value="rating">Meilleures Notes</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  )
}
