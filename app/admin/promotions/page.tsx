'use client'

import { useState } from 'react'
import {
  Tag,
  Plus,
  Calendar,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  X,
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/admin-header'
import { useAdminStore } from '@/lib/admin-store'
import { Promotion } from '@/types/admin'

export default function AdminPromotionsPage() {
  const { promotions, addPromotion, updatePromotion, deletePromotion } =
    useAdminStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null)

  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage')
  const [discountValue, setDiscountValue] = useState<number>(10)
  const [startDate, setStartDate] = useState('2026-09-01')
  const [endDate, setEndDate] = useState('2026-12-31')
  const [minPurchase, setMinPurchase] = useState<number>(0)
  const [usageLimit, setUsageLimit] = useState<number>(100)
  const [isActive, setIsActive] = useState<boolean>(true)

  const handleOpenCreate = () => {
    setEditingPromo(null)
    setCode('')
    setDescription('')
    setDiscountType('percentage')
    setDiscountValue(10)
    setStartDate('2026-09-01')
    setEndDate('2026-12-31')
    setMinPurchase(0)
    setUsageLimit(100)
    setIsActive(true)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (promo: Promotion) => {
    setEditingPromo(promo)
    setCode(promo.code)
    setDescription(promo.description)
    setDiscountType(promo.discountType)
    setDiscountValue(promo.discountValue)
    setStartDate(promo.startDate)
    setEndDate(promo.endDate)
    setMinPurchase(promo.minPurchase)
    setUsageLimit(promo.usageLimit)
    setIsActive(promo.isActive)
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingPromo) {
      updatePromotion(editingPromo.id, {
        code: code.toUpperCase().trim(),
        description,
        discountType,
        discountValue: Number(discountValue),
        startDate,
        endDate,
        minPurchase: Number(minPurchase),
        usageLimit: Number(usageLimit),
        isActive,
      })
    } else {
      addPromotion({
        code: code.toUpperCase().trim(),
        description,
        discountType,
        discountValue: Number(discountValue),
        startDate,
        endDate,
        minPurchase: Number(minPurchase),
        usageLimit: Number(usageLimit),
        isActive,
      })
    }

    setIsModalOpen(false)
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <AdminHeader
        title="Gestion des Promotions & Offres"
        subtitle="Créez des codes de réduction, fixez des périodes d'offre et suivez les utilisations."
      />

      <main className="flex-1 overflow-y-auto space-y-6 max-w-7xl w-full mx-auto pr-2 pb-12">
        {/* Controls Bar (Sticky / Fixed) */}
        <div className="sticky top-0 z-20 bg-[#f3f4f8]/95 backdrop-blur-md pt-1 pb-2">
          <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-900" />
                <span>{promotions.length} Offres & Codes promo configurés</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Ces réductions s'appliquent lors de la validation du panier sur la boutique.
              </p>
            </div>

            <button
              onClick={handleOpenCreate}
              className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-2xl flex items-center gap-2 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" /> Nouvelle Promotion
            </button>
          </div>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className={`bg-white border rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between transition-all ${
                promo.isActive
                  ? 'border-blue-200 shadow-blue-900/5'
                  : 'border-slate-200 opacity-60'
              }`}
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-base font-black text-blue-900 px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 tracking-wider">
                    {promo.code}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                      promo.isActive
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {promo.isActive ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" /> Inactive
                      </>
                    )}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black text-slate-900">
                    {promo.discountType === 'percentage'
                      ? `-${promo.discountValue}%`
                      : `-${promo.discountValue} €`}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 font-medium mt-4 mb-4">
                {promo.description}
              </p>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-[11px]">
                <div>
                  <span className="text-slate-400 block font-semibold">Période de validité</span>
                  <span className="text-slate-800 font-bold flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3 text-blue-900" />
                    {promo.startDate} au {promo.endDate}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-semibold">Utilisations</span>
                  <span className="text-slate-800 font-bold mt-0.5 block">
                    {promo.usageCount} / {promo.usageLimit} réclamées
                  </span>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-xs">
                <span className="text-slate-500 font-medium">
                  {promo.minPurchase > 0
                    ? `Achat min : ${promo.minPurchase} €`
                    : 'Sans minimum d\'achat'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updatePromotion(promo.id, { isActive: !promo.isActive })
                    }
                    className={`px-3 py-1 rounded-xl font-bold text-[11px] transition-colors ${
                      promo.isActive
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {promo.isActive ? 'Désactiver' : 'Activer'}
                  </button>

                  <button
                    onClick={() => handleOpenEdit(promo)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-purple-600"
                    title="Modifier"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => deletePromotion(promo.id)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600"
                    title="Supprimer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Form */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-sm font-bold text-slate-900">
                  {editingPromo ? 'Modifier la Promotion' : 'Créer une Promotion'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Code Promo *
                    </label>
                    <input
                      type="text"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="ex: SUMMER20"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-slate-900 font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Type de Réduction *
                    </label>
                    <select
                      value={discountType}
                      onChange={(e) => setDiscountType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    >
                      <option value="percentage">Pourcentage (%)</option>
                      <option value="fixed">Montant Fixe (€)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Valeur de la Réduction *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Description d'offre *
                  </label>
                  <input
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="ex: 15% de réduction à partir de 100€ d'achat"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Date de début
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Date de fin
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Achat minimum (€)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={minPurchase}
                      onChange={(e) => setMinPurchase(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Limite d'utilisations
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={usageLimit}
                      onChange={(e) => setUsageLimit(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500 bg-slate-50"
                  />
                  <label htmlFor="isActive" className="text-slate-700 font-semibold">
                    Activer immédiatement cette promotion
                  </label>
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
                    className="px-4 py-2 rounded-2xl bg-purple-600 hover:bg-purple-500 font-bold text-white shadow-md shadow-purple-600/30"
                  >
                    {editingPromo ? 'Enregistrer' : 'Créer'}
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
