import { Product } from './product'

export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedOptions?: Record<string, string>
  customConfigurationTotal?: number
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
  totalItems: number
  subtotal: number
}
