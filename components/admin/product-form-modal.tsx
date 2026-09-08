'use client'

import { useState, useEffect, FormEvent } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'
import { Product, ProductCategory } from '@/types/product'
import { CategoryItem } from '@/types/category'

interface ProductFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (productData: any) => void
  initialProduct?: Product | null
  categories: CategoryItem[]
}

export function ProductFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialProduct,
  categories,
}: ProductFormModalProps) {
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('AERO RIGS')
  const [tagline, setTagline] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState<number>(0)
  const [compareAtPrice, setCompareAtPrice] = useState<number | undefined>(undefined)
  const [category, setCategory] = useState<ProductCategory>('ordinateurs')
  const [stockCount, setStockCount] = useState<number>(10)
  const [condition, setCondition] = useState<'neuf' | 'venu'>('neuf')
  const [badge, setBadge] = useState<'Bestseller' | 'Promo' | ''>('')
  const [featured, setFeatured] = useState<boolean>(false)
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=85',
  ])
  const [imageUrlInput, setImageUrlInput] = useState('')

  // Specs
  const [cpu, setCpu] = useState('')
  const [gpu, setGpu] = useState('')
  const [ram, setRam] = useState('')
  const [storage, setStorage] = useState('')

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name)
      setBrand(initialProduct.brand || 'AERO RIGS')
      setTagline(initialProduct.tagline || '')
      setDescription(initialProduct.description || '')
      setPrice(initialProduct.price)
      setCompareAtPrice(initialProduct.compareAtPrice)
      setCategory(initialProduct.category)
      setStockCount(initialProduct.stockCount)
      setCondition(initialProduct.condition || 'neuf')
      setBadge(initialProduct.badge || '')
      setFeatured(!!initialProduct.featured)
      setImages(
        initialProduct.images.length > 0
          ? initialProduct.images
          : [
              'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=85',
            ]
      )
      if (initialProduct.specifications) {
        setCpu(initialProduct.specifications.cpu || '')
        setGpu(initialProduct.specifications.gpu || '')
        setRam(initialProduct.specifications.ram || '')
        setStorage(initialProduct.specifications.storage || '')
      }
    } else {
      setName('')
      setBrand('AERO RIGS')
      setTagline('')
      setDescription('')
      setPrice(0)
      setCompareAtPrice(undefined)
      setCategory('ordinateurs')
      setStockCount(10)
      setCondition('neuf')
      setBadge('')
      setFeatured(false)
      setImages([
        'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=85',
      ])
      setCpu('')
      setGpu('')
      setRam('')
      setStorage('')
    }
  }, [initialProduct, isOpen])

  if (!isOpen) return null

  const handleAddImage = () => {
    if (imageUrlInput.trim()) {
      setImages((prev) => [...prev, imageUrlInput.trim()])
      setImageUrlInput('')
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')

    const payload = {
      name,
      slug: initialProduct?.slug || slug,
      brand,
      tagline: tagline || name,
      description: description || name,
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
      badge: badge || undefined,
      category,
      condition,
      inStock: Number(stockCount) > 0,
      stockCount: Number(stockCount),
      rating: initialProduct?.rating || 5.0,
      reviewCount: initialProduct?.reviewCount || 0,
      featured,
      images:
        images.length > 0
          ? images
          : [
              'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=85',
            ],
      specifications: {
        cpu,
        gpu,
        ram,
        storage,
      },
    }

    onSubmit(payload)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200/80 rounded-3xl w-full max-w-3xl my-8 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              {initialProduct ? 'Modifier le Produit' : 'Créer un Nouveau Produit'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Renseignez les détails du produit dans le catalogue.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* General info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Nom du Produit *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ex: Aero Apex One Extreme"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Marque</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="ex: AERO RIGS"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Prix (€) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Prix d'origine (€)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={compareAtPrice || ''}
                onChange={(e) =>
                  setCompareAtPrice(e.target.value ? Number(e.target.value) : undefined)
                }
                placeholder="ex: 4299"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Quantité en Stock *
              </label>
              <input
                type="number"
                required
                min="0"
                value={stockCount}
                onChange={(e) => setStockCount(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Catégorie *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">État</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as 'neuf' | 'venu')}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
              >
                <option value="neuf">Neuf</option>
                <option value="venu">Venu (Reconditionné)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Badge</label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value as 'Bestseller' | 'Promo' | '')}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
              >
                <option value="">Aucun</option>
                <option value="Bestseller">Bestseller</option>
                <option value="Promo">Promo</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Slogan (Tagline)</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="ex: L'apogée de l'architecture gaming 4K"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description complète du produit..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
            />
          </div>

          {/* Specifications */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
            <span className="font-bold text-slate-900 block">Spécifications clés</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-500 block mb-1">Processeur (CPU)</label>
                <input
                  type="text"
                  value={cpu}
                  onChange={(e) => setCpu(e.target.value)}
                  placeholder="ex: Ryzen 7 9800X3D"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1">Carte Graphique (GPU)</label>
                <input
                  type="text"
                  value={gpu}
                  onChange={(e) => setGpu(e.target.value)}
                  placeholder="ex: RTX 5090 24GB"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1">RAM</label>
                <input
                  type="text"
                  value={ram}
                  onChange={(e) => setRam(e.target.value)}
                  placeholder="ex: 64 Go DDR5 6000MHz"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1">Stockage</label>
                <input
                  type="text"
                  value={storage}
                  onChange={(e) => setStorage(e.target.value)}
                  placeholder="ex: 2 To SSD NVMe PCIe 5.0"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block font-bold text-slate-700 mb-2">
              Images du produit (URLs)
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Ajouter
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {images.map((url, i) => (
                <div
                  key={i}
                  className="relative group w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100"
                >
                  <img
                    src={url}
                    alt={`Aperçu ${i}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute inset-0 bg-rose-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Featured checkbox */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 bg-slate-50"
            />
            <label htmlFor="featured" className="text-slate-700 font-semibold">
              Mettre en avant ce produit sur la page d'accueil (Featured)
            </label>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md shadow-blue-600/30 transition-all"
            >
              {initialProduct ? 'Enregistrer les modifications' : 'Créer le produit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
