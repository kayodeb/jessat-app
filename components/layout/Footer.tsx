'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Cpu, ArrowRight, ShieldCheck, Truck, RotateCcw, Headphones, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setTimeout(() => setSubscribed(false), 4000)
    setEmail('')
  }

  const trustItems = [
    {
      icon: ShieldCheck,
      title: 'Garantie 3 Ans Intégrale',
      desc: 'Pieces, main-d-oeuvre et enlevement a domicile.',
    },
    {
      icon: Truck,
      title: 'Livraison Choc & Température',
      desc: 'Emballage haute densité double caisse renforcée.',
    },
    {
      icon: RotateCcw,
      title: '30 Jours d\'Essai Reel',
      desc: 'Satisfait ou remboursé sans aucune complication.',
    },
    {
      icon: Headphones,
      title: 'Support Technique Dédié',
      desc: 'Techniciens experts et monteurs basés en France.',
    },
  ]

  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-16 pb-12 border-t border-zinc-800/80">
      {/* Trust propositions row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 pb-16 border-b border-zinc-800/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0 text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-100">{item.title}</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-zinc-800/80">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                AERO <span className="text-xs text-zinc-400 font-normal">RIGS</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Concepteur et assembleur de machines de précision. Architectures optimisées pour le
              gaming 4K sans compromis, la création numérique et le calcul IA.
            </p>

            {/* Newsletter form */}
            <form onSubmit={handleSubscribe} className="pt-2 max-w-md">
              <span className="text-xs font-semibold text-zinc-200 block mb-2">
                Restez informé des nouveaux drop de rigs & composants
              </span>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@domaine.com"
                  required
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-blue-500 transition-colors"
                />
                <Button type="submit" variant="accent" size="sm" className="rounded-xl">
                  {subscribed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 mt-1.5">
                  Merci ! Vous êtes inscrit aux alertes privilèges AERO.
                </p>
              )}
            </form>
          </div>

          {/* Links Column 1: Machines */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-100 mb-4">
              Ordinateurs
            </h5>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  PC Gaming 4K Apex
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Phantom Stealth Silencieux
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Workstations Rendu & IA
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  Laptops Kinesis OLED
                </a>
              </li>
              <li>
                <a href="#configurator" className="text-blue-400 hover:text-blue-300 font-medium">
                  Configurateur Custom →
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Écosystème */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-100 mb-4">
              Composants & Lab
            </h5>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  NVIDIA GeForce RTX 50 Series
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  AMD Ryzen 9000 X3D
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  Moniteurs QD-OLED 240Hz
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  Claviers Magnétiques Hall Effect
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  Stockage PCIe Gen5
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Support */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-100 mb-4">
              Service & Aide
            </h5>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Centre d'Assistance Technique
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Suivi d'Expédition
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Procédure de Garantie RMA
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Financement en 3x ou 4x sans frais
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Contactez un Monteur AERO
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© 2026 AERO RIGS Inc. Tous droits réservés. Conçu pour l'excellence technologique.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 cursor-pointer">Conditions Générales</span>
            <span className="hover:text-zinc-300 cursor-pointer">Politique de Confidentialité</span>
            <span className="hover:text-zinc-300 cursor-pointer">Gestion des Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
