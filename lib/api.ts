/**
 * Jessat API Client
 * Centralise tous les appels REST vers le backend NestJS.
 */

import { Product, ProductCategory } from '@/types/product';
import { CategoryItem } from '@/types/category';
import { ConfigOption, ConfigCategory } from '@/types/configurator';
import { Promotion, StockMovement, AdminUser } from '@/types/admin';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Helper pour récupérer le token JWT stocké (localStorage + Cookies)
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  const local = localStorage.getItem('jessat_auth_token');
  if (local) return local;

  // Fallback cookie
  const match = document.cookie.match(/(^|;)\s*jessat_auth_token=([^;]+)/);
  return match ? decodeURIComponent(match[2]) : null;
}

export function setAuthToken(token: string | null) {
  if (typeof window === 'undefined') return;
  if (token) {
    localStorage.setItem('jessat_auth_token', token);
    document.cookie = `jessat_auth_token=${encodeURIComponent(token)}; path=/; max-age=2592000; SameSite=Lax`;
  } else {
    localStorage.removeItem('jessat_auth_token');
    document.cookie = 'jessat_auth_token=; path=/; max-age=0; SameSite=Lax';
  }
}

// Fonction de base pour les requêtes HTTP
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  // Si c'est un FormData, on laisse le navigateur gérer le Content-Type
  if (options.body instanceof FormData) {
    delete (headers as Record<string, string>)['Content-Type'];
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorData: any;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: `Erreur HTTP ${response.status}: ${response.statusText}` };
    }
    const message = errorData?.message || `Erreur requête (${response.status})`;
    throw new Error(Array.isArray(message) ? message.join(', ') : message);
  }

  return response.json();
}

// Normalise un produit backend vers le format frontend
export function normalizeProduct(raw: any): Product {
  let categorySlug: ProductCategory = 'ordinateurs';
  if (typeof raw.category === 'string') {
    categorySlug = raw.category as ProductCategory;
  } else if (raw.category && raw.category.slug) {
    categorySlug = raw.category.slug as ProductCategory;
  } else if (raw.categorySlug) {
    categorySlug = raw.categorySlug as ProductCategory;
  }

  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    brand: raw.brand || 'AERO',
    tagline: raw.tagline || '',
    description: raw.description || '',
    price: Number(raw.price) || 0,
    compareAtPrice: raw.compareAtPrice ? Number(raw.compareAtPrice) : undefined,
    badge: raw.badge || undefined,
    isNew: Boolean(raw.isNew),
    isBestseller: Boolean(raw.isBestseller),
    rating: Number(raw.rating) || 0,
    reviewCount: Number(raw.reviewCount) || 0,
    category: categorySlug,
    images: Array.isArray(raw.images) ? raw.images : [],
    specifications: raw.specifications || {},
    benchmarks: raw.benchmarks || undefined,
    condition: raw.condition === 'reconditionne' ? 'venu' : (raw.condition || 'neuf'),
    inStock: raw.inStock !== false && (raw.stockCount === undefined || raw.stockCount > 0),
    stockCount: raw.stockCount || 0,
    featured: Boolean(raw.featured),
    colorVariants: raw.colorVariants || undefined,
  };
}

// ── API Modules ───────────────────────────────────────────────────────────────

