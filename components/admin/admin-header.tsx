'use client'

import { Bell, Search } from 'lucide-react'

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
  return (
    <header className="px-2 py-3 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-30 bg-[#f3f4f8]/95 backdrop-blur-md flex-shrink-0 border-b border-slate-200/60 pb-4">
      {/* Title & Date */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          {title}
        </h1>
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
        {/* Search */}
        <div className="relative w-64 hidden sm:block">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full bg-white border border-slate-200/80 rounded-full pl-10 pr-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 shadow-sm"
          />
        </div>

        {/* Notifications Button */}
        <button className="w-10 h-10 rounded-full bg-white border border-slate-200/80 shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors relative">
          <Bell className="w-4 h-4" />
          {lowStockAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-extrabold text-[9px] flex items-center justify-center shadow-sm">
              {lowStockAlertsCount}
            </span>
          )}
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-3 bg-white border border-slate-200/80 rounded-full py-1.5 px-3 shadow-sm">
          <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            AD
          </div>
          <div className="hidden lg:block text-left pr-2">
            <span className="text-xs font-bold text-slate-900 block leading-tight">
              Ferra Alexandra
            </span>
            <span className="text-[10px] font-semibold text-slate-400 block">
              Admin Store
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
