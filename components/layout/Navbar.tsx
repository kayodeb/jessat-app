'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Heart, ShoppingBag, Menu, X, Cpu, Sparkles, ChevronDown } from 'lucide-react'
import { useCart } from '@/lib/context/cart-context'
import { useWishlist } from '@/lib/context/wishlist-context'
import { animateBadgePop } from '@/lib/animations/utils'
import { cn } from '@/lib/utils'

interface NavbarProps {
  onOpenSearch: () => void
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems, toggleCart, justAddedId } = useCart()
  const { wishlistCount } = useWishlist()
  const badgeRef = React.useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animate badge when item added
  useEffect(() => {
    if (justAddedId && badgeRef.current) {
      animateBadgePop(badgeRef.current)
    }
  }, [justAddedId, totalItems])

  const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Catalogue', href: '/produits' },
    { label: 'PC Gaming', href: '/#products' },
    { label: 'PC Portables', href: '/#categories' },
    { label: 'Configurateur', href: '/#configurator', highlight: true },
    { label: 'Meilleures Ventes', href: '/#bestsellers' },
    { label: 'Vente Flash', href: '/#flashsale' },
  ]

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300 w-full',
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-zinc-200/80 shadow-sm py-3'
          : 'bg-white/95 backdrop-blur-md border-b border-transparent py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center text-white font-bold tracking-wider shadow-sm group-hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5 text-blue-400 group-hover:rotate-12 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-zinc-950 flex items-center gap-1.5">
              AERO <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 font-semibold uppercase tracking-wider">RIGS</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-600">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                'relative py-1 transition-colors hover:text-zinc-950',
                link.highlight
                  ? 'text-blue-600 font-semibold flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 hover:bg-blue-100/70'
                  : ''
              )}
            >
              {link.highlight && <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions (Search, Wishlist, Cart) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Search trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-2 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 rounded-xl transition-all text-xs font-medium border border-transparent hover:border-zinc-200"
            aria-label="Rechercher des configurations"
          >
            <Search className="w-4 h-4 text-zinc-700" />
            <span className="hidden sm:inline">Rechercher</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-zinc-100 border border-zinc-200 rounded text-zinc-500">
              ⌘K
            </kbd>
          </button>

          {/* Wishlist button */}
          <button
            onClick={() => {
              const el = document.getElementById('products')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="relative p-2 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-xl transition-colors"
            aria-label="Voir la liste d'envies"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart button */}
          <button
            onClick={toggleCart}
            className="relative flex items-center gap-2 bg-zinc-950 text-white px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-zinc-800 transition-all shadow-sm active:scale-95"
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Panier</span>
            <span
              ref={badgeRef}
              className="px-1.5 py-0.5 rounded-full bg-blue-500 text-white text-[11px] font-bold min-w-[20px] text-center"
            >
              {totalItems}
            </span>
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-xl"
            aria-label="Menu mobile"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white border-b border-zinc-200 p-5 shadow-2xl space-y-3 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  link.highlight
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-zinc-800 hover:bg-zinc-100'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
            <span>Support 24/7 : 01 80 90 44 20</span>
            <span className="text-emerald-600 font-medium">Boutique en ligne active</span>
          </div>
        </div>
      )}
    </header>
  )
}
