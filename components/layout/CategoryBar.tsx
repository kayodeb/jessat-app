'use client'

import React from 'react'
import Link from 'next/link'

interface CategoryItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
}

export function CategoryBar() {
  const categories: CategoryItem[] = [
    {
      id: 'tablettes',
      label: 'Tablettes',
      href: '/produits?category=ordinateurs',
      icon: (
        <div className="relative flex items-center justify-center">
          {/* Tablet icon */}
          <svg
            className="w-6 h-6 stroke-white fill-none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="5" y="2" width="14" height="20" rx="3" />
            <circle cx="12" cy="17.5" r="0.75" fill="white" />
          </svg>
          {/* Yellow accent dot on top right */}
          {/* <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/60 ring-2 ring-[#0a1120]" /> */}
        </div>
      ),
    },
    {
      id: 'pc',
      label: 'PC',
      href: '/produits?category=ordinateurs',
      icon: (
        <div className="relative flex items-center justify-center">
          {/* Laptop icon */}
          <svg
            className="w-6 h-6 stroke-white fill-none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 15V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.2 2.4a1 1 0 0 1-.9 1.6H3.7a1 1 0 0 1-.9-1.6L4 15" />
          </svg>
          {/* Double diagonal orange slashes */}
          {/* <div className="absolute -top-1.5 -right-2 flex gap-0.5 pointer-events-none">
            <span className="w-1 h-3.5 bg-orange-500 rounded-full transform rotate-[25deg]" />
            <span className="w-1 h-3.5 bg-orange-400 rounded-full transform rotate-[25deg]" />
          </div> */}
        </div>
      ),
    },
    {
      id: 'gaming',
      label: 'Gaming',
      href: '/produits?category=ordinateurs',
      icon: (
        <div className="relative flex items-center justify-center">
          {/* Gamepad icon */}
          <svg
            className="w-6 h-6 stroke-white fill-none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="6" y1="12" x2="10" y2="12" />
            <line x1="8" y1="10" x2="8" y2="14" />
            <circle cx="15" cy="11" r="0.75" fill="white" />
            <circle cx="17.5" cy="13" r="0.75" fill="white" />
            <rect x="2" y="6" width="20" height="12" rx="5" />
          </svg>
          {/* Emerald accent dot */}
          {/* <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/60 ring-2 ring-[#0a1120]" /> */}
        </div>
      ),
    },
    {
      id: 'casques',
      label: 'Casques',
      href: '/produits?category=accessoires',
      icon: (
        <div className="relative flex items-center justify-center">
          {/* Headphones icon */}
          <svg
            className="w-6 h-6 stroke-white fill-none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
          </svg>
          {/* Double pink diagonal slashes */}
          {/* <div className="absolute -top-1.5 -right-2 flex gap-0.5 pointer-events-none">
            <span className="w-1 h-3.5 bg-pink-500 rounded-full transform rotate-[25deg]" />
            <span className="w-1 h-3.5 bg-rose-400 rounded-full transform rotate-[25deg]" />
          </div> */}
        </div>
      ),
    },
    {
      id: 'moniteurs',
      label: 'Moniteurs',
      href: '/produits?category=projecteurs',
      icon: (
        <div className="relative flex items-center justify-center">
          {/* Monitor screen with play icon */}
          <svg
            className="w-6 h-6 stroke-white fill-none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="13" rx="2" />
            <polygon points="10 7 15 9.5 10 12 10 7" fill="white" stroke="none" />
            <line x1="8" y1="20" x2="16" y2="20" />
            <line x1="12" y1="16" x2="12" y2="20" />
          </svg>
          {/* Crimson / Rose dot */}
          {/* <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/60 ring-2 ring-[#0a1120]" /> */}
        </div>
      ),
    },
    {
      id: 'imprimantes',
      label: 'Imprimantes',
      href: '/produits?category=imprimantes',
      icon: (
        <div className="relative flex items-center justify-center">
          {/* Printer / Plug cables icon */}
          <svg
            className="w-6 h-6 stroke-white fill-none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 3v5" />
            <path d="M18 3v5" />
            <path d="M4 8h16v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Z" />
            <path d="M7 19v2" />
            <path d="M17 19v2" />
          </svg>
          {/* Double cyan/teal diagonal slashes */}
          {/* <div className="absolute -top-1.5 -right-2 flex gap-0.5 pointer-events-none">
            <span className="w-1 h-3.5 bg-teal-400 rounded-full transform rotate-[25deg]" />
            <span className="w-1 h-3.5 bg-emerald-300 rounded-full transform rotate-[25deg]" />
          </div> */}
        </div>
      ),
    },
    {
      id: 'accessoires',
      label: 'Accessoires',
      href: '/produits?category=accessoires',
      icon: (
        <div className="relative flex items-center justify-center">
          {/* External hub / Hard drive icon */}
          <svg
            className="w-6 h-6 stroke-white fill-none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 8h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z" />
            <circle cx="7" cy="13" r="1" fill="white" />
            <circle cx="11" cy="13" r="1" fill="white" />
            <path d="M7 8V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" />
          </svg>
          {/* Peach / Orange dot */}
          {/* <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-orange-400 shadow-sm shadow-orange-400/60 ring-2 ring-[#0a1120]" /> */}
        </div>
      ),
    },
  ]

  return (
    <div className="w-full bg-[#0a1120] border-b border-zinc-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className="flex items-center justify-between sm:justify-center gap-6 sm:gap-10 md:gap-14 lg:gap-16 py-3 overflow-x-auto scrollbar-none"
          aria-label="Menu des catégories"
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="flex flex-col items-center gap-1.5 group flex-shrink-0 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="w-9 h-9 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                {cat.icon}
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors tracking-tight whitespace-nowrap">
                {cat.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
