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
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount)
}
