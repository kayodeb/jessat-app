'use client'

import { ReactNode } from 'react'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { useAdminStore } from '@/lib/admin-store'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { products } = useAdminStore()
  const lowStockCount = products.filter((p) => p.stockCount <= 5).length

  return (
    <div className="h-screen bg-[#f3f4f8] text-slate-900 flex antialiased selection:bg-blue-500 selection:text-white font-sans p-3 sm:p-5 gap-5 overflow-hidden">
      <AdminSidebar lowStockCount={lowStockCount} />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {children}
      </div>
    </div>
  )
}
