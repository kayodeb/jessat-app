'use client'

import React, { useEffect, useRef, useState } from 'react'
import anime from 'animejs'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface AnimatedCounterProps {
  value: number
  prefix?: string
  suffix?: string
  className?: string
  duration?: number
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  className = '',
  duration = 500,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const prevValueRef = useRef(value)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value)
      prevValueRef.current = value
      return
    }

    const start = prevValueRef.current
    const target = value
    const animObj = { val: start }

    const animation = anime({
      targets: animObj,
      val: target,
      round: 1,
      duration,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
      update: () => {
        setDisplayValue(Math.round(animObj.val))
      },
      complete: () => {
        prevValueRef.current = target
      },
    })

    return () => {
      animation.pause()
    }
  }, [value, duration, prefersReducedMotion])

  const formatted = new Intl.NumberFormat('fr-FR').format(displayValue)

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
