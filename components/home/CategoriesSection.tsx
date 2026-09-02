'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { CATEGORIES } from '@/data/categories'
import { Reveal } from '@/components/animations/Reveal'

interface CategoriesSectionProps {
  onSelectCategory?: (slug: string) => void
}

export function CategoriesSection({ onSelectCategory }: CategoriesSectionProps) {
  return (
    <section id="categories" className="py-20 bg-zinc-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching reference */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-blue-600 mb-1">
              Architecture & Écosystème
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-950">
              Explorer Notre Écosystème
            </h2>
          </div>

          <a
            href="#products"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 hover:text-blue-600 transition-colors group"
          >
            <span>Voir Toutes les Catégories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 6 Category Cards Grid matching reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Reveal key={cat.id} delay={idx * 80}>
              <div
                onClick={() => onSelectCategory?.(cat.slug)}
                className="group relative bg-white rounded-3xl p-4 border border-zinc-200/80 hover:border-zinc-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden h-[300px]"
              >
                {/* Background Image with smooth zoom */}
                <div className="absolute inset-0 bg-zinc-950 overflow-hidden">
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    className="object-cover object-center opacity-70 group-hover:opacity-85 group-hover:scale-108 transition-all duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/40" />
                </div>

                {/* Top Badge (Product count) */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-zinc-300 border border-white/10">
                    {cat.productCount} modèles
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 group-hover:bg-white group-hover:text-zinc-950 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="relative z-10 space-y-1">
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:translate-x-1 transition-transform">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed opacity-90">
                    {cat.description}
                  </p>
                  <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                    <span>Découvrir la gamme</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
