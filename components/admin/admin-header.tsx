'use client'

import { Bell, Search, RefreshCw, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/context/auth-context'
import { useAdminStore } from '@/lib/admin-store'
import { cn } from '@/lib/utils'

interface AdminHeaderProps {
  title: string
  subtitle?: string
  lowStockAlertsCount?: number
}

export function AdminHeader({
  title,
  subtitle,
  lowStockAlertsCount = 0,
}: AdminHeaderProps) {
  const { adminUser } = useAuth()
  const { isConnected, isLoading, refreshAll } = useAdminStore()

  const displayName = adminUser?.name || 'Admin Jessat'
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <header className="px-2 py-3 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-30 bg-[#f3f4f8]/95 backdrop-blur-md flex-shrink-0 border-b border-slate-200/60 pb-4">
      {/* Title & Date */}
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {title}
          </h1>
        </div>
        {subtitle ? (
          <p className="text-xs text-slate-500 font-medium mt-0.5">{subtitle}</p>
        ) : (
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            {new Date().toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        )}
      </div>

      {/* Controls Right */}
      <div className="flex items-center gap-3">
        {/* Refresh button */}
        <button
          onClick={() => refreshAll()}
          disabled={isLoading}
          title="Synchroniser avec le backend"
          className="w-10 h-10 rounded-full bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-slate-600 hover:text-blue-900 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={cn('w-4 h-4', isLoading && 'animate-spin text-blue-900')} />
        </button>

        {/* Notifications Button */}
        <button
          className="w-10 h-10 rounded-full bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors relative"
          aria-label="Alertes de stock"
        >
          <Bell className="w-4 h-4" />
          {lowStockAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-extrabold text-[9px] flex items-center justify-center shadow-xs">
              {lowStockAlertsCount}
            </span>
          )}
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-3 bg-white border border-slate-200/80 rounded-full py-1.5 px-3 shadow-xs">
          {adminUser?.avatarUrl ? (
            <img
              src={adminUser.avatarUrl}
              alt={displayName}
              className="w-8 h-8 rounded-full object-cover bg-slate-100 border border-slate-200 shadow-xs"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-xs shadow-xs">
              {initials}
            </div>
          )}
          <div className="hidden lg:block text-left pr-2">
            <span className="text-xs font-bold text-slate-900 block leading-tight">
              {displayName}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 block uppercase">
              {adminUser?.role || 'Admin'}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
