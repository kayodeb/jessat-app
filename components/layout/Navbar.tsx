'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Heart, ShoppingBag, Menu, X, Cpu, Sparkles } from 'lucide-react'
import { useCart } from '@/lib/context/cart-context'
import { useWishlist } from '@/lib/context/wishlist-context'
import { animateBadgePop } from '@/lib/animations/utils'
import { cn } from '@/lib/utils'
import { CategoryBar } from '@/components/layout/CategoryBar'

interface NavbarProps {
  onOpenSearch: () => void
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  const pathname = usePathname()
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
    { label: 'Ordinateurs', href: '/#products' },
    { label: 'Accessoires', href: '/#categories' },
    { label: 'Configurateur', href: '/#configurator', highlight: true },
    { label: 'Promotions', href: '/promotions' },
    { label: 'Contact', href: '/contact' },
  ]

  const isLinkActive = (href: string) => {
    if (!pathname) return false
    if (href === '/') return pathname === '/'
    if (href.startsWith('/#')) return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      <div
        className={cn(
          'transition-all duration-300 w-full',
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl py-3 border-b border-zinc-200/80'
            : 'bg-white py-3.5 border-b border-zinc-200/60'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold tracking-wider shadow-md shadow-blue-200 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-blue-700 leading-none">Jessat</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Multiservices</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-xs font-semibold">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href)
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'relative px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5',
                    active
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                      : link.highlight
                      ? 'text-blue-600 bg-blue-50 border border-blue-200/60 hover:bg-blue-100/70 font-semibold'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                  )}
                >
                  {link.highlight && !active && <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />}
                  {link.label}
                </Link>
              )
            })}
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
            <Link
              href="/wishlist"
              className={cn(
                'relative p-2 rounded-xl transition-colors',
                pathname?.startsWith('/wishlist')
                  ? 'bg-rose-50 text-rose-600 border border-rose-200'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              )}
              aria-label="Voir la liste d'envies"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart button */}
            <button
              onClick={toggleCart}
              className={cn(
                'relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95',
                pathname?.startsWith('/panier') || pathname?.startsWith('/checkout')
                  ? 'bg-blue-600 text-white shadow-blue-500/25 ring-2 ring-blue-600/30'
                  : 'bg-zinc-950 text-white hover:bg-zinc-800'
              )}
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
      </div>

      {/* Category Navigation Bar directly below the header */}
      <CategoryBar />

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white border-b border-zinc-200 p-5 shadow-2xl space-y-3 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href)
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all',
                    active
                      ? 'bg-blue-600 text-white shadow-sm'
                      : link.highlight
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-zinc-800 hover:bg-zinc-100'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
            <span>WhatsApp : +229 97 64 07 58</span>
            <span className="text-emerald-600 font-medium">Calavi, Bénin</span>
          </div>
        </div>
      )}
    </header>
  )
}
