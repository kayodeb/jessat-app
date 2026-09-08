'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/layout/CartDrawer'
import { SearchModal } from '@/components/layout/SearchModal'

export function MainLayoutShell({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

  const isAdminRoute = pathname?.startsWith('/admin')

  if (isAdminRoute) {
    return <div className="min-h-screen flex flex-col">{children}</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
      <div className="flex-1">{children}</div>
      <Footer />
      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  )
}