export const api = {
  // ── Authentication
  auth: {
    async login(dto: { email: string; password?: string }) {
      const payload = {
        email: dto.email.trim(),
        password: dto.password || '',
      };
      const data = await request<{ accessToken?: string; access_token?: string; user: any }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const token = data.accessToken || data.access_token;
      if (token) {
        setAuthToken(token);
      }
      return {
        accessToken: token,
        access_token: token,
        user: data.user,
      };
    },
    async register(dto: { name: string; email: string; password?: string; phone?: string }) {
      const payload: { name: string; email: string; password: string; phone?: string } = {
        name: dto.name.trim(),
        email: dto.email.trim(),
        password: dto.password || '',
      };
      if (dto.phone && dto.phone.trim()) {
        payload.phone = dto.phone.trim();
      }
      const data = await request<{ accessToken?: string; access_token?: string; user: any }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const token = data.accessToken || data.access_token;
      if (token) {
        setAuthToken(token);
      }
      return {
        accessToken: token,
        access_token: token,
        user: data.user,
      };
    },
    async getProfile() {
      try {
        return await request<any>('/auth/me');
      } catch {
        return await request<any>('/users/profile');
      }
    },
    async updateProfile(updates: any) {
      return request<any>('/users/profile', {
        method: 'PATCH',
        body: JSON.stringify(updates),
      });
    },
    logout() {
      setAuthToken(null);
    },
  },

  // ── Products
  products: {
    async getAll(params?: {
      category?: string;
      search?: string;
      condition?: string;
      featured?: boolean;
      inStock?: boolean;
      page?: number;
      limit?: number;
      sort?: string;
    }): Promise<Product[]> {
      const query = new URLSearchParams();
      if (params?.category && params.category !== 'all') query.append('category', params.category);
      if (params?.search) query.append('search', params.search);
      if (params?.condition) query.append('condition', params.condition);
      if (params?.featured !== undefined) query.append('featured', String(params.featured));
      if (params?.inStock !== undefined) query.append('inStock', String(params.inStock));
      if (params?.page) query.append('page', String(params.page));
      if (params?.limit) query.append('limit', String(params.limit));
      if (params?.sort) query.append('sort', params.sort);

      const qs = query.toString();
      const res = await request<any>(`/products${qs ? `?${qs}` : ''}`);
      const rawProducts: any[] = Array.isArray(res) ? res : (res?.data || []);
      return rawProducts.map(normalizeProduct);
    },
    async getBySlug(slug: string): Promise<Product> {
      const raw = await request<any>(`/products/slug/${slug}`);
      return normalizeProduct(raw);
    },
    async getById(id: string): Promise<Product> {
      const raw = await request<any>(`/products/${id}`);
      return normalizeProduct(raw);
    },
    async create(productData: any): Promise<Product> {
      const raw = await request<any>('/products', {
        method: 'POST',
        body: JSON.stringify(productData),
      });
      return normalizeProduct(raw);
    },
    async update(id: string, productData: any): Promise<Product> {
      const raw = await request<any>(`/products/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(productData),
      });
      return normalizeProduct(raw);
    },
    async delete(id: string): Promise<{ success: boolean }> {
      return request<{ success: boolean }>(`/products/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // ── Categories
  categories: {
    async getAll(): Promise<CategoryItem[]> {
      const raw = await request<any[]>('/categories');
      return raw.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description || '',
        productCount: c.products ? c.products.length : (c.productCount || 0),
        imageUrl: c.imageUrl || '',
        accentColor: c.accentColor || '#38bdf8',
      }));
    },
    async create(categoryData: Partial<CategoryItem>): Promise<CategoryItem> {
      return request<CategoryItem>('/categories', {
        method: 'POST',
        body: JSON.stringify(categoryData),
      });
    },
    async update(id: string, categoryData: Partial<CategoryItem>): Promise<CategoryItem> {
      return request<CategoryItem>(`/categories/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(categoryData),
      });
    },
    async delete(id: string): Promise<{ success: boolean }> {
      return request<{ success: boolean }>(`/categories/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // ── Promotions
  promotions: {
    async getAll(): Promise<Promotion[]> {
      const raw = await request<any[]>('/promotions');
      return raw.map((p) => ({
        id: p.id,
        code: p.code,
        description: p.description,
        discountType: p.discountType,
        discountValue: Number(p.discountValue),
        startDate: p.startDate ? new Date(p.startDate).toISOString().split('T')[0] : '',
        endDate: p.endDate ? new Date(p.endDate).toISOString().split('T')[0] : '',
        minPurchase: Number(p.minPurchase) || 0,
        usageLimit: Number(p.usageLimit) || 0,
        usageCount: Number(p.usageCount) || 0,
        isActive: Boolean(p.isActive),
        targetCategory: p.targetCategory || 'all',
      }));
    },
    async getById(id: string): Promise<Promotion> {
      return request<Promotion>(`/promotions/${id}`);
    },
    async create(data: Partial<Promotion>): Promise<Promotion> {
      return request<Promotion>('/promotions', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    async update(id: string, data: Partial<Promotion>): Promise<Promotion> {
      return request<Promotion>(`/promotions/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    },
    async toggle(id: string): Promise<Promotion> {
      return request<Promotion>(`/promotions/${id}/toggle`, {
        method: 'PATCH',
      });
    },
    async delete(id: string): Promise<{ success: boolean }> {
      return request<{ success: boolean }>(`/promotions/${id}`, {
        method: 'DELETE',
      });
    },
    async validate(code: string, cartTotal: number) {
      return request<any>('/promotions/validate', {
        method: 'POST',
        body: JSON.stringify({ code, cartTotal }),
      });
    },
  },

  // ── Stock
  stock: {
    async getMovements(params?: { page?: number; limit?: number; productId?: string }): Promise<StockMovement[]> {
      const query = new URLSearchParams();
      if (params?.page) query.append('page', String(params.page));
      if (params?.limit) query.append('limit', String(params.limit));
      if (params?.productId) query.append('productId', params.productId);
      const qs = query.toString();
      const res = await request<any>(`/stock/movements${qs ? `?${qs}` : ''}`);
      const list: any[] = Array.isArray(res)
        ? (Array.isArray(res[0]) ? res[0] : res)
        : (res?.data || []);
      return list.map((m: any, index: number) => ({
        id: m.id || m._id || `mov-${index}-${m.productId || 'item'}`,
        productId: m.productId || m.product?.id || '',
        productName: m.productName || m.product?.name || 'Produit',
        changeQuantity: Number(m.changeQuantity ?? m.quantity ?? 0) || 0,
        type: m.type || 'ADJUSTMENT',
        reason: m.reason || '',
        createdAt: m.createdAt || new Date().toISOString(),
      }));
    },
    async recordMovement(data: {
      productId: string;
      changeQuantity: number;
      type: string;
      reason?: string;
    }): Promise<StockMovement> {
      return request<StockMovement>('/stock/movements', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
  },

  // ── Configurator
  configurator: {
    async getOptions(): Promise<Record<ConfigCategory, ConfigOption[]>> {
      const raw = await request<any[]>('/configurator/options');
      const grouped: Record<string, ConfigOption[]> = {
        cpu: [],
        gpu: [],
        ram: [],
        storage: [],
        cooling: [],
        chassis: [],
      };

      raw.forEach((item) => {
        const cat = item.category as ConfigCategory;
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push({
          id: item.id,
          name: item.name,
          subtitle: item.subtitle,
          brand: item.brand,
          priceDelta: Number(item.priceDelta) || 0,
          isDefault: Boolean(item.isDefault),
          badge: item.badge,
          specs: item.specs || [],
          benchmarkGain: item.benchmarkGain,
        });
      });

      return grouped as Record<ConfigCategory, ConfigOption[]>;
    },
  },

  // ── Cart
  cart: {
    async get() {
      return request<any>('/cart');
    },
    async add(productId: string, quantity: number, selectedOptions?: any) {
      return request<any>('/cart/items', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity, selectedOptions }),
      });
    },
    async update(itemId: string, quantity: number) {
      return request<any>(`/cart/items/${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity }),
      });
    },
    async remove(itemId: string) {
      return request<any>(`/cart/items/${itemId}`, {
        method: 'DELETE',
      });
    },
    async clear() {
      return request<any>('/cart', {
        method: 'DELETE',
      });
    },
  },

  // ── Orders
  orders: {
    async create(orderData: any) {
      return request<any>('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
    },
    async getMyOrders() {
      return request<any[]>('/orders/my-orders');
    },
    async getById(id: string) {
      return request<any>(`/orders/${id}`);
    },
  },

  // ── Wishlist
  wishlist: {
    async get() {
      return request<any[]>('/wishlist');
    },
    async add(productId: string) {
      return request<any>(`/wishlist/${productId}`, {
        method: 'POST',
      });
    },
    async remove(productId: string) {
      return request<any>(`/wishlist/${productId}`, {
        method: 'DELETE',
      });
    },
  },

  // ── Upload (Images vers Cloudinary via Backend)
  upload: {
    async uploadImage(file: File): Promise<{ url: string; publicId: string }> {
      const formData = new FormData();
      formData.append('file', file);
      return request<{ url: string; publicId: string }>('/upload/image', {
        method: 'POST',
        body: formData,
      });
    },
  },

  // ── Admin
  admin: {
    async getDashboardStats(): Promise<{
      totalOrders: number;
      totalUsers: number;
      totalProducts: number;
      totalRevenue: number;
      pendingOrders: number;
      lowStockProducts: number;
    }> {
      return request<any>('/admin/stats');
    },
    async getRevenue(period: 'day' | 'week' | 'month' = 'month') {
      return request<any[]>(`/admin/stats/revenue?period=${period}`);
    },
    async getTopProducts(limit = 10) {
      return request<any[]>(`/admin/stats/top-products?limit=${limit}`);
    },
    async getOrdersByStatus() {
      return request<any[]>(`/admin/stats/orders-by-status`);
    },
    async getAllOrders(params?: { status?: string; page?: number; limit?: number }) {
      const query = new URLSearchParams();
      if (params?.status) query.append('status', params.status);
      if (params?.page) query.append('page', String(params.page));
      if (params?.limit) query.append('limit', String(params.limit));
      const qs = query.toString();
      return request<any>(`/orders${qs ? `?${qs}` : ''}`);
    },
    async updateOrderStatus(orderId: string, status: string) {
      return request<any>(`/orders/${orderId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    },
    async getAllUsers(params?: { role?: string; page?: number; limit?: number }): Promise<AdminUser[]> {
      const query = new URLSearchParams();
      if (params?.role) query.append('role', params.role);
      if (params?.page) query.append('page', String(params.page));
      if (params?.limit) query.append('limit', String(params.limit));
      const qs = query.toString();
      const res = await request<any>(`/users${qs ? `?${qs}` : ''}`);
      const rawUsers: any[] = Array.isArray(res) ? res : res?.data || [];
      return rawUsers.map((u: any) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        status: u.status,
        avatar: u.avatar,
        ordersCount: u.orders ? u.orders.length : (u.ordersCount || 0),
        totalSpent: Number(u.totalSpent) || 0,
        createdAt: u.createdAt,
        lastLogin: u.lastLogin,
      }));
    },
    async updateUserRole(id: string, role: string) {
      return request<any>(`/users/${id}/role`, {
        method: 'PATCH',
        body: JSON.stringify({ role }),
      });
    },
    async updateUserStatus(id: string, status: string) {
      return request<any>(`/users/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    },
    async deleteUser(id: string) {
      return request<any>(`/users/${id}`, {
        method: 'DELETE',
      });
    },
  },
};
