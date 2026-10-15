'use client'

import { useState, useEffect, useCallback } from 'react'
import { Product } from '@/types/product'
import { CategoryItem } from '@/types/category'
import { Promotion, StockMovement, AdminUser, UserRole, UserStatus } from '@/types/admin'
import { api } from '@/lib/api'

export interface AdminStats {
  totalOrders: number
  totalUsers: number
  totalProducts: number
  totalRevenue: number
  pendingOrders: number
  lowStockProducts: number
}

// ── Shared Singleton State (No dummy data, populated directly from backend) ──
let globalProducts: Product[] = []
let globalCategories: CategoryItem[] = []
let globalPromotions: Promotion[] = []
let globalMovements: StockMovement[] = []
let globalUsers: AdminUser[] = []
let globalOrders: any[] = []
let globalStats: AdminStats | null = null
let globalIsLoading = false
let globalIsConnected = false

const listeners = new Set<() => void>()

function notifyListeners() {
  listeners.forEach((listener) => listener())
}

// Helper to save current state to localStorage as cache
function persistLocal() {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('jessat_admin_products', JSON.stringify(globalProducts))
    localStorage.setItem('jessat_admin_categories', JSON.stringify(globalCategories))
    localStorage.setItem('jessat_admin_promotions', JSON.stringify(globalPromotions))
    localStorage.setItem('jessat_admin_movements', JSON.stringify(globalMovements))
    localStorage.setItem('jessat_admin_users', JSON.stringify(globalUsers))
  } catch {}
}

// Helper to hydrate from localStorage, filtering out old dummy mock entries
function hydrateLocal() {
  if (typeof window === 'undefined') return
  try {
    const p = localStorage.getItem('jessat_admin_products')
    if (p) {
      const parsed: Product[] = JSON.parse(p)
      // Discard old mock products if any
      const cleaned = parsed.filter((item) => item.id !== 'apex-one-extreme' && !item.id.startsWith('phantom-pro'))
      if (cleaned.length > 0) globalProducts = cleaned
    }
    const c = localStorage.getItem('jessat_admin_categories')
    if (c) {
      globalCategories = JSON.parse(c)
    }
    const pr = localStorage.getItem('jessat_admin_promotions')
    if (pr) {
      const parsed: Promotion[] = JSON.parse(pr)
      const cleaned = parsed.filter((item) => item.id !== 'promo-1' && item.id !== 'promo-2')
      if (cleaned.length > 0) globalPromotions = cleaned
    }
    const m = localStorage.getItem('jessat_admin_movements')
    if (m) {
      const parsed: any = JSON.parse(m)
      if (Array.isArray(parsed)) {
        const cleaned: StockMovement[] = parsed
          .filter((item) => item && typeof item === 'object' && item.id && item.id !== 'mov-1' && item.id !== 'mov-2')
          .map((item, idx) => ({
            ...item,
            id: item.id || `mov-local-${idx}`,
            changeQuantity: Number(item.changeQuantity) || 0,
          }))
        if (cleaned.length > 0) globalMovements = cleaned
      }
    }
    const u = localStorage.getItem('jessat_admin_users')
    if (u) {
      const parsed: AdminUser[] = JSON.parse(u)
      const cleaned = parsed.filter((item) => item.id !== 'usr-1' && item.id !== 'usr-2')
      if (cleaned.length > 0) globalUsers = cleaned
    }
  } catch {}
}

if (typeof window !== 'undefined') {
  hydrateLocal()
}

// Central Fetcher connecting directly to NestJS backend routes
let isFetchingPromise: Promise<void> | null = null

