'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Boxes,
  Tag,
  Users,
  Store,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarNavProps {
  lowStockCount?: number
}

export function AdminSidebar({ lowStockCount = 0 }: SidebarNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      group: 'MENU',
      items: [
        {
          title: 'Dashboard',
          href: '/admin',
          icon: LayoutDashboard,
          badge: null,
        },
      ],
    },
    {
      group: 'GESTION',
      items: [
        {
          title: 'Produits',
          href: '/admin/produits',
          icon: Package,
          badge: null,
        },
        {
          title: 'Catégories',
          href: '/admin/categories',
          icon: FolderTree,
          badge: null,
        },
        {
          title: 'Stocks',
          href: '/admin/stock',
          icon: Boxes,
          badge: lowStockCount > 0 ? `${lowStockCount}` : null,
          badgeVariant: 'warning',
        },
      ],
    },
    {
      group: 'CLIENTS & OFFRES',
      items: [
        {
          title: 'Promotions',
          href: '/admin/promotions',
          icon: Tag,
          badge: null,
        },
        {
          title: 'Utilisateurs',
          href: '/admin/utilisateurs',
          icon: Users,
          badge: null,
        },
      ],
    },
  ]

  return (
    <aside className="w-64 bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 text-slate-800 flex flex-col h-[calc(100vh-2.5rem)] sticky top-5 z-40">
      {/* Brand Logo */}
      <div className="px-2 py-3 mb-4 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-blue-900 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform text-white font-extrabold text-xl">
            J
          </div>
          <div>
            <span className="font-extrabold text-lg text-slate-900 tracking-tight block leading-none">
              Jessat
            </span>
            <span className="text-[11px] font-semibold text-slate-400 tracking-wide">
              Admin Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 space-y-5 overflow-y-auto pr-1">
        {navItems.map((section, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
              {section.group}
            </div>
            {section.items.map((item) => {
              const Icon = item.icon
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-2xl text-xs transition-all duration-200 group',
                    isActive
                      ? 'bg-blue-900 text-white font-semibold shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/70 font-medium'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        'w-4 h-4 transition-colors',
                        isActive
                          ? 'text-white'
                          : 'text-slate-400 group-hover:text-slate-700'
                      )}
                    />
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={cn(
                        'text-[10px] font-bold px-2 py-0.5 rounded-full',
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badgeVariant === 'warning'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-600'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Bottom Promo / Store Button */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <div className="p-4 rounded-2xl bg-slate-900 text-white relative overflow-hidden shadow-sm">
          <div className="flex items-center gap-2 mb-1 text-blue-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> E-commerce Mode
          </div>
          <p className="text-[11px] text-slate-300 mb-3">
            Accédez à la boutique en direct
          </p>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-sm"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Voir le site</span>
          </Link>
        </div>
      </div>
    </aside>
  )
}
