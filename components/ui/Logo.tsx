'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  size?: number | string
}

/**
 * High-precision vector SVG representation of the official Jessat 'JJ' emblem
 */
export function LogoIcon({ className, size = 40, ...props }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('inline-block flex-shrink-0 select-none', className)}
      {...props}
    >
      <defs>
        {/* Left J - Body White to Light Blue Gradient */}
        <linearGradient id="jessat-left-body" x1="20" y1="20" x2="60" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#F0F9FF" />
          <stop offset="100%" stopColor="#E0F2FE" />
        </linearGradient>

        {/* Left J - Top Corner Cyan Fold Gradient */}
        <linearGradient id="jessat-left-fold" x1="45" y1="12" x2="60" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        {/* Right J - Body Electric Blue Gradient */}
        <linearGradient id="jessat-right-body" x1="60" y1="15" x2="100" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="35%" stopColor="#0284C7" />
          <stop offset="75%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>

        {/* Right J - Top Corner Sky Gradient */}
        <linearGradient id="jessat-right-fold" x1="80" y1="15" x2="100" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

      </defs>

      <g>
        {/* === LEFT 'J' === */}
        {/* Left J Main Stem & Hook */}
        <path
          d="M 52 14 L 33 22 C 33 22 41 55 41 72 C 41 84 32 91 22 91 C 15 91 10 86 10 79 C 10 68 25 61 25 61 C 25 61 14 65 10 76 C 6 87 14 102 31 102 C 49 102 61 88 61 68 L 61 36 Z"
          fill="url(#jessat-left-body)"
        />

        {/* Left J Top Fold Accent */}
        <path
          d="M 33 22 L 52 14 L 61 36 L 52 28 Z"
          fill="url(#jessat-left-fold)"
        />

        {/* === RIGHT 'J' === */}
        {/* Right J Top Fold */}
        <path
          d="M 72 24 L 95 16 L 95 38 L 84 31 Z"
          fill="url(#jessat-right-fold)"
        />

        {/* Right J Main Stem & Lower Hook */}
        <path
          d="M 95 16 L 72 24 L 72 74 C 72 90 62 108 45 110 C 58 112 73 105 84 94 C 93 84 95 72 95 56 Z"
          fill="url(#jessat-right-body)"
        />
        <path
          d="M 72 24 L 95 38 L 95 68 C 95 86 82 106 63 112 C 54 115 45 110 45 110 C 62 108 72 90 72 74 Z"
          fill="url(#jessat-right-body)"
        />
      </g>
    </svg>
  )
}

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon' | 'banner' | 'image'
  theme?: 'light' | 'dark' | 'blue' | 'auto'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  href?: string
  className?: string
  showSubtitle?: boolean
}

export function Logo({
  variant = 'full',
  theme = 'auto',
  size = 'md',
  href,
  className,
  showSubtitle = true,
}: LogoProps) {
  // If variant is 'image', render the exact original logo graphic
  if (variant === 'image') {
    const heightMap = {
      sm: 36,
      md: 46,
      lg: 56,
      xl: 72,
    }
    const h = heightMap[size]

    const logoContent = (
      <div className={cn('relative inline-flex items-center group', className)}>
        <Image
          src="/images/jessat-logo-blue.png"
          alt="Jessat Multi-Services - Votre partenaire en informatique"
          width={Math.round(h * 2.55)}
          height={h}
          className="h-auto w-auto object-contain rounded-lg group-hover:scale-[1.02] transition-transform duration-200"
          priority
        />
      </div>
    )

    if (href) {
      return (
        <Link href={href} aria-label="Jessat Multi-Services Accueil">
          {logoContent}
        </Link>
      )
    }
    return logoContent
  }

  // Size mappings
  const iconSizeMap = {
    sm: 32,
    md: 42,
    lg: 52,
    xl: 68,
  }

  const titleSizeMap = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
  }

  const tagSizeMap = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-[12px]',
    xl: 'text-[14px]',
  }

  const subSizeMap = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-[11px]',
    xl: 'text-[13px]',
  }

  // Color mappings
  const titleColor =
    theme === 'dark'
      ? 'text-white'
      : theme === 'blue'
      ? 'text-white'
      : 'text-blue-600'

  const subtitleColor =
    theme === 'dark'
      ? 'text-blue-400'
      : theme === 'blue'
      ? 'text-blue-100'
      : 'text-zinc-600'

  const taglineColor =
    theme === 'dark'
      ? 'text-zinc-400'
      : theme === 'blue'
      ? 'text-blue-200'
      : 'text-zinc-500'

  const containerBg =
    theme === 'blue'
      ? 'bg-[#002ea0] text-white px-4 py-2.5 rounded-xl shadow-lg border border-blue-600/30'
      : ''

  const content = (
    <div
      className={cn(
        'inline-flex items-center gap-2.5 sm:gap-3 group select-none',
        containerBg,
        className
      )}
    >
      {/* Icon Emblem */}
      <div className="relative flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
        <Image
          src="/images/jessat-icon-blue.png"
          alt="Jessat Logo Icon"
          width={iconSizeMap[size]}
          height={iconSizeMap[size]}
          className="object-contain"
          priority
        />
      </div>

      {/* Text Branding */}
      {variant !== 'icon' && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-baseline gap-1.5">
            <span
              className={cn(
                'font-black tracking-tight leading-none',
                titleSizeMap[size],
                titleColor
              )}
            >
              Jessat
            </span>
          </div>

          <span
            className={cn(
              'font-extrabold uppercase tracking-wider mt-0.5 leading-tight',
              tagSizeMap[size],
              subtitleColor
            )}
          >
            Multi-Services
          </span>

          {showSubtitle && variant === 'full' && (
            <span
              className={cn(
                'font-medium italic tracking-normal mt-0.5 leading-tight opacity-90',
                subSizeMap[size],
                taglineColor
              )}
            >
              Votre partenaire en informatique
            </span>
          )}
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} aria-label="Jessat Multi-Services Accueil">
        {content}
      </Link>
    )
  }

  return content
}
