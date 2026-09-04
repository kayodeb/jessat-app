'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowRight, Sparkles, Cpu, Zap, Star, ShieldCheck, Flame } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Aurora from '@/components/Aurora'
import { animateHeroEntrance, startSubtleFloatAnimation } from '@/lib/animations/hero'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface HeroSectionProps {
  onExploreClick: () => void
  onConfiguratorClick: () => void
}

export function HeroSection({ onExploreClick, onConfiguratorClick }: HeroSectionProps) {
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const floatingChip1Ref = useRef<HTMLDivElement>(null)
  const floatingChip2Ref = useRef<HTMLDivElement>(null)
  const floatingChip3Ref = useRef<HTMLDivElement>(null)

  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return

    // Run orchestrated entrance timeline
    animateHeroEntrance({
      badge: badgeRef.current,
      title: titleRef.current,
      subtitle: subtitleRef.current,
      ctas: ctasRef.current,
      social: socialRef.current,
      image: imageContainerRef.current,
      floatingChips: [
        floatingChip1Ref.current,
        floatingChip2Ref.current,
        floatingChip3Ref.current,
      ],
    })

    // Start subtle infinite floating animation on PC visual
    const floatAnim = startSubtleFloatAnimation(imageContainerRef.current)

    return () => {
      floatAnim?.pause()
    }
  }, [prefersReduced])

  return (
    <section className="relative min-h-[90vh] flex items-center pt-8 pb-16 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Aurora background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* <Aurora
          colorStops={['#dbeafe', '#93c5fd', '#e0e7ff']}
          amplitude={0.8}
          blend={0.4}
        /> */}
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#1d4ed8 1px,transparent 1px),linear-gradient(to right,#1d4ed8 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-8 z-10">
            {/* Badge */}
            <div ref={badgeRef} className="inline-block" style={{ opacity: 0 }}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold tracking-wide shadow-lg shadow-blue-200">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-100" />
                <span className="uppercase tracking-wider text-[11px]">Large gamme &bull; Prix compétitifs</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-200" />
                <span className="text-blue-100">Garantie incluse</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1
                ref={titleRef}
                style={{ opacity: 0 }}
                className="text-4xl sm:text-6xl xl:text-7xl font-black text-blue-900 tracking-tight leading-[1.05]"
              >
                JESSAT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-400">
                   MULTISERVICES.
                </span>
              </h1>

              <p
                ref={subtitleRef}
                style={{ opacity: 0 }}
                className="text-base sm:text-lg text-blue-800/70 max-w-lg leading-relaxed"
              >
                Ordinateurs portables et PC de bureau, imprimantes, projecteurs, claviers, souris et
                accessoires — tout ce dont vous avez besoin, au meilleur prix.
              </p>
            </div>

            {/* CTAs */}
            <div
              ref={ctasRef}
              style={{ opacity: 0 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
            >
              <Button
                onClick={onExploreClick}
                variant="primary"
                size="lg"
                className="gap-2 shadow-lg shadow-blue-200/60 text-sm font-semibold group"
              >
                <span>Voir nos Ordinateurs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* <Button
                onClick={onConfiguratorClick}
                variant="outline"
                size="lg"
                className="gap-2 text-sm font-semibold border-blue-200 hover:border-blue-500 text-blue-700"
              >
                <Cpu className="w-4 h-4 text-blue-600" />
                <span>Configurer mon PC</span>
              </Button> */}
            </div>

            {/* Social Proof */}
            {/* <div
              ref={socialRef}
              style={{ opacity: 0 }}
              className="flex items-center gap-4 pt-4 border-t border-blue-100"
            >
              <div className="flex -space-x-2 overflow-hidden">
                <div className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-blue-100">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Client satisfait"
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <div className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-blue-100">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Client satisfait"
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <div className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-blue-100">
                  <Image
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                    alt="Client satisfait"
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
              </div>

              <div className="text-xs">
                <div className="flex items-center gap-1 text-blue-900 font-bold">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span>4.9 / 5</span>
                </div>
                <span className="text-blue-600/70 text-[11px]">
                  Recommandé par +2 000 clients satisfaits
                </span>
              </div>
            </div> */}
          </div>

          {/* Right Column: Hero Visual */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-8 lg:pt-0">
            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] rounded-full bg-gradient-to-tr from-blue-400/30 via-indigo-300/20 to-transparent blur-3xl" />
            </div>

            {/* Floating Laptop Image */}
            <div
              ref={imageContainerRef}
              style={{ opacity: 0 }}
              className="relative w-full max-w-[580px] overflow-visible"
            >
              <Image
                src="/images/hero-laptops.png"
                alt="Ordinateurs portables Jessat Multiservices"
                width={1200}
                height={900}
                priority
                className="w-full h-auto drop-shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 580px"
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(30, 64, 175, 0.25))',
                  mixBlendMode: 'multiply',
                }}
              />

              {/* Chip 1: Garantie */}
              <div
                ref={floatingChip1Ref}
                style={{ opacity: 0 }}
                className="absolute -top-4 -left-3 sm:-left-6 p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-blue-100 shadow-xl flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Garantie</div>
                  <div className="text-xs font-bold text-blue-900">2 ans constructeur</div>
                </div>
              </div>

              {/* Chip 2: Large gamme */}
              <div
                ref={floatingChip2Ref}
                style={{ opacity: 0 }}
                className="absolute top-1/2 -right-3 sm:-right-8 p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-blue-100 shadow-xl flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Large gamme</div>
                  <div className="text-xs font-bold text-blue-900">+200 références</div>
                </div>
              </div>

              {/* Chip 3: Meilleure vente */}
              <div
                ref={floatingChip3Ref}
                style={{ opacity: 0 }}
                className="absolute -bottom-4 left-6 sm:left-10 p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-blue-100 shadow-xl flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Meilleure vente</div>
                  <div className="text-xs font-bold text-blue-900">Livraison offerte</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
