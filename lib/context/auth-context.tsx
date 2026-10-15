'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { api, setAuthToken } from '@/lib/api'

export interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  role: 'customer' | 'admin'
  avatarUrl?: string
  createdAt: string
}

interface AuthContextType {
  // Customer State
  user: UserProfile | null
  isAuthenticated: boolean
  isLoading: boolean
  loginCustomer: (email: string, password?: string) => Promise<boolean>
  registerCustomer: (name: string, email: string, phone: string, password?: string) => Promise<boolean>
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>
  logoutCustomer: () => void

  // Admin State
  adminUser: UserProfile | null
  isAdminAuthenticated: boolean
  loginAdmin: (email: string, password?: string) => Promise<boolean>
  logoutAdmin: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper to test if a raw backend role is an admin
export function isUserAdminRole(role?: string): boolean {
  if (!role) return false
  const r = String(role).toUpperCase().trim()
  return r === 'ADMIN' || r === 'SUPER_ADMIN' || r === 'ADMINISTRATEUR'
}

// Helper to read cookie
function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^|;)\\s*' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

// Helper to write cookie
function setCookie(name: string, value: string | null, days = 30) {
  if (typeof window === 'undefined') return
  if (value) {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${days * 86400}; SameSite=Lax`
  } else {
    document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('jessat_customer_auth') || getCookie('jessat_customer_auth')
        if (saved) return JSON.parse(saved)
      } catch {}
    }
    return null
  })

  const [adminUser, setAdminUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('jessat_admin_auth') || getCookie('jessat_admin_auth')
        if (saved) {
          const parsed = JSON.parse(saved)
          if (parsed && parsed.role === 'admin') {
            return parsed
          }
        }
      } catch {}
    }
    return null
  })

  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const hasToken = localStorage.getItem('jessat_auth_token') || getCookie('jessat_auth_token')
      const hasAdmin = localStorage.getItem('jessat_admin_auth') || getCookie('jessat_admin_auth')
      const hasCust = localStorage.getItem('jessat_customer_auth') || getCookie('jessat_customer_auth')
      if (hasAdmin || hasCust || !hasToken) return false
    }
    return false
  })

  // Synchronise le profil depuis l'API au démarrage si un token existe
  useEffect(() => {
    async function loadAuth() {
      try {
        const savedUser = localStorage.getItem('jessat_customer_auth') || getCookie('jessat_customer_auth')
        if (savedUser && !user) {
          try { setUser(JSON.parse(savedUser)) } catch {}
        }

        const savedAdmin = localStorage.getItem('jessat_admin_auth') || getCookie('jessat_admin_auth')
        if (savedAdmin && !adminUser) {
          try {
            const parsed = JSON.parse(savedAdmin)
            if (parsed && parsed.role === 'admin') {
              setAdminUser(parsed)
            }
          } catch {}
        }

        // Tenter de rafraîchir le profil depuis le backend
        const token = localStorage.getItem('jessat_auth_token') || getCookie('jessat_auth_token')
        if (token) {
          try {
            const profile = await api.auth.getProfile()
            if (profile) {
              const isAdmin = isUserAdminRole(profile.role)
              const mappedUser: UserProfile = {
                id: profile.id,
                name: profile.name,
                email: profile.email,
                phone: profile.phone || '',
                address: profile.address || '',
                city: profile.city || '',
                role: isAdmin ? 'admin' : 'customer',
                avatarUrl: profile.avatar || '',
                createdAt: profile.createdAt || new Date().toISOString(),
              }

              if (isAdmin) {
                setAdminUser(mappedUser)
                setUser(mappedUser)
                localStorage.setItem('jessat_admin_auth', JSON.stringify(mappedUser))
                setCookie('jessat_admin_auth', JSON.stringify(mappedUser))
                localStorage.setItem('jessat_customer_auth', JSON.stringify(mappedUser))
                setCookie('jessat_customer_auth', JSON.stringify(mappedUser))
              } else {
                setUser(mappedUser)
                localStorage.setItem('jessat_customer_auth', JSON.stringify(mappedUser))
                setCookie('jessat_customer_auth', JSON.stringify(mappedUser))
                // Clean up any stale admin auth from a client session
                setAdminUser(null)
                localStorage.removeItem('jessat_admin_auth')
                setCookie('jessat_admin_auth', null)
              }
            }
          } catch (err) {
            console.warn('Backend profile fetch failed, using cached session:', err)
          }
        }
      } catch (e) {
        console.error('Failed to load auth from storage:', e)
      } finally {
        setIsLoading(false)
      }
    }

    loadAuth()
  }, [])

  const loginCustomer = async (email: string, password?: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const res = await api.auth.login({
        email,
        password: password || 'ClientPassword123!',
      })

      const rawUser = res.user
      const isAdmin = isUserAdminRole(rawUser.role)
      const authenticatedUser: UserProfile = {
        id: rawUser.id,
        name: rawUser.name,
        email: rawUser.email,
        phone: rawUser.phone || '',
        address: rawUser.address || '',
        city: rawUser.city || '',
        role: isAdmin ? 'admin' : 'customer',
        avatarUrl: rawUser.avatar || '',
        createdAt: rawUser.createdAt || new Date().toISOString(),
      }

      setUser(authenticatedUser)
      localStorage.setItem('jessat_customer_auth', JSON.stringify(authenticatedUser))
      setCookie('jessat_customer_auth', JSON.stringify(authenticatedUser))

      if (isAdmin) {
        setAdminUser(authenticatedUser)
        localStorage.setItem('jessat_admin_auth', JSON.stringify(authenticatedUser))
        setCookie('jessat_admin_auth', JSON.stringify(authenticatedUser))
      } else {
        setAdminUser(null)
        localStorage.removeItem('jessat_admin_auth')
        setCookie('jessat_admin_auth', null)
      }

      setIsLoading(false)
      return true
    } catch (err: any) {
      console.error('Login customer error:', err)
      setIsLoading(false)
      throw err
    }
  }

  const registerCustomer = async (
    name: string,
    email: string,
    phone: string,
    password?: string
  ): Promise<boolean> => {
    setIsLoading(true)
    try {
      const res = await api.auth.register({
        name,
        email,
        phone,
        password: password || 'Password123!',
      })

      const rawUser = res.user
      const newUser: UserProfile = {
        id: rawUser.id,
        name: rawUser.name,
        email: rawUser.email,
        phone: rawUser.phone || phone,
        address: rawUser.address || '',
        city: rawUser.city || '',
        role: 'customer',
        avatarUrl: rawUser.avatar || '',
        createdAt: rawUser.createdAt || new Date().toISOString(),
      }

      setUser(newUser)
      localStorage.setItem('jessat_customer_auth', JSON.stringify(newUser))
      setCookie('jessat_customer_auth', JSON.stringify(newUser))

      setAdminUser(null)
      localStorage.removeItem('jessat_admin_auth')
      setCookie('jessat_admin_auth', null)

      setIsLoading(false)
      return true
    } catch (err: any) {
      console.error('Register customer error:', err)
      setIsLoading(false)
      throw err
    }
  }

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return
    try {
      await api.auth.updateProfile(updates)
    } catch (err) {
      console.warn('Update remote profile failed, updating local state only:', err)
    }
    const updated = { ...user, ...updates }
    setUser(updated)
    localStorage.setItem('jessat_customer_auth', JSON.stringify(updated))
    setCookie('jessat_customer_auth', JSON.stringify(updated))
  }

  const logoutCustomer = () => {
    setUser(null)
    setAdminUser(null)
    localStorage.removeItem('jessat_customer_auth')
    localStorage.removeItem('jessat_admin_auth')
    setCookie('jessat_customer_auth', null)
    setCookie('jessat_admin_auth', null)
    api.auth.logout()
  }

  const loginAdmin = async (email: string, password?: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const res = await api.auth.login({
        email,
        password: password || 'AdminPassword123!',
      })

      const rawUser = res.user
      const isAdmin = isUserAdminRole(rawUser.role)

      // Strict role check: reject standard customer accounts
      if (!isAdmin) {
        api.auth.logout()
        setAdminUser(null)
        localStorage.removeItem('jessat_admin_auth')
        setCookie('jessat_admin_auth', null)
        setIsLoading(false)
        throw new Error(
          "Accès refusé : Ce compte est un compte client standard et ne possède pas les privilèges administrateur (ADMIN / SUPER_ADMIN)."
        )
      }

      const admin: UserProfile = {
        id: rawUser.id,
        name: rawUser.name,
        email: rawUser.email,
        role: 'admin',
        avatarUrl: rawUser.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
        createdAt: rawUser.createdAt || new Date().toISOString(),
      }

      setAdminUser(admin)
      setUser(admin)
      localStorage.setItem('jessat_admin_auth', JSON.stringify(admin))
      setCookie('jessat_admin_auth', JSON.stringify(admin))
      localStorage.setItem('jessat_customer_auth', JSON.stringify(admin))
      setCookie('jessat_customer_auth', JSON.stringify(admin))
      setIsLoading(false)
      return true
    } catch (err: any) {
      console.error('Login admin error:', err)
      setIsLoading(false)
      throw err
    }
  }

  const logoutAdmin = () => {
    setAdminUser(null)
    setUser(null)
    localStorage.removeItem('jessat_admin_auth')
    localStorage.removeItem('jessat_customer_auth')
    setCookie('jessat_admin_auth', null)
    setCookie('jessat_customer_auth', null)
    api.auth.logout()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginCustomer,
        registerCustomer,
        updateUserProfile,
        logoutCustomer,
        adminUser,
        isAdminAuthenticated: !!adminUser && adminUser.role === 'admin',
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

