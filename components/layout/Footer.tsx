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
      title: 'Garantie & Fiabilité',
      desc: 'Matériels neufs et d\'occasion testés et garantis.',
    },
    {
      icon: Truck,
      title: 'Livraison Rapide',
      desc: 'Livraison sécurisée à Abomey-Calavi, Cotonou et partout au Bénin.',
    },
    {
      icon: RotateCcw,
      title: 'Service Après-Vente',
      desc: 'Assistance, réparation et accompagnement personnalisé.',
    },
    {
      icon: Headphones,
      title: 'Conseil & Support Dédié',
      desc: 'Techniciens experts à votre écoute par appel et WhatsApp.',
    },
  ]

  return (
    <footer className="bg-zinc-950 text-zinc-100 pt-16 pb-12 border-t border-zinc-800/80">
      {/* Trust propositions row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 pb-16 border-b border-zinc-800/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-800/60 flex items-center justify-center flex-shrink-0 text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
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
          {/* Brand Info, Socials & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-white leading-none">Jessat</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-400">Multi Services</span>
              </div>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Jessat Multi Services — Carrefour Zogbadjè, Abomey-Calavi, Bénin.
              Spécialiste de la vente d'ordinateurs neufs et d'occasion, imprimantes et accessoires informatiques.
            </p>
            <div className="text-xs text-zinc-300 font-medium space-y-1">
              <p>
                WhatsApp / Tél :{' '}
                <a
                  href="https://wa.me/22997640758"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-semibold"
                >
                  +229 97 64 07 58
                </a>
              </p>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-zinc-300 block mb-2.5">Suivez-nous sur les réseaux :</span>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/JESSATMultiservice89/?locale=fr_FR"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Page Facebook Jessat Multiservices"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition-all text-xs font-medium"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@jessatinformatique"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Compte TikTok Jessat Informatique"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-800 text-zinc-200 hover:bg-zinc-100 hover:text-zinc-950 border border-zinc-700 transition-all text-xs font-medium"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525 0h3.08c.12 1.054.74 2.052 1.63 2.68 1.004.707 2.22.95 3.425.96v3.25c-1.397-.02-2.774-.46-3.896-1.25-.19-.13-.37-.28-.54-.43v8.52c0 1.94-.79 3.75-2.09 5.05A7.16 7.16 0 0 1 9.07 21c-3.95 0-7.16-3.2-7.16-7.15 0-3.96 3.2-7.16 7.16-7.16.42 0 .84.04 1.25.11v3.28a3.9 3.9 0 0 0-1.25-.2 3.88 3.88 0 0 0-3.89 3.89c0 2.14 1.74 3.88 3.89 3.88 2.05 0 3.75-1.59 3.88-3.62.01-.1.02-.2.02-.3V0z" />
                  </svg>
                  <span>TikTok</span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/22997640758"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact WhatsApp Jessat"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 transition-all text-xs font-medium"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Newsletter form */}
            <form onSubmit={handleSubscribe} className="pt-2 max-w-md">
              <span className="text-xs font-semibold text-zinc-300 block mb-2">
                Restez informé de nos arrivages et promotions
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
                <Button type="submit" variant="accent" size="sm" className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
                  {subscribed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 mt-1.5">
                  Merci ! Vous êtes bien inscrit aux notifications.
                </p>
              )}
            </form>
          </div>

          {/* Links Column 1: Nos Produits */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-100 mb-4">
              Catalogue & Produits
            </h5>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link href="/produits" className="hover:text-white transition-colors">
                  Tous les Ordinateurs
                </Link>
              </li>
              <li>
                <Link href="/produits?category=laptops" className="hover:text-white transition-colors">
                  PC Portables Neufs & Occasion
                </Link>
              </li>
              <li>
                <Link href="/produits?category=desktops" className="hover:text-white transition-colors">
                  Ordinateurs de Bureau & Gaming
                </Link>
              </li>
              <li>
                <Link href="/produits?category=accessoires" className="hover:text-white transition-colors">
                  Accessoires & Périphériques
                </Link>
              </li>
              <li>
                <Link href="/#configurator" className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1">
                  Configurateur Custom →
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Nos Services */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-100 mb-4">
              Services & Engagements
            </h5>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Vente de Matériel Informatique
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Maintenance & Réparation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Service Après-Vente (SAV)
                </Link>
              </li>
              <li>
                <Link href="/#flashsale" className="hover:text-white transition-colors">
                  Offres & Ventes Flash
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Demander un Devis Gratuit
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Contact & Infos */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-100 mb-4">
              Contact & Boutique
            </h5>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Notre Boutique (Calavi, Zogbadjè)
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition-colors">
                  Ma Liste d'Envies
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/22997640758"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  Commander via WhatsApp
                </a>
              </li>
              <li>
                <span className="text-zinc-400 block pt-1">
                  Livraison à Calavi, Cotonou & partout au Bénin
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© 2026 Jessat Multiservices. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-zinc-300 transition-colors">Contact</Link>
            <Link href="/produits" className="hover:text-zinc-300 transition-colors">Catalogue</Link>
            <a href="https://wa.me/22997640758" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
