import React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'electric' | 'bestseller' | 'new' | 'subtle'
}

export function Badge({ children, className, variant = 'default', ...props }: BadgeProps) {
  const variantStyles = {
    default: 'bg-zinc-900 text-white border-zinc-800',
    outline: 'bg-transparent text-zinc-900 border-zinc-300',
    electric: 'bg-blue-50 text-blue-700 border-blue-200/80 font-semibold',
    bestseller: 'bg-amber-50 text-amber-900 border-amber-200 font-semibold',
    new: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold',
    subtle: 'bg-zinc-100 text-zinc-600 border-zinc-200',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs tracking-wide uppercase font-medium border transition-colors',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
