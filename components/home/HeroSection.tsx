'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowRight, Sparkles, Cpu, Zap, Star, ShieldCheck, Flame } from 'lucide-react'
import { Button } from '@/components/ui/Button'
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
    <section className="relative min-h-[88vh] flex items-center pt-8 pb-16 overflow-hidden tech-grid-bg">
      {/* React Bits inspired soft radial glows in background */}
      <div className="pointer-events-none absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-[120px] -z-10" />
      <div className="pointer-events-none absolute top-1/3 right-1/6 w-[450px] h-[450px] rounded-full bg-indigo-500/10 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-8 z-10">
            {/* Trending / Generation Badge */}
            <div ref={badgeRef} className="inline-block" style={{ opacity: 0 }}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 text-white text-xs font-semibold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span className="uppercase tracking-wider text-[11px]">Architecture Blackwell RTX 50 Series</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span className="text-zinc-300">Disponible Immédiatement</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1
                ref={titleRef}
                style={{ opacity: 0 }}
                className="text-4xl sm:text-6xl xl:text-7xl font-black text-zinc-950 tracking-tight leading-[1.05]"
              >
                PROPULSEZ VOS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-950 via-zinc-800 to-blue-600">
                  PERFORMANCES.
                </span>
              </h1>

              <p
                ref={subtitleRef}
                style={{ opacity: 0 }}
                className="text-base sm:text-lg text-zinc-600 max-w-lg leading-relaxed"
              >
                Des machines sculptées pour performer. Architecture thermique sans compromis,
                silence acoustique absolu et puissance brute pour le gaming 4K et la création assistée par IA.
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
                className="gap-2 shadow-lg shadow-zinc-950/10 text-sm font-semibold group"
              >
                <span>Découvrir les Ordinateurs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                onClick={onConfiguratorClick}
                variant="outline"
                size="lg"
                className="gap-2 text-sm font-semibold border-zinc-300 hover:border-zinc-900"
              >
                <Cpu className="w-4 h-4 text-blue-600" />
                <span>Configurer mon PC</span>
              </Button>
            </div>

            {/* Social Proof matching reference image */}
            <div
              ref={socialRef}
              style={{ opacity: 0 }}
              className="flex items-center gap-4 pt-4 border-t border-zinc-200/80"
            >
              <div className="flex -space-x-2 overflow-hidden">
                <div className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-zinc-200">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Customer"
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <div className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-zinc-200">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Customer"
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <div className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-zinc-200">
                  <Image
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                    alt="Customer"
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
              </div>

              <div className="text-xs">
                <div className="flex items-center gap-1 text-zinc-900 font-bold">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span>4.9 / 5</span>
                </div>
                <span className="text-zinc-500 text-[11px]">
                  Recommandé par +50 000 gamers et créateurs pro
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Floating Hardware Specs */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-8 lg:pt-0">
            {/* Glowing Backdrop Mesh */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] rounded-full bg-gradient-to-tr from-blue-500/20 via-indigo-400/15 to-transparent blur-3xl" />
            </div>

            {/* Central Masterpiece PC Frame */}
            <div
              ref={imageContainerRef}
              style={{ opacity: 0 }}
              className="relative w-full max-w-[500px] aspect-[4/4.5] rounded-3xl p-3 bg-white/40 backdrop-blur-md border border-white/80 shadow-2xl overflow-visible"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
                <Image
                  src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=85"
                  alt="AERO APEX ONE Flagship Rig"
                  fill
                  priority
                  className="object-cover object-center scale-105"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                <div className="absolute bottom-5 inset-x-5 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400">
                      Modèle Présenté
                    </span>
                    <h3 className="text-sm font-black tracking-tight">AERO APEX ONE EXTREME</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/20">
                    3 899 €
                  </span>
                </div>
              </div>

              {/* Floating Spec Chip 1: GPU */}
              <div
                ref={floatingChip1Ref}
                style={{ opacity: 0 }}
                className="absolute -top-4 -left-3 sm:-left-6 p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-zinc-200/80 shadow-xl flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
                    Architecture Graphique
                  </div>
                  <div className="text-xs font-bold text-zinc-950">RTX 5090 24 Go GDDR7</div>
                </div>
              </div>

              {/* Floating Spec Chip 2: CPU */}
              <div
                ref={floatingChip2Ref}
                style={{ opacity: 0 }}
                className="absolute top-1/2 -right-3 sm:-right-8 p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-zinc-200/80 shadow-xl flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center font-bold">
                  <Cpu className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
                    Processeur Gaming
                  </div>
                  <div className="text-xs font-bold text-zinc-950">Ryzen 7 9800X3D</div>
                </div>
              </div>

              {/* Floating Spec Chip 3: Performance */}
              <div
                ref={floatingChip3Ref}
                style={{ opacity: 0 }}
                className="absolute -bottom-4 left-6 sm:left-10 p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-zinc-200/80 shadow-xl flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
                    Fluidité Constatée en 4K
                  </div>
                  <div className="text-xs font-bold text-zinc-950">144+ FPS avec Ray Tracing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
