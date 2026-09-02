'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Search, X, Cpu, ArrowUpRight } from 'lucide-react'
import { PRODUCTS } from '@/data/products'
import { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/lib/context/cart-context'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>(PRODUCTS.slice(0, 4))
  const inputRef = useRef<HTMLInputElement>(null)
  const { addToCart } = useCart()

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [isOpen])

  // Handle keyboard shortcut Escape and Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else {
          // Open search handled by parent
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!query.trim()) {
      setResults(PRODUCTS.slice(0, 4))
      return
    }

    const q = query.toLowerCase()
    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.specifications.cpu?.toLowerCase().includes(q) ||
        p.specifications.gpu?.toLowerCase().includes(q)
    )
    setResults(filtered)
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-zinc-100 gap-3">
          <Search className="w-5 h-5 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un modèle, processeur (Ryzen 9800X3D), RTX 5090..."
            className="w-full text-sm sm:text-base outline-none text-zinc-900 placeholder:text-zinc-400 bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-zinc-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-zinc-400 bg-zinc-100 rounded-md border border-zinc-200">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 px-3 py-1">
            {query.trim() ? `Résultats (${results.length})` : 'Configurations Suggérées'}
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 text-sm">
              Aucun résultat correspondant pour &ldquo;{query}&rdquo;.
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-zinc-50 transition-colors border border-transparent hover:border-zinc-200/80 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-14 h-14 rounded-xl bg-zinc-100 overflow-hidden flex-shrink-0">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-900 truncate">
                        {product.name}
                      </span>
                      {product.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 truncate mt-0.5">
                      {product.specifications.cpu} • {product.specifications.gpu}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                  <span className="text-xs font-bold text-zinc-950">
                    {formatPrice(product.price)}
                  </span>
                  <button
                    onClick={() => {
                      addToCart(product)
                      onClose()
                    }}
                    className="p-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
                    title="Ajouter"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Filter Tags Footer */}
        <div className="px-5 py-3 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-zinc-400" />
            <span>Filtres populaires :</span>
            <button
              onClick={() => setQuery('5090')}
              className="px-2 py-0.5 rounded bg-zinc-200/60 text-zinc-800 hover:bg-zinc-200"
            >
              RTX 5090
            </button>
            <button
              onClick={() => setQuery('9800X3D')}
              className="px-2 py-0.5 rounded bg-zinc-200/60 text-zinc-800 hover:bg-zinc-200"
            >
              9800X3D
            </button>
            <button
              onClick={() => setQuery('Laptop')}
              className="px-2 py-0.5 rounded bg-zinc-200/60 text-zinc-800 hover:bg-zinc-200"
            >
              Laptops
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
