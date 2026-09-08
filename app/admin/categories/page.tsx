'use client'

import { useState } from 'react'
import { Plus, FolderTree, Edit2, Trash2, X, Package } from 'lucide-react'
import { AdminHeader } from '@/components/admin/admin-header'
import { useAdminStore } from '@/lib/admin-store'
import { CategoryItem } from '@/types/category'

export default function AdminCategoriesPage() {
  const { categories, products, addCategory, updateCategory, deleteCategory } =
    useAdminStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [accentColor, setAccentColor] = useState('#3b82f6')

  const handleOpenCreate = () => {
    setEditingCategory(null)
    setName('')
    setDescription('')
    setImageUrl('https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80')
    setAccentColor('#3b82f6')
    setIsModalOpen(true)
  }

  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingCategory(cat)
    setName(cat.name)
    setDescription(cat.description)
    setImageUrl(cat.imageUrl)
    setAccentColor(cat.accentColor || '#3b82f6')
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name,
        slug,
        description,
        imageUrl,
        accentColor,
      })
    } else {
      addCategory({
        name,
        slug,
        description,
        productCount: 0,
        imageUrl,
        accentColor,
      })
    }

    setIsModalOpen(false)
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <AdminHeader
        title="Catalogue & Catégories"
        subtitle="Organisez vos familles de produits et attribuez-leur des visuels d'accroche."
      />

      <main className="flex-1 overflow-y-auto space-y-6 max-w-7xl w-full mx-auto pr-2 pb-12">
        {/* Header Action (Sticky / Fixed) */}
        <div className="sticky top-0 z-20 bg-[#f3f4f8]/95 backdrop-blur-md pt-1 pb-2">
          <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-blue-900" />
                <span>{categories.length} Catégories configurées</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Chaque catégorie regroupe les produits visibles sur le site e-commerce.
              </p>
            </div>

            <button
              onClick={handleOpenCreate}
              className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-2xl flex items-center gap-2 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" /> Nouvelle Catégorie
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const catProductsCount = products.filter(
              (p) => p.category === cat.slug
            ).length

            return (
              <div
                key={cat.id}
                className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm group hover:shadow-md transition-all flex flex-col"
              >
                {/* Image Preview */}
                <div className="h-40 relative overflow-hidden bg-slate-100">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                  {/* Accent Color Badge */}
                  <div
                    className="absolute top-3 left-3 w-3.5 h-3.5 rounded-full border border-white shadow-sm"
                    style={{ backgroundColor: cat.accentColor || '#1e3a8a' }}
                  />

                  {/* Product Count Pill */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <Package className="w-3.5 h-3.5 text-blue-900" />
                    <span>{catProductsCount} produits</span>
                  </div>

                  <h3 className="absolute bottom-3 left-4 text-lg font-black text-white tracking-tight">
                    {cat.name}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-500 font-medium line-clamp-2">
                    {cat.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <span className="text-[11px] font-mono font-semibold text-slate-400">
                      slug: /{cat.slug}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(cat)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-blue-900 transition-colors"
                        title="Modifier"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => deleteCategory(cat.id)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Modal Form */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-sm font-bold text-slate-900">
                  {editingCategory ? 'Modifier la Catégorie' : 'Créer une Catégorie'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nom de la Catégorie *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ex: Smartwatches"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description d'accroche..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    URL d'image d'illustration
                  </label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Couleur d'accentuation (HEX)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-10 h-10 rounded-2xl border border-slate-200 cursor-pointer bg-slate-50"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-slate-900 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-2xl bg-slate-100 text-slate-700 font-semibold"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-2xl bg-blue-900 hover:bg-blue-800 font-bold text-white shadow-sm"
                  >
                    {editingCategory ? 'Enregistrer' : 'Créer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
