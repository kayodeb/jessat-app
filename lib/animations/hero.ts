import anime from 'animejs'
import { MOTION_CONFIG } from './config'

export function animateHeroEntrance(elements: {
  badge?: HTMLElement | null
  title?: HTMLElement | null
  subtitle?: HTMLElement | null
  ctas?: HTMLElement | null
  social?: HTMLElement | null
  image?: HTMLElement | null
  floatingChips?: (HTMLElement | null)[]
}) {
  const tl = anime.timeline({
    easing: MOTION_CONFIG.easings.smoothOut,
  })

  if (elements.badge) {
    tl.add({
      targets: elements.badge,
      opacity: [0, 1],
      translateY: [-10, 0],
      duration: 500,
    })
  }

  if (elements.title) {
    tl.add(
      {
        targets: elements.title,
        opacity: [0, 1],
        translateY: [35, 0],
        duration: MOTION_CONFIG.durations.hero,
      },
      '-=350'
    )
  }

  if (elements.subtitle) {
    tl.add(
      {
        targets: elements.subtitle,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: MOTION_CONFIG.durations.slow,
      },
      '-=450'
    )
  }

  if (elements.ctas) {
    tl.add(
      {
        targets: elements.ctas,
        opacity: [0, 1],
        translateY: [15, 0],
        scale: [0.96, 1],
        duration: MOTION_CONFIG.durations.normal,
      },
      '-=300'
    )
  }

  if (elements.social) {
    tl.add(
      {
        targets: elements.social,
        opacity: [0, 1],
        duration: 400,
      },
      '-=200'
    )
  }

  if (elements.image) {
    tl.add(
      {
        targets: elements.image,
        opacity: [0, 1],
        translateY: [40, 0],
        scale: [0.94, 1],
        duration: MOTION_CONFIG.durations.hero,
      },
      '-=700'
    )
  }

  const validChips = (elements.floatingChips || []).filter(Boolean)
  if (validChips.length > 0) {
    tl.add(
      {
        targets: validChips,
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.9, 1],
        delay: anime.stagger(120),
        duration: 500,
      },
      '-=400'
    )
  }

  return tl
}

export function startSubtleFloatAnimation(element: HTMLElement | null) {
  if (!element) return null

  return anime({
    targets: element,
    translateY: [0, -10, 0],
    duration: 5500,
    easing: 'easeInOutSine',
    loop: true,
  })
}
