'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Cpu, Zap, Star } from 'lucide-react'
import { PRODUCTS } from '@/data/products'
import { Reveal } from '@/components/animations/Reveal'

const ordinateurs = PRODUCTS.filter((p) => p.category === 'ordinateurs').slice(0, 4)

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   Mini composant "Frame Ã©cran" inspirÃ© du style
   UIverse Watch (Spacious74) â€” adaptÃ© PC
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function PCFrame({ product, isActive }: { product: (typeof ordinateurs)[0]; isActive: boolean }) {
  return (
    <div
      className={`pc-frame-root transition-all duration-500 ${isActive ? 'scale-105 z-10' : 'scale-95 opacity-70'}`}
    >
      {/* Bande haute (comme la sangle haute de la montre) */}
      <div className="pc-strap pc-strap--top" />

      {/* BoÃ®tier central */}
      <div className="pc-frame">
        {/* Bouton latÃ©ral droit */}
        <div className="pc-side-btn">
          <div className="pc-side-btn__grooves" />
        </div>
        {/* Bouton power */}
        <div className="pc-power-btn" />

        {/* Ã‰cran â€” Affichage du prix comme les chiffres de la montre */}
        <div className="pc-screen">
          <div className="pc-screen__glow" />
          <div className="pc-score-display">
            {product.benchmarks?.gamingScore4k !== undefined ? (
              <>
                <span className="pc-score-label">SCORE 4K</span>
                <span className="pc-score-value">{product.benchmarks.gamingScore4k}</span>
                <span className="pc-score-unit">/100</span>
              </>
            ) : (
              <>
                <span className="pc-score-label">NOTE</span>
                <span className="pc-score-value">{Math.round(product.rating * 10)}</span>
                <span className="pc-score-unit">/50</span>
              </>
            )}
          </div>
          {/* Ligne de prix */}
          <div className="pc-price-line">
            {product.compareAtPrice && (
              <span className="pc-price-old">
                {product.compareAtPrice.toLocaleString('fr-FR')} â‚¬
              </span>
            )}
            <span className="pc-price-current">
              {product.price.toLocaleString('fr-FR')} â‚¬
            </span>
          </div>
        </div>

        {/* Dots dÃ©co en bas (comme les dots de la sangle basse) */}
        <div className="pc-dots">
          <span className="pc-dot" />
          <span className="pc-dot" />
          <span className="pc-dot" />
        </div>
      </div>

      {/* Bande basse */}
      <div className="pc-strap pc-strap--bottom" />
    </div>
  )
}