async function syncWithBackend(): Promise<void> {
  if (isFetchingPromise) return isFetchingPromise

  isFetchingPromise = (async () => {
    globalIsLoading = true
    notifyListeners()

    try {
      // 1. Fetch Categories
      try {
        const remoteCats = await api.categories.getAll()
        if (remoteCats && remoteCats.length > 0) {
          globalCategories = remoteCats
        }
      } catch (e) {
        console.warn('Backend categories sync:', e)
      }

      // 2. Fetch Products
      try {
        const remoteProds = await api.products.getAll({ limit: 100 })
        if (remoteProds && remoteProds.length > 0) {
          globalProducts = remoteProds
        }
      } catch (e) {
        console.warn('Backend products sync:', e)
      }

      // 3. Fetch Promotions
      try {
        const remotePromos = await api.promotions.getAll()
        if (remotePromos && remotePromos.length > 0) {
          globalPromotions = remotePromos
        }
      } catch (e) {
        console.warn('Backend promotions sync:', e)
      }

      // 4. Fetch Stock Movements
      try {
        const remoteMovements = await api.stock.getMovements({ limit: 50 })
        if (remoteMovements && remoteMovements.length > 0) {
          globalMovements = remoteMovements
        }
      } catch (e) {
        console.warn('Backend stock movements sync:', e)
      }

      // 5. Fetch Users (Admin protected)
      try {
        const remoteUsers = await api.admin.getAllUsers({ limit: 50 })
        if (remoteUsers && remoteUsers.length > 0) {
          globalUsers = remoteUsers
        }
      } catch (e) {
        console.warn('Backend users sync:', e)
      }

      // 6. Fetch Orders (Admin protected)
      try {
        const remoteOrders = await api.admin.getAllOrders({ limit: 50 })
        const orderList = Array.isArray(remoteOrders) ? remoteOrders : remoteOrders?.data || []
        if (orderList) {
          globalOrders = orderList
        }
      } catch (e) {
        console.warn('Backend orders sync:', e)
      }

      // 7. Fetch Dashboard Stats (Admin protected)
      try {
        const remoteStats = await api.admin.getDashboardStats()
        if (remoteStats) {
          globalStats = remoteStats
        }
      } catch (e) {
        console.warn('Backend dashboard stats sync:', e)
      }

      globalIsConnected = true
      persistLocal()
    } finally {
      globalIsLoading = false
      isFetchingPromise = null
      notifyListeners()
    }
  })()

  return isFetchingPromise
}

