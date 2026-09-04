'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { CartItem } from '@/types/cart'
import { Product } from '@/types/product'

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  totalItems: number
  subtotal: number
  justAddedId: string | null
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addToCart: (
    product: Product,
    quantity?: number,
    selectedOptions?: Record<string, string>,
    customConfigurationTotal?: number
  ) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [justAddedId, setJustAddedId] = useState<string | null>(null)

  // Initialize with 1 default demo item to give immediate high-end feel
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aero_cart_items')
      if (saved) {
        setItems(JSON.parse(saved))
      } else {
        // Preload default demo item
        setItems([
          {
            id: 'cart-init-1',
            product: {
              id: 'apex-one-extreme',
              name: 'AERO APEX ONE EXTREME',
              slug: 'aero-apex-one-extreme',
              brand: 'AERO RIGS',
              tagline: 'Lapogée de larchitecture gaming 4K Ultra.',
              description: '',
              price: 3899,
              rating: 4.9,
              reviewCount: 148,
              category: 'ordinateurs',
              images: ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80'],
              specifications: {
                cpu: 'Ryzen 7 9800X3D',
                gpu: 'RTX 5090 24GB',
                ram: '64 GB DDR5',
                storage: '2 TB PCIe 5.0',
              },
              inStock: true,
              stockCount: 6,
            },
            quantity: 1,
          },
        ])
      }
    } catch {
      // ignore SSR
    }
  }, [])

  // Sync to local storage
  useEffect(() => {
    try {
      if (items.length > 0) {
        localStorage.setItem('aero_cart_items', JSON.stringify(items))
      }
    } catch {
      // ignore
    }
  }, [items])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  
  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.customConfigurationTotal ?? item.product.price
    return sum + itemPrice * item.quantity
  }, 0)

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  const toggleCart = () => setIsOpen((prev) => !prev)

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedOptions?: Record<string, string>,
    customConfigurationTotal?: number
  ) => {
    const itemId = `${product.id}-${selectedOptions ? JSON.stringify(selectedOptions) : 'std'}`
    
    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId)
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          quantity,
          selectedOptions,
          customConfigurationTotal,
        },
      ]
    })

    // Feedback trigger
    setJustAddedId(product.id)
    setTimeout(() => {
      setJustAddedId(null)
    }, 2200)

    // Open drawer gently
    setIsOpen(true)
  }

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setItems([])
    try {
      localStorage.removeItem('aero_cart_items')
    } catch {
      // ignore
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        totalItems,
        subtotal,
        justAddedId,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