export function OrdinateursSection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  /* Auto-rotation toutes les 3s */
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ordinateurs.length)
    }, 3000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const active = ordinateurs[activeIdx]

  return (
    <section id="ordinateurs" className="relative overflow-hidden bg-[#080c12] py-24">
      {/* Lueur radiale de fond */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.25) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* â”€â”€ En-tÃªte â”€â”€ */}
        <Reveal>
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="text-xs uppercase tracking-widest font-bold text-sky-400 mb-2">
                Gamme ComplÃ¨te
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Nos <span className="text-gradient-blue">Ordinateurs</span>
              </h2>
              <p className="text-sm text-zinc-400 mt-3 max-w-md leading-relaxed">
                De la tour gaming RTX 5090 Ã  la station de travail IA â€” chaque machine est assemblÃ©e et testÃ©e 72h en France.
              </p>
            </div>
            <Link
              href="/produits?cat=ordinateurs"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold hover:bg-white/10 hover:border-sky-400/40 transition-all group"
            >
              Voir tout
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>

        {/* â”€â”€ Grille principale : Frames Ã  gauche + DÃ©tails Ã  droite â”€â”€ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Colonne gauche : les 4 frames "Ã©cran PC" */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {ordinateurs.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setActiveIdx(idx)
                  if (intervalRef.current) clearInterval(intervalRef.current)
                }}
                aria-label={`SÃ©lectionner ${p.name}`}
                className="focus:outline-none"
              >
                <PCFrame product={p} isActive={idx === activeIdx} />
              </button>
            ))}
          </div>

          {/* Colonne droite : DÃ©tails du produit actif */}
          <div key={active.id} className="space-y-6 animate-fadeInRight">
            {/* Badge */}
            {active.badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-400/15 border border-sky-400/30 text-sky-300 text-xs font-bold">
                <Zap className="w-3.5 h-3.5" />
                {active.badge}
              </span>
            )}

            {/* Titre & Tagline */}
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-1">{active.brand}</p>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">{active.name}</h3>
              <p className="text-sky-400 font-medium mt-1 text-sm">{active.tagline}</p>
            </div>

            {/* Description */}
            <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">{active.description}</p>

            {/* Specs rapides */}
            <div className="grid grid-cols-2 gap-3">
              {active.specifications.cpu && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-white/4 border border-white/8">
                  <Cpu className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold mb-0.5">Processeur</p>
                    <p className="text-xs text-zinc-200 leading-tight">{active.specifications.cpu.split('(')[0].trim()}</p>
                  </div>
                </div>
              )}
              {active.specifications.gpu && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-white/4 border border-white/8">
                  <Zap className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold mb-0.5">Carte Graphique</p>
                    <p className="text-xs text-zinc-200 leading-tight">{active.specifications.gpu.split('(')[0].trim()}</p>
                  </div>
                </div>
              )}
              {active.specifications.ram && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-white/4 border border-white/8">
                  <Zap className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold mb-0.5">MÃ©moire Vive</p>
                    <p className="text-xs text-zinc-200 leading-tight">{active.specifications.ram.split('(')[0].trim()}</p>
                  </div>
                </div>
              )}
              {active.specifications.storage && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-white/4 border border-white/8">
                  <Zap className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold mb-0.5">Stockage</p>
                    <p className="text-xs text-zinc-200 leading-tight">{active.specifications.storage.split('(')[0].trim()}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Notation */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(active.rating) ? 'text-amber-400 fill-amber-400' : 'text-zinc-700'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-white">{active.rating.toFixed(1)}</span>
              <span className="text-xs text-zinc-500">({active.reviewCount} avis)</span>
            </div>

            {/* Prix & CTA */}
            <div className="flex items-center gap-4">
              <div>
                {active.compareAtPrice && (
                  <p className="text-xs text-zinc-500 line-through">{active.compareAtPrice.toLocaleString('fr-FR')} â‚¬</p>
                )}
                <p className="text-2xl font-black text-white">{active.price.toLocaleString('fr-FR')} â‚¬</p>
              </div>
              <Link
                href={`/produits/${active.slug}`}
                className="flex-1 py-3 px-6 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-bold text-center transition-all hover:shadow-[0_0_24px_rgba(56,189,248,0.4)] active:scale-95"
              >
                Voir le produit
              </Link>
            </div>

            {/* Tabs de navigation rapide */}
            <div className="flex items-center gap-2 pt-2">
              {ordinateurs.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIdx(idx)
                    if (intervalRef.current) clearInterval(intervalRef.current)
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIdx ? 'w-8 bg-sky-400' : 'w-3 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                  aria-label={`Voir ordinateur ${idx + 1}`}
                />
              ))}
              <span className="ml-auto text-xs text-zinc-600">{activeIdx + 1} / {ordinateurs.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* â”€â”€ Styles CSS du PC Frame (style montre UIverse adaptÃ©) â”€â”€ */}
      <style jsx>{`
        /* â”€â”€â”€ ROOT â”€â”€â”€ */
        .pc-frame-root {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
        }

        /* â”€â”€â”€ STRAPS (sangles haut/bas adaptÃ©es en "ventilation") â”€â”€â”€ */
        .pc-strap {
          width: 6rem;
          height: 80px;
          background: radial-gradient(circle at 160px, rgb(0, 0, 0), rgb(30, 38, 50));
          position: relative;
          left: 50%;
          transform: translate(-50%, 0%);
        }
        .pc-strap--top {
          box-shadow: inset 0px -8px 14px rgba(56, 189, 248, 0.3), 6px 0px 20px #00000071;
          border-radius: 6px 6px 0 0;
        }
        .pc-strap--bottom {
          box-shadow: inset 0px 8px 14px rgba(56, 189, 248, 0.3), 6px 0px 20px #00000071;
          border-radius: 0 0 6px 6px;
        }

        /* â”€â”€â”€ CHÃ‚SSIS / BOÃŽTIER â”€â”€â”€ */
        .pc-frame {
          background: #0d1117;
          border-radius: 28px;
          box-shadow:
            inset 0 0 24px 1px #0d1117,
            inset 0 0 0 8px #38bdf8,
            0 20px 40px #00000090,
            0 0 0 2px #1e2938;
          height: 200px;
          width: 130px;
          padding: 16px 14px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        /* Reflet interne (glass effect) */
        .pc-frame::before {
          border: 1px solid #0d1117;
          border-radius: 22px;
          box-shadow:
            0 0 10px rgba(56, 189, 248, 0.4),
            inset 0 0 10px 1px rgba(56, 189, 248, 0.2);
          content: '';
          height: 188px;
          left: 7px;
          position: absolute;
          top: 7px;
          width: 116px;
        }

        /* â”€â”€â”€ BOUTON LATÃ‰RAL (style montre) â”€â”€â”€ */
        .pc-side-btn {
          background: #38bdf8;
          border-left: 1px solid #000;
          border-radius: 4px 3px 3px 4px / 10px 3px 3px 10px;
          box-shadow: inset 4px 0 6px 0 #0c3352, inset -1px 0 4px #1e6a96, -2px 0 6px #0d0d0d40;
          height: 44px;
          position: absolute;
          right: 3px;
          top: 60px;
          width: 10px;
          z-index: 9;
        }
        .pc-side-btn__grooves {
          background: #1e6a96;
          border-radius: 20%;
          box-shadow:
            0 -16px rgba(30, 106, 150, 0.75), 0 -14px #1e6a96, 0 -12px #000,
            0 -8px rgba(30, 106, 150, 0.75), 0 -6px #1e6a96, 0 -4px #000,
            0 0px rgba(30, 106, 150, 0.75), 0 2px #1e6a96, 0 4px #000,
            0 8px rgba(30, 106, 150, 0.75), 0 10px #1e6a96, 0 12px #000;
          content: '';
          height: 2px;
          position: absolute;
          right: 1px;
          top: 50%;
          width: 6px;
          margin-top: -1px;
        }

        /* â”€â”€â”€ BOUTON POWER â”€â”€â”€ */
        .pc-power-btn {
          background: #1e2938;
          border-radius: 1px 2px 2px 1px / 1px 4px 4px 1px;
          box-shadow: inset 0 0 1px 1px #080c12;
          height: 38px;
          position: absolute;
          right: 10px;
          top: 110px;
          width: 3px;
        }

        /* â”€â”€â”€ Ã‰CRAN â”€â”€â”€ */
        .pc-screen {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          width: 100%;
        }

        .pc-screen__glow {
          position: absolute;
          inset: -20px;
          background: radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        /* Score principal (analogue aux chiffres de la montre) */
        .pc-score-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1;
        }
        .pc-score-label {
          font-family: monospace;
          font-size: 7px;
          font-weight: 700;
          color: #38bdf8;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        .pc-score-value {
          font-family: serif;
          font-size: 3.2rem;
          font-weight: 900;
          line-height: 0.85;
          color: #d8f3ff;
          text-shadow: 0 0 24px rgba(56, 189, 248, 0.8);
        }
        .pc-score-unit {
          font-size: 8px;
          color: #38bdf8;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-top: 2px;
        }

        /* Prix en bas de l'Ã©cran */
        .pc-price-line {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 6px;
        }
        .pc-price-old {
          font-size: 8px;
          text-decoration: line-through;
          color: #4b5563;
          font-family: monospace;
        }
        .pc-price-current {
          font-size: 10px;
          font-weight: 800;
          color: #38bdf8;
          font-family: monospace;
        }

        /* â”€â”€â”€ DOTS (dÃ©coratifs, bas du frame) â”€â”€â”€ */
        .pc-dots {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 5px;
          z-index: 10;
        }
        .pc-dot {
          width: 5px;
          height: 5px;
          background-color: #1e2938;
          border-radius: 100px;
          display: block;
          box-shadow: inset 1px 0 3px rgba(56, 189, 248, 0.3);
        }

        /* â”€â”€â”€ ANIMATION ENTRÃ‰E DROITE â”€â”€â”€ */
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.4s ease-out both;
        }

        /* â”€â”€â”€ GRADIENT TEXTE â”€â”€â”€ */
        .text-gradient-blue {
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  )
}
