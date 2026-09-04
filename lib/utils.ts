export function cn(...classes: (string | undefined | null | false | Record<string, boolean>)[]) {
  const result: string[] = []

  for (const item of classes) {
    if (!item) continue
    if (typeof item === 'string') {
      result.push(item)
    } else if (typeof item === 'object') {
      for (const [key, value] of Object.entries(item)) {
        if (value) result.push(key)
      }
    }
  }

  return result.join(' ')
}

export function formatPrice(amount: number): string {
  const formatted = new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 0,
  }).format(Math.round(amount))
  return `${formatted} FCFA`
}
