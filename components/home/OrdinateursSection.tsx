'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Cpu, Zap, Star, ShieldCheck, Gauge, ShoppingBag, Check } from 'lucide-react'
import { PRODUCTS } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/lib/context/cart-context'
import { Reveal } from '@/components/animations/Reveal'

const ordinateurs = PRODUCTS.filter((p) => p.category === 'ordinateurs')

export function OrdinateursSection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isAdded, setIsAdded] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { addToCart } = useCart()

  const active = ordinateurs[activeIdx] || ordinateurs[0]

  // Rotation automatique toutes les 5s (sauf interaction utilisateur)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ordinateurs.length)
    }, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const handleSelect = (idx: number) => {
    setActiveIdx(idx)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const handleAddToCart = () => {
    addToCart(active)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <section id="ordinateurs" className="relative overflow-hidden bg-[#090b10] py-24 border-b border-zinc-800">
      {/* Lueur d'ambiance en arrière-plan */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/3 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }}
        />
        <div
          className="absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

        {/* ── En-tête de la section ── */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Gauge className="w-3.5 h-3.5" />
                <span>Gamme Complète</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Nos <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Ordinateurs</span>
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl leading-relaxed">
                De la tour gaming RTX 5090 à la station de travail IA — chaque machine est assemblée et testée 72h en France.
              </p>
            </div>

            <Link
              href="/produits"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all group self-start md:self-end"
            >
              <span>Voir tout le catalogue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>

        {/* ── Showcase Principal : Frame UIverse à gauche + Détails & Photos à droite ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">

          {/* COLONNE GAUCHE (5 cols) : La montre / châssis UIverse affichant l'image et l'écran du PC */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="watch-wrapper">
              <div className="watch">
                {/* Boîtier principal */}
                <div className="frame">
                  {/* Image du produit actif intégrée dans l'écran */}
                  <div className="screen-content">
                    <Image
                      src={active.images[0]}
                      alt={active.name}
                      fill
                      priority
                      className="object-cover object-center transition-all duration-700 hover:scale-105"
                      sizes="(max-width: 640px) 280px, 340px"
                    />
                    {/* Gradient de contraste */}
                    <div className="screen-gradient" />

                    {/* HUD / Chiffres style montre sur l'écran */}
                    <div className="screen-hud">
                      <div className="hud-score-badge">
                        <span className="hud-label">FPS 4K</span>
                        <span className="hud-value">
                          {active.benchmarks?.fpsCyberpunk4k || 120}
                        </span>
                      </div>
                      <div className="hud-price-badge">
                        <span className="hud-price">{formatPrice(active.price)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bouton rotatif latéral droit */}
                <div className="sideBtn" />

                {/* Bouton power latéral droit */}
                <div className="powerBtn" />

                {/* 3 points décoratifs sur la sangle inférieure */}
                <div className="dots">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-zinc-500 mt-4 text-center">
              Châssis Haute Fidélité • Surveillance thermique & télémétrie en temps réel
            </p>
          </div>

          {/* COLONNE DROITE (7 cols) : Fiche détaillée de la machine active */}
          <div className="lg:col-span-7 space-y-6">
            {/* Badges & Note */}
            <div className="flex flex-wrap items-center gap-3">
              {active.badge && (
                <span className="px-3 py-1 rounded-full bg-sky-400/15 border border-sky-400/30 text-sky-300 text-xs font-bold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  {active.badge}
                </span>
              )}
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                En stock ({active.stockCount} dispo)
              </span>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 ml-auto">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white">{active.rating}</span>
                <span>({active.reviewCount} avis)</span>
              </div>
            </div>

            {/* Titre et marque */}
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-1">
                {active.brand}
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                {active.name}
              </h3>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                {active.description}
              </p>
            </div>

            {/* Grille des composants clés */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {active.specifications.cpu && (
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold block">Processeur</span>
                    <span className="text-xs font-semibold text-zinc-200 truncate block">{active.specifications.cpu}</span>
                  </div>
                </div>
              )}

              {active.specifications.gpu && (
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold block">Carte Graphique</span>
                    <span className="text-xs font-semibold text-zinc-200 truncate block">{active.specifications.gpu}</span>
                  </div>
                </div>
              )}

              {active.specifications.ram && (
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Gauge className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold block">Mémoire RAM</span>
                    <span className="text-xs font-semibold text-zinc-200 truncate block">{active.specifications.ram}</span>
                  </div>
                </div>
              )}

              {active.specifications.storage && (
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold block">Stockage NVMe</span>
                    <span className="text-xs font-semibold text-zinc-200 truncate block">{active.specifications.storage}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Prix et Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div>
                {active.compareAtPrice && (
                  <span className="text-xs text-zinc-500 line-through block">
                    {formatPrice(active.compareAtPrice)}
                  </span>
                )}
                <span className="text-3xl font-black text-white">
                  {formatPrice(active.price)}
                </span>
              </div>

              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm transition-all shadow-lg shadow-sky-500/25 active:scale-95"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Ajouté au panier !</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Ajouter au panier</span>
                    </>
                  )}
                </button>

                <Link
                  href={`/produits/${active.slug}`}
                  className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/10 transition-all"
                >
                  <span>Fiche dédiée</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Sélecteur en cartes avec images de tous les ordinateurs de la gamme ── */}
        <div className="pt-6 border-t border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Sélectionner un modèle pour l’inspecter :
            </span>
            <span className="text-xs text-zinc-500">
              {activeIdx + 1} sur {ordinateurs.length} ordinateurs
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {ordinateurs.map((pc, idx) => (
              <button
                key={pc.id}
                onClick={() => handleSelect(idx)}
                className={`group relative p-3 rounded-2xl border text-left transition-all duration-300 overflow-hidden ${
                  idx === activeIdx
                    ? 'bg-white/10 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                }`}
              >
                {/* Image miniature du PC */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2 bg-zinc-900">
                  <Image
                    src={pc.images[0]}
                    alt={pc.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="120px"
                  />
                  {idx === activeIdx && (
                    <div className="absolute inset-0 ring-2 ring-sky-400 rounded-xl" />
                  )}
                </div>

                <div className="text-[11px] font-bold text-white truncate group-hover:text-sky-300 transition-colors">
                  {pc.name}
                </div>
                <div className="text-[10px] font-semibold text-sky-400">
                  {formatPrice(pc.price)}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* ── CSS du style UIverse Watch de Spacious74 adapté ── */}
      <style jsx>{`
        .watch-wrapper {
          padding: 60px 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* From Uiverse.io by Spacious74 */
        .watch {
          position: relative;
          transform: scale(0.85);
          transition: transform 0.3s ease;
        }

        .watch::after,
        .watch::before {
          content: "";
          width: 10rem;
          height: 140px;
          background: radial-gradient(circle at 200px, rgb(10, 15, 25), rgb(35, 45, 60));
          box-shadow: inset 0px -10px 18px rgba(56, 189, 248, 0.25), 10px 0px 30px #00000071;
          position: absolute;
          left: 50%;
          transform: translate(-50%, 0%);
          border-radius: 0 0 16px 16px;
        }

        .watch::before {
          content: "";
          width: 10rem;
          height: 140px;
          background: radial-gradient(circle at 200px, rgb(10, 15, 25), rgb(35, 45, 60));
          box-shadow: inset 0px 10px 18px rgba(56, 189, 248, 0.25), 10px 0px 30px #00000071;
          position: absolute;
          left: 50%;
          transform: translate(-50%, -100%);
          border-radius: 16px 16px 0 0;
        }

        .dots {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 120%);
          padding: 3px;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .dots .dot {
          width: 14px;
          aspect-ratio: 1;
          background-color: #0b0f17;
          border-radius: 100px;
          display: block;
          margin-bottom: 24px;
          box-shadow: inset 2px 0 5px rgba(56, 189, 248, 0.5);
        }

        .frame {
          background: #0d1117;
          border-radius: 92px;
          box-shadow: inset 0 0 24px 1px #0d0d0d, inset 0 0 0 10px #38bdf8,
            0 20px 40px #00000090;
          height: 380px;
          margin: 0 20px;
          padding: 24px 22px;
          position: relative;
          width: 19rem;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          overflow: hidden;
          z-index: 5;
        }

        .frame::before {
          border: 1px solid rgba(56, 189, 248, 0.4);
          border-radius: 80px;
          box-shadow: 0 0 16px rgba(56, 189, 248, 0.3),
            inset 0 0 14px 2px rgba(56, 189, 248, 0.3);
          content: "";
          height: 356px;
          left: 12px;
          position: absolute;
          top: 12px;
          width: 17.6rem;
          pointer-events: none;
          z-index: 12;
        }

        .screen-content {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 70px;
          overflow: hidden;
        }

        .screen-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%);
          z-index: 2;
        }

        .screen-hud {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 28px 20px;
        }

        .hud-score-badge {
          align-self: flex-start;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 14px;
          padding: 6px 12px;
          display: flex;
          flex-direction: column;
        }

        .hud-label {
          font-size: 8px;
          color: #38bdf8;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        .hud-value {
          font-size: 18px;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.1;
          font-family: monospace;
        }

        .hud-price-badge {
          align-self: center;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 18px;
          padding: 8px 16px;
        }

        .hud-price {
          font-size: 16px;
          font-weight: 900;
          color: #38bdf8;
          font-family: monospace;
        }

        .sideBtn {
          background: #38bdf8;
          border-left: 1px solid #000;
          border-radius: 8px 6px 6px 8px / 20px 6px 6px 20px;
          box-shadow: inset 8px 0 8px 0 #0c4a6e, inset -2px 0 6px #0369a1,
            -4px 0 8px #0d0d0d40;
          height: 72px;
          position: absolute;
          right: 4px;
          top: 108px;
          width: 18px;
          z-index: 9;
        }

        .sideBtn::before {
          background: #075985;
          border-radius: 20%;
          box-shadow: 0 -30px rgba(56, 189, 248, 0.75), 0 -27px #075985, 0 -25px #000,
            0 -21px rgba(56, 189, 248, 0.75), 0 -18px #075985, 0 -16px #000,
            0 -12px rgba(56, 189, 248, 0.75), 0 -9px #075985, 0 -7px #000,
            0 -3px rgba(56, 189, 248, 0.75), 0 0 #075985, 0 2px #000,
            0 6px rgba(56, 189, 248, 0.75), 0 9px #075985, 0 11px #000,
            0 15px rgba(56, 189, 248, 0.75), 0 18px #075985, 0 20px #000,
            0 24px rgba(56, 189, 248, 0.75), 0 27px #075985, 0 29px #000;
          content: "";
          height: 3px;
          margin-top: -2px;
          position: absolute;
          right: 2px;
          top: 50%;
          width: 10px;
          z-index: 9;
        }

        .sideBtn::after {
          background: #0c4a6e;
          border-radius: 2px 4px 4px 2px / 20px 8px 8px 20px;
          box-shadow: inset -2px 0 2px 0 #000, inset -6px 0 18px #075985;
          content: "";
          height: 72px;
          position: absolute;
          right: 0;
          top: 0;
          width: 6px;
        }

        .powerBtn {
          background: #1e293b;
          border-radius: 2px 4px 4px 2px / 2px 8px 8px 2px;
          box-shadow: inset 0 0 2px 1px #0f172a;
          height: 72px;
          position: absolute;
          right: 18px;
          top: 212px;
          width: 4px;
        }
      `}</style>
    </section>
  )
}
