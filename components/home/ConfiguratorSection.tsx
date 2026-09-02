'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { Cpu, Zap, HardDrive, Layers, ShieldCheck, Check, ShoppingBag, Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react'
import { CONFIGURATOR_CATEGORIES, CONFIGURATOR_OPTIONS } from '@/data/configurator'
import { ConfigCategory, ConfigOption } from '@/types/configurator'
import { formatPrice, cn } from '@/lib/utils'
import { useCart } from '@/lib/context/cart-context'
import { Button } from '@/components/ui/Button'
import { AnimatedCounter } from '@/components/animations/AnimatedCounter'
import { Reveal } from '@/components/animations/Reveal'

export function ConfiguratorSection() {
  const { addToCart } = useCart()
  const basePrice = 1499

  // Selected options state
  const [activeTab, setActiveTab] = useState<ConfigCategory>('cpu')
  const [selectedCpu, setSelectedCpu] = useState<ConfigOption>(CONFIGURATOR_OPTIONS.cpu[0])
  const [selectedGpu, setSelectedGpu] = useState<ConfigOption>(CONFIGURATOR_OPTIONS.gpu[0])
  const [selectedRam, setSelectedRam] = useState<ConfigOption>(CONFIGURATOR_OPTIONS.ram[0])
  const [selectedStorage, setSelectedStorage] = useState<ConfigOption>(CONFIGURATOR_OPTIONS.storage[0])
  const [selectedCooling, setSelectedCooling] = useState<ConfigOption>(CONFIGURATOR_OPTIONS.cooling[0])
  const [selectedChassis, setSelectedChassis] = useState<ConfigOption>(CONFIGURATOR_OPTIONS.chassis[0])
  const [isAdded, setIsAdded] = useState(false)

  // Calculate total price dynamically
  const totalPrice = useMemo(() => {
    return (
      basePrice +
      selectedCpu.priceDelta +
      selectedGpu.priceDelta +
      selectedRam.priceDelta +
      selectedStorage.priceDelta +
      selectedCooling.priceDelta +
      selectedChassis.priceDelta
    )
  }, [
    basePrice,
    selectedCpu.priceDelta,
    selectedGpu.priceDelta,
    selectedRam.priceDelta,
    selectedStorage.priceDelta,
    selectedCooling.priceDelta,
    selectedChassis.priceDelta,
  ])

  const getCurrentOption = (cat: ConfigCategory) => {
    switch (cat) {
      case 'cpu': return selectedCpu
      case 'gpu': return selectedGpu
      case 'ram': return selectedRam
      case 'storage': return selectedStorage
      case 'cooling': return selectedCooling
      case 'chassis': return selectedChassis
    }
  }

  const handleSelectOption = (cat: ConfigCategory, option: ConfigOption) => {
    switch (cat) {
      case 'cpu': setSelectedCpu(option); break
      case 'gpu': setSelectedGpu(option); break
      case 'ram': setSelectedRam(option); break
      case 'storage': setSelectedStorage(option); break
      case 'cooling': setSelectedCooling(option); break
      case 'chassis': setSelectedChassis(option); break
    }
  }

  const handleAddToCart = () => {
    const customProduct = {
      id: `custom-rig-${Date.now()}`,
      name: `AERO CUSTOM RIG [${selectedGpu.name}]`,
      slug: 'aero-custom-rig',
      brand: 'AERO CUSTOM',
      tagline: `${selectedCpu.name} • ${selectedGpu.name} • ${selectedRam.name}`,
      description: `Configuration sur-mesure assemblée en France : ${selectedCpu.name}, ${selectedGpu.name}, ${selectedRam.name}, ${selectedStorage.name}, ${selectedCooling.name}, ${selectedChassis.name}.`,
      price: totalPrice,
      rating: 5.0,
      reviewCount: 1,
      category: 'gaming-pc' as const,
      images: ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=85'],
      specifications: {
        cpu: selectedCpu.name,
        gpu: selectedGpu.name,
        ram: selectedRam.name,
        storage: selectedStorage.name,
        cooling: selectedCooling.name,
      },
      inStock: true,
      stockCount: 5,
    }

    addToCart(customProduct, 1, {
      CPU: selectedCpu.name,
      GPU: selectedGpu.name,
      RAM: selectedRam.name,
      Stockage: selectedStorage.name,
      Refroidissement: selectedCooling.name,
      Boîtier: selectedChassis.name,
    }, totalPrice)

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <section id="configurator" className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio de Conception Sur-Mesure</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              BUILD YOUR MACHINE.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              Personnalisez chaque composant clé. Le prix se recalcule instantanément avec nos
              tarifs constructeur directs et nos tests de compatibilité matérielle validés.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Category Tabs & Option Picker */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category Selector Tabs */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 bg-zinc-900/90 p-1.5 rounded-2xl border border-zinc-800">
              {CONFIGURATOR_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={cn(
                    'py-2.5 px-2 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center gap-1',
                    activeTab === cat.id
                      ? 'bg-white text-zinc-950 shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  )}
                >
                  <span className="truncate w-full">{cat.label.split(' ')[0]}</span>
                  <span className="text-[10px] opacity-70 truncate font-normal">
                    {getCurrentOption(cat.id).brand.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Options List for Active Category */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
                <span>Sélectionnez votre option :</span>
                <span className="text-blue-400 font-semibold">
                  {CONFIGURATOR_CATEGORIES.find((c) => c.id === activeTab)?.description}
                </span>
              </div>

              {CONFIGURATOR_OPTIONS[activeTab].map((option) => {
                const isSelected = getCurrentOption(activeTab).id === option.id
                return (
                  <div
                    key={option.id}
                    onClick={() => handleSelectOption(activeTab, option)}
                    className={cn(
                      'p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group',
                      isSelected
                        ? 'bg-zinc-900 border-blue-500 ring-1 ring-blue-500/40 shadow-lg shadow-blue-500/10'
                        : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/70'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          'w-6 h-6 rounded-full border flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors',
                          isSelected
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'border-zinc-700 bg-zinc-800'
                        )}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                            {option.name}
                          </span>
                          {option.badge && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/30">
                              {option.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">{option.subtitle}</p>

                        <div className="flex flex-wrap gap-2 pt-1">
                          {option.specs.map((spec, i) => (
                            <span
                              key={i}
                              className="text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/50"
                            >
                              {spec.label}: <strong className="text-white">{spec.value}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:flex-col sm:items-end flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
                      <span
                        className={cn(
                          'text-sm font-black',
                          option.priceDelta > 0 ? 'text-blue-400' : 'text-zinc-400'
                        )}
                      >
                        {option.priceDelta === 0 ? 'Inclus' : `+${formatPrice(option.priceDelta)}`}
                      </span>
                      {option.benchmarkGain && (
                        <span className="text-[11px] text-emerald-400 font-medium">
                          {option.benchmarkGain}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Live Summary, Price Ticker & Visual */}
          <div className="lg:col-span-5 bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-2xl relative">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 mb-6 group">
              <Image
                src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
                alt="PC Configuré"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 rounded-full bg-zinc-900/80 backdrop-blur-md text-white font-medium border border-zinc-700">
                  {selectedChassis.name}
                </span>
                <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Compatibilité 100% Validée
                </span>
              </div>
            </div>

            {/* Spec breakdown */}
            <div className="space-y-2.5 pb-6 border-b border-zinc-800 text-xs">
              <div className="flex justify-between items-center text-zinc-400">
                <span className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-zinc-500" /> CPU
                </span>
                <span className="text-zinc-200 font-semibold truncate max-w-[200px]">
                  {selectedCpu.name}
                </span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-blue-400" /> GPU
                </span>
                <span className="text-zinc-200 font-semibold truncate max-w-[200px]">
                  {selectedGpu.name}
                </span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-zinc-500" /> RAM
                </span>
                <span className="text-zinc-200 font-semibold">{selectedRam.name}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span className="flex items-center gap-2">
                  <HardDrive className="w-3.5 h-3.5 text-zinc-500" /> Stockage
                </span>
                <span className="text-zinc-200 font-semibold">{selectedStorage.name}</span>
              </div>
            </div>

            {/* Price calculation summary */}
            <div className="pt-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-zinc-400 block font-medium">Prix Total Configuration TTC</span>
                  <span className="text-3xl font-black tracking-tight text-white">
                    <AnimatedCounter value={totalPrice} suffix=" €" />
                  </span>
                </div>
                <span className="text-xs text-zinc-400">
                  ou dès <strong className="text-white">{Math.round(totalPrice / 4)} € / mois</strong> en 4x
                </span>
              </div>

              <Button
                onClick={handleAddToCart}
                variant="accent"
                size="lg"
                className="w-full flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30"
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Configuration ajoutée au Panier !</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Commander cette Configuration</span>
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 text-center">
                <span>Montage professionnel + Câble management + 72h de rodage inclus</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
