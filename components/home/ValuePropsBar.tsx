'use client'

import React from 'react'
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react'

export function ValuePropsBar() {
  const props = [
    {
      icon: Truck,
      title: 'Livraison Express Sécurisée',
      subtitle: 'Double caisse renforcée & assurance incluse',
    },
    {
      icon: ShieldCheck,
      title: 'Garantie Matérielle 3 Ans',
      subtitle: 'Zéro pixel mort & enlèvement sur site',
    },
    {
      icon: RefreshCw,
      title: '30 Jours d\'Essai Libre',
      subtitle: 'Satisfait ou rembourse sous 48h',
    },
    {
      icon: Headphones,
      title: 'Support Monteurs 24/7',
      subtitle: 'Techniciens experts basés en France',
    },
  ]

  return (
    <section className="py-8 border-y border-zinc-200/80 bg-white/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {props.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-2 rounded-2xl transition-colors hover:bg-zinc-50/80"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 border border-zinc-200/60 flex items-center justify-center flex-shrink-0 text-zinc-900 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-950">{item.title}</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{item.subtitle}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
