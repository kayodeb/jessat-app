import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium tracking-tight rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]'

    const variants = {
      primary:
        'bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm hover:shadow hover:-translate-y-0.5 border border-zinc-900/10',
      secondary:
        'bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80 hover:-translate-y-0.5 border border-zinc-200/60',
      outline:
        'border border-zinc-300 bg-white/80 backdrop-blur-sm text-zinc-900 hover:bg-zinc-50 hover:border-zinc-400 hover:-translate-y-0.5',
      ghost:
        'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/80',
      accent:
        'bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5',
      danger:
        'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200',
    }

    const sizes = {
      sm: 'text-xs h-9 px-3.5 gap-1.5',
      md: 'text-sm h-11 px-5 gap-2',
      lg: 'text-base h-13 px-7 gap-2.5 rounded-2xl',
      icon: 'h-10 w-10 p-0',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
