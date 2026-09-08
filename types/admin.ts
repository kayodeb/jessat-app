import { ProductCategory } from './product'

export interface Promotion {
  id: string
  code: string
  description: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  startDate: string
  endDate: string
  minPurchase: number
  usageLimit: number
  usageCount: number
  isActive: boolean
  targetCategory?: ProductCategory | 'all'
}

export type StockMovementType = 'RESTOCK' | 'SALE' | 'ADJUSTMENT' | 'RETURN'

export interface StockMovement {
  id: string
  productId: string
  productName: string
  changeQuantity: number
  type: StockMovementType
  reason: string
  createdAt: string
}

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'USER'
export type UserStatus = 'ACTIVE' | 'SUSPENDED'

export interface AdminUser {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  avatar?: string
  ordersCount?: number
  totalSpent?: number
  createdAt: string
  lastLogin?: string
}
