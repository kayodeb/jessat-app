'use client'

import React, { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  fill?: string
  size?: number
}

export function Spotlight({
  className,
  children,
  size = 450,
  ...props
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let rafId: number | null = null

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        el.style.setProperty('--spotlight-x', `${x}px`)
        el.style.setProperty('--spotlight-y', `${y}px`)
      })
    }

    el.addEventListener('mousemove', handleMouseMove)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      el.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden group', className)}
      style={
        {
          '--spotlight-x': '50%',
          '--spotlight-y': '50%',
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${size}px circle at var(--spotlight-x) var(--spotlight-y), rgba(0, 112, 243, 0.08), transparent 70%)`,
        }}
      />
      {children}
    </div>
  )
}
