'use client'

import React, { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Star,
  ShoppingBag,
  Heart,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  Cpu,
  Zap,
  HardDrive,
  Layers,
  ChevronRight,
  ArrowRight,
  Share2,
  CheckCircle2,
  Sliders,
} from 'lucide-react'
import { PRODUCTS } from '@/data/products'
import { formatPrice, cn } from '@/lib/utils'
import { useCart } from '@/lib/context/cart-context'
import { useWishlist } from '@/lib/context/wishlist-context'
import { ProductCard } from '@/components/product/ProductCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params)
  const { slug } = resolvedParams

  const product = PRODUCTS.find((p) => p.slug === slug)

  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  if (!product) {
    notFound()
  }

  const isFavorite = isInWishlist(product.id)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2200)
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  // Related products
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4)

  const savings = product.compareAtPrice ? product.compareAtPrice - product.price : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Fil d'Ariane (Breadcrumbs) */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-zinc-950 transition-colors">
            Accueil
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/produits" className="hover:text-zinc-950 transition-colors">
            Machines & Composants
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-950 font-semibold">{product.name}</span>
        </nav>

        {/* Product Master Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 space-y-4 sticky top-28">
            {/* Main Stage Image */}
            <div className="relative w-full aspect-[4/3.5] rounded-3xl overflow-hidden bg-white border border-zinc-200 shadow-sm flex items-center justify-center group">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 650px"
              />

              {/* Badge */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.badge && (product.badge === 'Bestseller' || product.badge === 'Promo') && (
                  <Badge
                    variant={product.badge === 'Bestseller' ? 'bestseller' : 'promo'}
                    className="shadow-sm"
                  >
                    {product.badge}
                  </Badge>
                )}
              </div>

              {/* Wishlist & Share buttons */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-2xl bg-white/90 backdrop-blur-md text-zinc-700 hover:text-zinc-950 hover:bg-white border border-zinc-200 shadow-sm transition-all"
                  title="Partager cette machine"
                >
                  {copiedLink ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2.5 rounded-2xl backdrop-blur-md border shadow-sm transition-all ${
                    isFavorite
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-white/90 text-zinc-700 hover:text-zinc-950 hover:bg-white border-zinc-200'
                  }`}
                  title="Ajouter aux favoris"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Thumbnails row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white ${
                      selectedImageIndex === idx
                        ? 'border-zinc-950 ring-2 ring-zinc-950/10 scale-105 shadow-md'
                        : 'border-zinc-200 opacity-65 hover:opacity-100 hover:border-zinc-400'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Angle ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Specs, Pricing & Purchase CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Brand & Rating Header */}
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                <span className="font-bold tracking-wider uppercase text-zinc-400">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1.5 text-zinc-900">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-xs">{product.rating}</span>
                  <span className="text-zinc-400">({product.reviewCount} avis vérifiés)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Pricing Card */}
            <div className="p-5 rounded-2xl bg-zinc-100/80 border border-zinc-200/80 space-y-2">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-zinc-950">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-base text-zinc-400 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  En Stock
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                TVA de 20% incluse • Livraison express gratuite dès 50 000 FCFA • Possibilité de régler en 3x ou 4x sans frais
              </p>
            </div>

            {/* Hardware Key Specs Grid */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                Composants Clés Intégrés :
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {product.specifications.cpu && (
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
                    <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700 flex-shrink-0">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] text-zinc-400 font-medium block">Processeur</span>
                      <span className="font-semibold text-zinc-900 truncate block">
                        {product.specifications.cpu}
                      </span>
                    </div>
                  </div>
                )}

                {product.specifications.gpu && (
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-blue-50/70 border border-blue-100 shadow-2xs">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] text-blue-600 font-medium block">Carte Graphique</span>
                      <span className="font-bold text-blue-950 truncate block">
                        {product.specifications.gpu}
                      </span>
                    </div>
                  </div>
                )}

                {product.specifications.ram && (
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
                    <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700 flex-shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] text-zinc-400 font-medium block">Mémoire Vive</span>
                      <span className="font-semibold text-zinc-900 truncate block">
                        {product.specifications.ram}
                      </span>
                    </div>
                  </div>
                )}

                {product.specifications.storage && (
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
                    <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700 flex-shrink-0">
                      <HardDrive className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] text-zinc-400 font-medium block">Stockage NVMe</span>
                      <span className="font-semibold text-zinc-900 truncate block">
                        {product.specifications.storage}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Benchmarks Badge */}
            {product.benchmarks && (
              <div className="p-4 rounded-2xl bg-zinc-950 text-white space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Performances Mesurées en 4K Ultra</span>
                  <span className="text-emerald-400">Score {product.benchmarks.gamingScore4k}/100</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-zinc-800">
                  <div>
                    <span className="text-[11px] text-zinc-400 block">Cyberpunk 2077 4K RT :</span>
                    <strong className="text-white text-sm">~{product.benchmarks.fpsCyberpunk4k} FPS</strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-400 block">Warzone Compétitif 4K :</span>
                    <strong className="text-white text-sm">~{product.benchmarks.fpsWarzone4k} FPS</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-zinc-300 rounded-xl bg-white h-12 px-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-full flex items-center justify-center text-zinc-600 hover:text-zinc-950 font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-zinc-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-full flex items-center justify-center text-zinc-600 hover:text-zinc-950 font-bold"
                  >
                    +
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  variant="primary"
                  size="lg"
                  className="flex-1 h-12 gap-2 font-bold shadow-lg"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Ajouté au Panier !</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Ajouter au Panier</span>
                    </>
                  )}
                </Button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={cn(
                    'w-12 h-12 rounded-xl border flex items-center justify-center transition-all',
                    isInWishlist(product.id)
                      ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-xs'
                      : 'border-zinc-300 bg-white text-zinc-600 hover:border-zinc-950 hover:text-zinc-950'
                  )}
                  title={isInWishlist(product.id) ? 'Retirer de ma liste d\'envies' : 'Ajouter à ma liste d\'envies'}
                  aria-label={isInWishlist(product.id) ? 'Retirer de ma liste d\'envies' : 'Ajouter à ma liste d\'envies'}
                >
                  <Heart
                    className={cn(
                      'w-5 h-5 transition-transform active:scale-125',
                      isInWishlist(product.id) && 'fill-rose-500 text-rose-500'
                    )}
                  />
                </button>
              </div>

              <Link href="/#configurator" className="block">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full gap-2 text-xs font-semibold border-zinc-300 hover:border-zinc-950"
                >
                  <Sliders className="w-4 h-4 text-blue-600" />
                  <span>Personnaliser ce modèle dans le configurateur sur-mesure</span>
                </Button>
              </Link>
            </div>

            {/* Trust Assurances */}
            <div className="pt-4 border-t border-zinc-200 space-y-2.5 text-xs text-zinc-600">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Livraison Sécurisée en double caisse renforcée sous 24 à 48 heures.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Garantie constructeur 3 ans intégrale pièces et main d'œuvre.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                <span>30 jours pour tester chez vous, satisfait ou remboursé sous 48h.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description & Specifications Section */}
        <div className="my-20 p-8 sm:p-12 bg-white rounded-3xl border border-zinc-200 shadow-sm space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Conception & Philosophie
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight mt-1">
              L'Excellence jusque dans le moindre détail
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-4 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Full Specifications Table */}
          <div className="pt-6 border-t border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-950 mb-4">Fiche Technique Complète</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 border border-zinc-150"
                >
                  <span className="font-semibold text-zinc-500 uppercase tracking-wider text-[11px]">
                    {key === 'cpu'
                      ? 'Processeur'
                      : key === 'gpu'
                      ? 'Carte Graphique'
                      : key === 'ram'
                      ? 'Mémoire RAM'
                      : key === 'storage'
                      ? 'Stockage SSD'
                      : key === 'cooling'
                      ? 'Refroidissement'
                      : key === 'motherboard'
                      ? 'Carte Mère'
                      : key === 'powerSupply'
                      ? 'Alimentation'
                      : key === 'screen'
                      ? 'Écran & Dalle'
                      : key === 'weight'
                      ? 'Poids'
                      : key === 'sensor'
                      ? 'Capteur Optique'
                      : key === 'dpi'
                      ? 'Résolution DPI'
                      : key === 'switch'
                      ? 'Interrupteurs'
                      : key === 'connectivity'
                      ? 'Connectivité'
                      : key === 'battery'
                      ? 'Autonomie Batterie'
                      : key === 'printSpeed'
                      ? 'Vitesse dimpression'
                      : key === 'resolution'
                      ? 'Résolution'
                      : key === 'brightness'
                      ? 'Luminosité'
                      : key === 'throwRatio'
                      ? 'Rapport de projection'
                      : key === 'ports'
                      ? 'Connectique'
                      : key}
                  </span>
                  <span className="font-bold text-zinc-900 text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="my-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-blue-600">
                Recommandations
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950">
                Machines Complémentaires
              </h2>
            </div>
            <Link
              href="/produits"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 hover:text-blue-600 transition-colors"
            >
              <span>Voir tout le catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
    </div>
  )
}
