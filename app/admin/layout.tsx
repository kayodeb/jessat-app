'use client'

import { ReactNode, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { useAdminStore } from '@/lib/admin-store'
import { useAuth } from '@/lib/context/auth-context'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAdminAuthenticated, isLoading } = useAuth()
  const { products } = useAdminStore()

  const isLoginPage = pathname === '/admin/login'
  const lowStockCount = products.filter((p) => p.stockCount <= 5).length

  // Always call useEffect unconditionally (Rules of Hooks)
  useEffect(() => {
    if (!isLoginPage && !isLoading && !isAdminAuthenticated) {
      router.replace('/admin/login')
    }
  }, [isLoginPage, isLoading, isAdminAuthenticated, router])

  // Render login page standalone (no sidebar)
  if (isLoginPage) {
    return <>{children}</>
  }

  // Show loading screen while auth state is being resolved
  if (isLoading) {
    return (
      <div className="h-screen bg-[#f3f4f8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-blue-900 border-t-transparent animate-spin" />
          <p className="text-sm font-semibold text-slate-500">Vérification des accès...</p>
        </div>
      </div>
    )
  }

  // Block rendering if not admin (redirect in progress)
  if (!isAdminAuthenticated) {
    return null
  }

  return (
    <div className="h-screen bg-[#f3f4f8] text-slate-900 flex antialiased selection:bg-blue-500 selection:text-white font-sans p-3 sm:p-5 gap-5 overflow-hidden">
      <AdminSidebar lowStockCount={lowStockCount} />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {children}
      </div>
    </div>
  )
}

