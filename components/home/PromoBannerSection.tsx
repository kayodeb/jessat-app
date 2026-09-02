'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, Flame, Clock, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/animations/Reveal'

export function PromoBannerSection() {
  // Live Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 48,
    seconds: 32,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const pad = (num: number) => String(num).padStart(2, '0')

  return (
    <section id="flashsale" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Banners matching reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Flash Sale Banner with Glowing Gradient */}
          <div className="lg:col-span-7">
            <Reveal direction="left">
              <div className="relative rounded-3xl overflow-hidden p-8 sm:p-10 text-white min-h-[380px] flex flex-col justify-between shadow-2xl bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500">
                {/* Floating hardware image in background */}
                <div className="absolute right-0 bottom-0 w-72 sm:w-96 h-72 sm:h-96 opacity-90 pointer-events-none transform translate-x-12 translate-y-8">
                  <Image
                    src="https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80"
                    alt="GPU Flash Sale"
                    fill
                    className="object-contain"
                    sizes="400px"
                  />
                </div>

                <div className="relative z-10 space-y-4 max-w-md">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30">
                    <Flame className="w-4 h-4 text-amber-200" />
                    <span>VENTE FLASH LIMITÉE • DERNIERS JOURS</span>
                  </div>

                  <h3 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                    Jusqu'à -30% sur <br />
                    une sélection AERO.
                  </h3>

                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                    Configurations RTX 5080 et Ryzen 7 prêtes à l'emploi. Stock limité à 25 exemplaires
                    numérotés.
                  </p>

                  {/* Countdown Timer matching reference style (02 : 15 : 45 : 30) */}
                  <div className="pt-2 flex items-center gap-2 sm:gap-3">
                    <div className="flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20">
                      <span className="text-lg sm:text-xl font-black">{pad(timeLeft.days)}</span>
                      <span className="text-[9px] uppercase tracking-wider text-white/80">Jours</span>
                    </div>
                    <span className="text-xl font-bold text-white/60">:</span>
                    <div className="flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20">
                      <span className="text-lg sm:text-xl font-black">{pad(timeLeft.hours)}</span>
                      <span className="text-[9px] uppercase tracking-wider text-white/80">Heures</span>
                    </div>
                    <span className="text-xl font-bold text-white/60">:</span>
                    <div className="flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20">
                      <span className="text-lg sm:text-xl font-black">{pad(timeLeft.minutes)}</span>
                      <span className="text-[9px] uppercase tracking-wider text-white/80">Mins</span>
                    </div>
                    <span className="text-xl font-bold text-white/60">:</span>
                    <div className="flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20">
                      <span className="text-lg sm:text-xl font-black text-amber-200">{pad(timeLeft.seconds)}</span>
                      <span className="text-[9px] uppercase tracking-wider text-white/80">Secs</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 pt-6">
                  <a href="#products">
                    <Button
                      variant="primary"
                      size="md"
                      className="bg-white text-zinc-950 hover:bg-zinc-100 font-bold text-xs gap-2 shadow-xl border-none"
                    >
                      <span>Voir les Offres Immédiates</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Stealth Series / New Collection Banner */}
          <div className="lg:col-span-5">
            <Reveal direction="right">
              <div className="relative rounded-3xl overflow-hidden p-8 sm:p-10 text-white min-h-[380px] flex flex-col justify-between shadow-2xl bg-zinc-950 border border-zinc-800">
                {/* Background image subtle overlay */}
                <div className="absolute inset-0 opacity-40">
                  <Image
                    src="https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80"
                    alt="Stealth Collection"
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
                </div>

                <div className="relative z-10 space-y-3">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>Série Furtive • Édition Limitée 2026</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    Série Stealth Furtive Noire
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
                    Zéro bruit parasite, zéro éclairage superflu. Aluminium usiné anodisé noir sablé
                    et performances 4K pures sous cloche insonorisée.
                  </p>
                </div>

                <div className="relative z-10 pt-8">
                  <a href="#products">
                    <Button
                      variant="outline"
                      size="md"
                      className="bg-white/10 hover:bg-white text-white hover:text-zinc-950 border-white/20 text-xs font-semibold gap-2"
                    >
                      <span>Explorer la Série Furtive</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
