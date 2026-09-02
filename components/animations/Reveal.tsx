'use client'

import React, { useEffect, useRef } from 'react'
import anime from 'animejs'
import { useInViewAnimation } from '@/hooks/useInViewAnimation'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 650,
  direction = 'up',
  distance = 24,
  ...props
}: RevealProps) {
  const { ref, isInView } = useInViewAnimation<HTMLDivElement>({ threshold: 0.1, once: true })
  const contentRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return

    let translateY: number[] | number = 0
    let translateX: number[] | number = 0

    if (direction === 'up') translateY = [distance, 0]
    if (direction === 'down') translateY = [-distance, 0]
    if (direction === 'left') translateX = [distance, 0]
    if (direction === 'right') translateX = [-distance, 0]

    anime({
      targets: contentRef.current,
      opacity: [0, 1],
      translateY,
      translateX,
      delay,
      duration,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })
  }, [isInView, delay, duration, direction, distance, prefersReducedMotion])

  return (
    <div ref={ref} className={cn('overflow-visible', className)} {...props}>
      <div
        ref={contentRef}
        style={{
          opacity: prefersReducedMotion ? 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  )
}
