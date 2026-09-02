'use client'

import React, { useState } from 'react'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Navbar } from '@/components/layout/Navbar'
import { CartDrawer } from '@/components/layout/CartDrawer'
import { SearchModal } from '@/components/layout/SearchModal'
import { Footer } from '@/components/layout/Footer'

import { HeroSection } from '@/components/home/HeroSection'
import { ValuePropsBar } from '@/components/home/ValuePropsBar'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import { FeaturedProductsSection } from '@/components/home/FeaturedProductsSection'
import { ConfiguratorSection } from '@/components/home/ConfiguratorSection'
import { BestSellersSection } from '@/components/home/BestSellersSection'
import { PromoBannerSection } from '@/components/home/PromoBannerSection'
import { OrdinateursSection } from '@/components/home/OrdinateursSection'
import { ProductQuickView } from '@/components/product/ProductQuickView'

import { Product } from '@/types/product'

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug)
    scrollToSection('products')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      {/* Top Banner & Header */}
      <AnnouncementBar />
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onExploreClick={() => scrollToSection('products')}
          onConfiguratorClick={() => scrollToSection('configurator')}
        />

        {/* 2. Value Proposition Pillars */}
        <ValuePropsBar />

        {/* 3. Categories Ecosystem */}
        <CategoriesSection onSelectCategory={handleCategorySelect} />

        {/* 4. Section Ordinateurs avec style PC Frame */}
        <OrdinateursSection />

        {/* 5. New Arrivals & Hardware Catalogue */}
        <FeaturedProductsSection
          onQuickView={(product) => setQuickViewProduct(product)}
          selectedCategorySlug={selectedCategory}
        />

        {/* 5. Interactive PC Builder */}
        <ConfiguratorSection />

        {/* 6. Bestsellers Showcase */}
        <BestSellersSection onQuickView={(product) => setQuickViewProduct(product)} />

        {/* 7. Promotional Split Flash Sale */}
        <PromoBannerSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlay drawers and Modals */}
      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  )
}