export function useAdminStore() {
  const [, setTick] = useState(0)

  useEffect(() => {
    const handleChange = () => setTick((t) => t + 1)
    listeners.add(handleChange)

    // Sync on initial mount
    syncWithBackend()

    return () => {
      listeners.delete(handleChange)
    }
  }, [])

  // ── Actions Produits ──
  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    // Generate optimistic product
    const tempId = `prod-${Date.now()}`
    const optimisticProd: Product = { ...newProduct, id: tempId }
    globalProducts = [optimisticProd, ...globalProducts]
    notifyListeners()

    try {
      // Find category id if available
      const matchingCat = globalCategories.find(
        (c) => c.slug === newProduct.category || c.name.toLowerCase() === newProduct.category.toLowerCase()
      )
      const categoryId = matchingCat ? matchingCat.id : (globalCategories[0]?.id || 'cat-general')

      const savedProd = await api.products.create({
        name: newProduct.name,
        slug: newProduct.slug || newProduct.name.toLowerCase().replace(/\s+/g, '-'),
        brand: newProduct.brand || 'AERO',
        tagline: newProduct.tagline || '',
        description: newProduct.description || '',
        price: Number(newProduct.price),
        compareAtPrice: newProduct.compareAtPrice ? Number(newProduct.compareAtPrice) : undefined,
        badge: newProduct.badge,
        isNew: newProduct.isNew,
        isBestseller: newProduct.isBestseller,
        inStock: newProduct.inStock ?? true,
        stockCount: Number(newProduct.stockCount) || 0,
        featured: newProduct.featured,
        condition: newProduct.condition,
        specifications: newProduct.specifications || {},
        benchmarks: newProduct.benchmarks,
        colorVariants: newProduct.colorVariants,
        images: newProduct.images || [],
        categoryId,
      })

      // Replace optimistic item with backend response
      globalProducts = globalProducts.map((p) => (p.id === tempId ? savedProd : p))
      persistLocal()
      notifyListeners()
      return savedProd
    } catch (err) {
      console.error('Failed to create product in backend:', err)
      persistLocal()
      return optimisticProd
    }
  }

  const updateProduct = async (id: string, updatedData: Partial<Product>) => {
    globalProducts = globalProducts.map((p) =>
      p.id === id ? { ...p, ...updatedData } : p
    )
    notifyListeners()
    persistLocal()

    try {
      await api.products.update(id, updatedData)
    } catch (err) {
      console.error('Failed to update product in backend:', err)
    }
  }

  const deleteProduct = async (id: string) => {
    globalProducts = globalProducts.filter((p) => p.id !== id)
    notifyListeners()
    persistLocal()

    try {
      await api.products.delete(id)
    } catch (err) {
      console.error('Failed to delete product in backend:', err)
    }
  }

  // ── Actions Stock ──
  const adjustStock = async (productId: string, delta: number, reason: string) => {
    const product = globalProducts.find((p) => p.id === productId)
    if (!product) return

    const newStock = Math.max(0, product.stockCount + delta)
    const newMovement: StockMovement = {
      id: `mov-${Date.now()}`,
      productId,
      productName: product.name,
      changeQuantity: delta,
      type: delta > 0 ? 'RESTOCK' : 'ADJUSTMENT',
      reason,
      createdAt: new Date().toISOString(),
    }

    globalProducts = globalProducts.map((p) =>
      p.id === productId ? { ...p, stockCount: newStock, inStock: newStock > 0 } : p
    )
    globalMovements = [newMovement, ...globalMovements]
    notifyListeners()
    persistLocal()

    try {
      await Promise.all([
        api.products.update(productId, { stockCount: newStock, inStock: newStock > 0 }),
        api.stock.recordMovement({
          productId,
          changeQuantity: delta,
          type: delta > 0 ? 'RESTOCK' : 'ADJUSTMENT',
          reason,
        }),
      ])
    } catch (err) {
      console.error('Failed to record stock movement in backend:', err)
    }
  }

  // ── Actions Catégories ──
  const addCategory = async (newCat: Omit<CategoryItem, 'id'>) => {
    const tempId = `cat-${Date.now()}`
    const optimisticCat: CategoryItem = { ...newCat, id: tempId }
    globalCategories = [...globalCategories, optimisticCat]
    notifyListeners()

    try {
      const savedCat = await api.categories.create(newCat)
      globalCategories = globalCategories.map((c) => (c.id === tempId ? savedCat : c))
      persistLocal()
      notifyListeners()
      return savedCat
    } catch (err) {
      console.error('Failed to create category in backend:', err)
      persistLocal()
      return optimisticCat
    }
  }

  const updateCategory = async (id: string, updatedData: Partial<CategoryItem>) => {
    globalCategories = globalCategories.map((c) =>
      c.id === id ? { ...c, ...updatedData } : c
    )
    notifyListeners()
    persistLocal()

    try {
      await api.categories.update(id, updatedData)
    } catch (err) {
      console.error('Failed to update category in backend:', err)
    }
  }

  const deleteCategory = async (id: string) => {
    globalCategories = globalCategories.filter((c) => c.id !== id)
    notifyListeners()
    persistLocal()

    try {
      await api.categories.delete(id)
    } catch (err) {
      console.error('Failed to delete category in backend:', err)
    }
  }

  // ── Actions Promotions ──
  const addPromotion = async (newPromo: Omit<Promotion, 'id' | 'usageCount'>) => {
    const tempId = `promo-${Date.now()}`
    const optimisticPromo: Promotion = { ...newPromo, id: tempId, usageCount: 0 }
    globalPromotions = [optimisticPromo, ...globalPromotions]
    notifyListeners()

    try {
      const savedPromo = await api.promotions.create(newPromo)
      globalPromotions = globalPromotions.map((p) => (p.id === tempId ? savedPromo : p))
      persistLocal()
      notifyListeners()
      return savedPromo
    } catch (err) {
      console.error('Failed to create promo in backend:', err)
      persistLocal()
      return optimisticPromo
    }
  }

  const updatePromotion = async (id: string, updatedData: Partial<Promotion>) => {
    globalPromotions = globalPromotions.map((p) =>
      p.id === id ? { ...p, ...updatedData } : p
    )
    notifyListeners()
    persistLocal()

    try {
      await api.promotions.update(id, updatedData)
    } catch (err) {
      console.error('Failed to update promo in backend:', err)
    }
  }

  const togglePromotion = async (id: string) => {
    globalPromotions = globalPromotions.map((p) =>
      p.id === id ? { ...p, isActive: !p.isActive } : p
    )
    notifyListeners()
    persistLocal()

    try {
      await api.promotions.toggle(id)
    } catch (err) {
      console.error('Failed to toggle promo in backend:', err)
    }
  }

  const deletePromotion = async (id: string) => {
    globalPromotions = globalPromotions.filter((p) => p.id !== id)
    notifyListeners()
    persistLocal()

    try {
      await api.promotions.delete(id)
    } catch (err) {
      console.error('Failed to delete promo in backend:', err)
    }
  }

  // ── Actions Utilisateurs ──
  const updateUserRole = async (id: string, role: UserRole) => {
    globalUsers = globalUsers.map((u) => (u.id === id ? { ...u, role } : u))
    notifyListeners()
    persistLocal()

    try {
      await api.admin.updateUserRole(id, role)
    } catch (err) {
      console.error('Failed to update user role in backend:', err)
    }
  }

  const toggleUserStatus = async (id: string) => {
    const user = globalUsers.find((u) => u.id === id)
    if (!user) return
    const newStatus: UserStatus = user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE'

    globalUsers = globalUsers.map((u) =>
      u.id === id ? { ...u, status: newStatus } : u
    )
    notifyListeners()
    persistLocal()

    try {
      await api.admin.updateUserStatus(id, newStatus)
    } catch (err) {
      console.error('Failed to update user status in backend:', err)
    }
  }

  const deleteUser = async (id: string) => {
    globalUsers = globalUsers.filter((u) => u.id !== id)
    notifyListeners()
    persistLocal()

    try {
      await api.admin.deleteUser(id)
    } catch (err) {
      console.error('Failed to delete user in backend:', err)
    }
  }

  const addUser = (newUser: Omit<AdminUser, 'id' | 'createdAt'>) => {
    const id = `usr-${Date.now()}`
    const u: AdminUser = {
      ...newUser,
      id,
      createdAt: new Date().toISOString(),
    }
    globalUsers = [u, ...globalUsers]
    notifyListeners()
    persistLocal()
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    globalOrders = globalOrders.map((o) => (o.id === orderId ? { ...o, status } : o))
    notifyListeners()

    try {
      await api.admin.updateOrderStatus(orderId, status)
    } catch (err) {
      console.error('Failed to update order status in backend:', err)
    }
  }

  const refreshAll = useCallback(() => {
    return syncWithBackend()
  }, [])

  return {
    products: globalProducts,
    categories: globalCategories,
    promotions: globalPromotions,
    movements: globalMovements,
    users: globalUsers,
    orders: globalOrders,
    stats: globalStats,
    isLoading: globalIsLoading,
    isConnected: globalIsConnected,
    refreshAll,
    addProduct,
    updateProduct,
    deleteProduct,
    adjustStock,
    addCategory,
    updateCategory,
    deleteCategory,
    addPromotion,
    updatePromotion,
    togglePromotion,
    deletePromotion,
    updateUserRole,
    toggleUserStatus,
    deleteUser,
    addUser,
    updateOrderStatus,
  }
}
