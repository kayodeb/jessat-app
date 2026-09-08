'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types/product'
import { CategoryItem } from '@/types/category'
import { Promotion, StockMovement, AdminUser } from '@/types/admin'
import { PRODUCTS } from '@/data/products'
import { CATEGORIES } from '@/data/categories'

const INITIAL_PROMOTIONS: Promotion[] = [
  {
    id: 'promo-1',
    code: 'WELCOME10',
    description: '10% de réduction sur la première commande',
    discountType: 'percentage',
    discountValue: 10,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    minPurchase: 50,
    usageLimit: 500,
    usageCount: 124,
    isActive: true,
    targetCategory: 'all',
  },
  {
    id: 'promo-2',
    code: 'GAMING50',
    description: '50€ de réduction sur les Ordinateurs',
    discountType: 'fixed',
    discountValue: 50,
    startDate: '2026-08-01',
    endDate: '2026-09-30',
    minPurchase: 1000,
    usageLimit: 100,
    usageCount: 42,
    isActive: true,
    targetCategory: 'ordinateurs',
  },
]

const INITIAL_MOVEMENTS: StockMovement[] = [
  {
    id: 'mov-1',
    productId: 'apex-one-extreme',
    productName: 'AERO APEX ONE EXTREME',
    changeQuantity: 10,
    type: 'RESTOCK',
    reason: 'Livraison fournisseur #INV-8892',
    createdAt: '2026-09-07T10:30:00Z',
  },
  {
    id: 'mov-2',
    productId: 'phantom-pro-5080',
    productName: 'PHANTOM PRO STEALTH',
    changeQuantity: -1,
    type: 'SALE',
    reason: 'Vente Commande #CMD-1049',
    createdAt: '2026-09-08T09:15:00Z',
  },
]

const INITIAL_USERS: AdminUser[] = [
  {
    id: 'usr-1',
    name: 'Alexandre Dubois',
    email: 'alex.admin@jessat.com',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    createdAt: '2025-10-12T14:00:00Z',
    lastLogin: '2026-09-08T12:45:00Z',
  },
  {
    id: 'usr-2',
    name: 'Sarah Connor',
    email: 'sarah.manager@jessat.com',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: '2026-02-01T09:30:00Z',
    lastLogin: '2026-09-07T16:20:00Z',
  },
  {
    id: 'usr-3',
    name: 'Jean Dupont',
    email: 'jean.dupont@gmail.com',
    role: 'USER',
    status: 'ACTIVE',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    ordersCount: 4,
    totalSpent: 4250,
    createdAt: '2026-04-15T11:00:00Z',
    lastLogin: '2026-09-06T18:10:00Z',
  },
  {
    id: 'usr-4',
    name: 'Marie Curie',
    email: 'marie.client@gmail.com',
    role: 'USER',
    status: 'SUSPENDED',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    ordersCount: 1,
    totalSpent: 299,
    createdAt: '2026-05-20T16:40:00Z',
  },
]

export function useAdminStore() {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jessat_admin_products')
      if (saved) {
        try { return JSON.parse(saved) } catch (e) {}
      }
    }
    return PRODUCTS
  })

  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jessat_admin_categories')
      if (saved) {
        try { return JSON.parse(saved) } catch (e) {}
      }
    }
    return CATEGORIES
  })

  const [promotions, setPromotions] = useState<Promotion[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jessat_admin_promotions')
      if (saved) {
        try { return JSON.parse(saved) } catch (e) {}
      }
    }
    return INITIAL_PROMOTIONS
  })

  const [movements, setMovements] = useState<StockMovement[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jessat_admin_movements')
      if (saved) {
        try { return JSON.parse(saved) } catch (e) {}
      }
    }
    return INITIAL_MOVEMENTS
  })

  const [users, setUsers] = useState<AdminUser[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jessat_admin_users')
      if (saved) {
        try { return JSON.parse(saved) } catch (e) {}
      }
    }
    return INITIAL_USERS
  })

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jessat_admin_products', JSON.stringify(products))
    }
  }, [products])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jessat_admin_categories', JSON.stringify(categories))
    }
  }, [categories])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jessat_admin_promotions', JSON.stringify(promotions))
    }
  }, [promotions])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jessat_admin_movements', JSON.stringify(movements))
    }
  }, [movements])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jessat_admin_users', JSON.stringify(users))
    }
  }, [users])

  // Actions Produits
  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`
    const product: Product = { ...newProduct, id }
    setProducts((prev) => [product, ...prev])
    return product
  }

  const updateProduct = (id: string, updatedData: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    )
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  // Actions Stock
  const adjustStock = (productId: string, delta: number, reason: string) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    const newStock = Math.max(0, product.stockCount + delta)
    updateProduct(productId, {
      stockCount: newStock,
      inStock: newStock > 0,
    })

    const newMovement: StockMovement = {
      id: `mov-${Date.now()}`,
      productId,
      productName: product.name,
      changeQuantity: delta,
      type: delta > 0 ? 'RESTOCK' : 'ADJUSTMENT',
      reason,
      createdAt: new Date().toISOString(),
    }
    setMovements((prev) => [newMovement, ...prev])
  }

  // Actions Catégories
  const addCategory = (newCat: Omit<CategoryItem, 'id'>) => {
    const id = `cat-${Date.now()}`
    const cat: CategoryItem = { ...newCat, id }
    setCategories((prev) => [...prev, cat])
  }

  const updateCategory = (id: string, updatedData: Partial<CategoryItem>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
    )
  }

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  // Actions Promotions
  const addPromotion = (newPromo: Omit<Promotion, 'id' | 'usageCount'>) => {
    const id = `promo-${Date.now()}`
    const promo: Promotion = { ...newPromo, id, usageCount: 0 }
    setPromotions((prev) => [promo, ...prev])
  }

  const updatePromotion = (id: string, updatedData: Partial<Promotion>) => {
    setPromotions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    )
  }

  const deletePromotion = (id: string) => {
    setPromotions((prev) => prev.filter((p) => p.id !== id))
  }

  // Actions Utilisateurs
  const updateUserRole = (id: string, role: AdminUser['role']) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role } : u))
    )
  }

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' }
          : u
      )
    )
  }

  const addUser = (newUser: Omit<AdminUser, 'id' | 'createdAt'>) => {
    const id = `usr-${Date.now()}`
    const u: AdminUser = {
      ...newUser,
      id,
      createdAt: new Date().toISOString(),
    }
    setUsers((prev) => [...prev, u])
  }

  return {
    products,
    categories,
    promotions,
    movements,
    users,
    addProduct,
    updateProduct,
    deleteProduct,
    adjustStock,
    addCategory,
    updateCategory,
    deleteCategory,
    addPromotion,
    updatePromotion,
    deletePromotion,
    updateUserRole,
    toggleUserStatus,
    addUser,
  }
}
