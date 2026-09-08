'use client'

import React, { useState } from 'react'

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
    <>
      {/* 1. Hero Section */}
      <HeroSection
        onExploreClick={() => scrollToSection('products')}
        onConfiguratorClick={() => scrollToSection('configurator')}
      />

      {/* 2. Value Proposition Pillars */}
      <ValuePropsBar />

      {/* 3. Categories Ecosystem */}
      <CategoriesSection onSelectCategory={handleCategorySelect} />

      {/* 4. New Arrivals & Hardware Catalogue */}
      <FeaturedProductsSection
        onQuickView={(product) => setQuickViewProduct(product)}
        selectedCategorySlug={selectedCategory}
      />

      {/* 5. Bestsellers Showcase */}
      <BestSellersSection onQuickView={(product) => setQuickViewProduct(product)} />

      {/* 6. Promotional Split Flash Sale */}
      <PromoBannerSection />

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  )
}
