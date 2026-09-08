import React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'bestseller' | 'promo' | 'default' | 'outline' | 'success' | 'warning' | 'destructive' | 'secondary'
}

export function Badge({ children, className, variant = 'default', ...props }: BadgeProps) {
  const variantStyles: Record<string, string> = {
    default: 'bg-blue-900 text-white border-blue-950',
    secondary: 'bg-slate-100 text-slate-700 border-slate-200/80',
    outline: 'bg-transparent text-slate-700 border-slate-300',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    destructive: 'bg-rose-50 text-rose-700 border-rose-200',
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
