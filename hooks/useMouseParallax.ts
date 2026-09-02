'use client'

import { useEffect, useRef } from 'react'

interface UseMouseTiltOptions {
  maxRotation?: number // maximum rotation in degrees (default 3deg)
  disabled?: boolean
}

export function useMouseTilt<T extends HTMLElement = HTMLDivElement>(
  options: UseMouseTiltOptions = {}
) {
  const { maxRotation = 3.5, disabled = false } = options
  const ref = useRef<T>(null)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || disabled) return

    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0
    let isHovered = false

    const update = () => {
      // Linear interpolation (lerp)
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12

      if (el) {
        if (isHovered) {
          el.style.transform = `perspective(1000px) rotateX(${currentY}deg) rotateY(${currentX}deg) translateY(-4px)`
        } else {
          el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`
        }
      }

      rafId.current = requestAnimationFrame(update)
    }

    rafId.current = requestAnimationFrame(update)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      // Calculate percentage from -1 to 1
      const normalizedX = x / (rect.width / 2)
      const normalizedY = y / (rect.height / 2)

      targetX = Math.max(-1, Math.min(1, normalizedX)) * maxRotation
      targetY = -Math.max(-1, Math.min(1, normalizedY)) * maxRotation
    }

    const handleMouseEnter = () => {
      isHovered = true
    }

    const handleMouseLeave = () => {
      isHovered = false
      targetX = 0
      targetY = 0
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseenter', handleMouseEnter)
      el.removeEventListener('mouseleave', handleMouseLeave)
      el.style.transform = ''
    }
  }, [maxRotation, disabled])

  return ref
}
