import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onChange, onCheckedChange, ...props }, ref) => {
    return (
      <span className="relative inline-flex items-center justify-center">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={(e) => {
            onChange?.(e)
            onCheckedChange?.(e.target.checked)
          }}
          className="peer sr-only"
          {...props}
        />
        <span
          className={cn(
            'h-4 w-4 shrink-0 rounded-md border border-zinc-300 ring-offset-background transition-all duration-150 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-zinc-950 peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-checked:bg-zinc-950 peer-checked:border-zinc-950 flex items-center justify-center text-white cursor-pointer shadow-xs hover:border-zinc-400',
            className
          )}
        >
          {checked && <Check className="h-3 w-3 stroke-[3]" />}
        </span>
      </span>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
