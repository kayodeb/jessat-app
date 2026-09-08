'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Filter, SlidersHorizontal, ChevronRight, Search, Sparkles } from 'lucide-react'
import { PRODUCTS } from '@/data/products'
import { ProductCategory } from '@/types/product'
import { ProductCard } from '@/components/product/ProductCard'

function CatalogContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all')
  const [selectedCondition, setSelectedCondition] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating'>('rating')

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [categoryParam])

  const categories = [
    { id: 'all', label: 'Tous les produits' },
    { id: 'ordinateurs', label: 'Ordinateurs' },
    { id: 'claviers', label: 'Claviers' },
    { id: 'souris', label: 'Souris' },
    { id: 'imprimantes', label: 'Imprimantes' },
    { id: 'projecteurs', label: 'Projecteurs' },
    { id: 'accessoires', label: 'Accessoires' },
  ]

  let filtered = [...PRODUCTS]

  if (selectedCategory !== 'all') {
    filtered = filtered.filter((p) => p.category === (selectedCategory as ProductCategory))
  }

  if (selectedCondition !== 'all') {
    filtered = filtered.filter((p) => p.condition === selectedCondition)
  }

  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price)
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
        <Link href="/" className="hover:text-zinc-950 transition-colors">
          Accueil
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-zinc-950 font-semibold">Catalogue Complet</span>
      </nav>

      {/* Catalog Hero Banner with hero-laptops.png overflowing */}
      <div className="relative rounded-3xl bg-gradient-to-r from-zinc-950 via-slate-900 to-blue-950 border border-zinc-800/80 text-white p-6 sm:p-10 mb-10 shadow-2xl overflow-hidden md:overflow-visible">
        {/* Subtle radial glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-radial from-blue-600/20 via-transparent to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 relative z-10">
          {/* Left Content */}
          <div className="md:col-span-7 space-y-3.5">
            {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>CATALOGUE OFFICIEL JESSAT MULTISERVICES</span>
              </div> */}

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Tous nos Ordinateurs &amp; Accessoires
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
              Explorez notre sélection de matériels informatiques neufs et venant (occasion garantie), testés et configurés pour vos besoins professionnels et personnels.
            </p>
          </div>

          {/* Right Image overflowing out of the card */}
          <div className="md:col-span-5 relative h-56 sm:h-72 md:h-80 w-full flex items-center justify-center">
            <div className="relative w-full h-full md:-mr-6 md:-my-10 md:scale-110 transform transition-transform duration-500 hover:scale-115">
              <Image
                src="/images/boutique-laptops.png"
                alt="Catalogue Ordinateurs et Matériels Jessat"
                fill
                className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sorting Bar */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${selectedCategory === cat.id
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

        {/* Condition Filter Bar (Tous / Neuf / Venant) */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-zinc-200 shadow-2xs">
          <span className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            Filtrer par état :
          </span>
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'Tous les états' },
              { id: 'neuf', label: 'Non Venant' },
              { id: 'venu', label: 'Venu' },
            ].map((cond) => (
              <button
                key={cond.id}
                onClick={() => setSelectedCondition(cond.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedCondition === cond.id
                    ? cond.id === 'neuf'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : cond.id === 'venu'
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-zinc-900 text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
              >
                {cond.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default function ProductsCatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fafafa]" />}>
      <CatalogContent />
    </Suspense>
  )
}
