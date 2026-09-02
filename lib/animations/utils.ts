import anime from 'animejs'
import { MOTION_CONFIG } from './config'

/**
 * Animate a counter element from current value to target value smoothly
 */
export function animatePriceCounter(
  targetElement: HTMLElement | null,
  fromValue: number,
  toValue: number,
  onUpdate?: (val: number) => void
) {
  if (!targetElement) return
  
  const obj = { value: fromValue }
  
  return anime({
    targets: obj,
    value: toValue,
    round: 1,
    duration: MOTION_CONFIG.durations.slow,
    easing: MOTION_CONFIG.easings.smoothOut,
    update: () => {
      if (onUpdate) {
        onUpdate(Math.round(obj.value))
      }
    },
  })
}

/**
 * Stagger entrance animation for elements matching a selector inside a container
 */
export function animateStaggerEntrance(
  targets: HTMLElement[] | NodeListOf<Element> | string,
  delayOffset: number = 0
) {
  return anime({
    targets,
    opacity: [0, 1],
    translateY: [28, 0],
    scale: [0.97, 1],
    delay: anime.stagger(MOTION_CONFIG.delays.stagger, { start: delayOffset }),
    duration: MOTION_CONFIG.durations.slow,
    easing: MOTION_CONFIG.easings.smoothOut,
  })
}

/**
 * Cart badge bounce animation
 */
export function animateBadgePop(target: HTMLElement | null) {
  if (!target) return
  return anime({
    targets: target,
    scale: [1, 1.35, 1],
    duration: 380,
    easing: MOTION_CONFIG.easings.springOut,
  })
}
