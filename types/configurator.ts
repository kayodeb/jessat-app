export type ConfigCategory = 'cpu' | 'gpu' | 'ram' | 'storage' | 'cooling' | 'chassis'

export interface ConfigOption {
  id: string
  name: string
  subtitle: string
  brand: string
  priceDelta: number
  isDefault?: boolean
  badge?: string
  specs: {
    label: string
    value: string
  }[]
  benchmarkGain?: string
}

export interface ConfiguratorState {
  basePrice: number
  selectedOptions: {
    cpu: ConfigOption
    gpu: ConfigOption
    ram: ConfigOption
    storage: ConfigOption
    cooling: ConfigOption
    chassis: ConfigOption
  }
}
