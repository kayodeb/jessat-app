'use client'

import Image from 'next/image'
import { ArrowRight, Flame } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'

export function PromoBannerSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/60 py-16 sm:py-24">
      {/* Halos décoratifs subtils en arrière-plan */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-teal-200/20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12">
          {/* Left — texte promo (5 colonnes) */}
          <Reveal direction="left" className="lg:col-span-5 w-full">
            <div className="relative z-20 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start max-w-xl mx-auto lg:mx-0">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-sm">
                <Flame className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span>VENTES FLASH EXCLUSIVES</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 leading-[1.15] tracking-tight">
               Spéciale{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  PROMOTION
                </span>
              </h2>

              <p className="text-xl sm:text-2xl font-bold text-emerald-600">
                -30% sur le Acer  Prédactor 
              </p>

              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-md">
                Du 16 au 30 avril 2026 
              </p>

              <div className="pt-2">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-zinc-950/15 transition-all duration-300 hover:bg-zinc-800 hover:gap-3 hover:shadow-xl"
                >
                  <span>Acheter maintenant</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right — texte géant "SALE" en fond + image détourée par-dessus (7 colonnes) */}
          <Reveal direction="right" className="lg:col-span-7 w-full">
            <div className="relative h-[340px] sm:h-[420px] lg:h-[480px] w-full flex items-center justify-center">
              {/* Texte de fond géant "SALE" */}
              <div
                aria-hidden
                className="pointer-events-none select-none absolute inset-0 flex items-center justify-center"
              >
                <span className="font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-200/80 via-teal-200/60 to-cyan-200/50 text-[6rem] sm:text-[9rem] lg:text-[12rem] xl:text-[13rem] select-none">
                  PROMO
                </span>
              </div>

              {/* Image détourée (fond transparent) posée devant le texte */}
              <div className="relative z-10 w-full h-full">
                <Image
                  src="/images/hero-laptops1.png"
                  alt="Sélection d'ordinateurs AERO en promotion"
                  fill
                  className="object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                  sizes="(min-width: 1280px) 700px, (min-width: 1024px) 50vw, 100vw"
                  priority
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}