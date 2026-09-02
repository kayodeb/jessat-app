'use client'

import React from 'react'
import { Truck, Sparkles, ShieldCheck } from 'lucide-react'

export function AnnouncementBar() {
  return (
    <div className="bg-zinc-950 text-zinc-300 text-xs py-2 px-4 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left message */}
        <div className="hidden sm:flex items-center gap-2">
          <Truck className="w-3.5 h-3.5 text-blue-400" />
          <span>Livraison Express Sécurisée 24/48h Offerte dès 150 €</span>
        </div>

        {/* Center sale badge */}
        <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-zinc-100">Édition Spéciale : Jusqu'à -30% sur les configurations RTX 50 Series</span>
        </div>

        {/* Right warranty */}
        <div className="hidden md:flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Garantie Matérielle 3 Ans Zéro Pixel Mort</span>
        </div>
      </div>
    </div>
  )
}
