import React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'bestseller' | 'promo' | 'default' | 'outline'
}

export function Badge({ children, className, variant = 'default', ...props }: BadgeProps) {
  const variantStyles = {
    default: 'bg-zinc-900 text-white border-zinc-800',
    outline: 'bg-transparent text-zinc-900 border-zinc-300',
    bestseller: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
    promo: 'bg-rose-100 text-rose-800 border-rose-300 font-bold',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] tracking-wide uppercase font-bold border transition-colors shadow-2xs',
        variantStyles[variant] || variantStyles.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
