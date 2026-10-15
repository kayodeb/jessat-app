'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Package,
  Boxes,
  Tag,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Plus,
  ArrowRight,
  RefreshCw,
  ChevronDown,
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/admin-header'
import { AdminDashboardSkeleton } from '@/components/admin/admin-dashboard-skeleton'
import { useAdminStore } from '@/lib/admin-store'
import { ProductFormModal } from '@/components/admin/product-form-modal'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/lib/utils'

export default function AdminDashboardPage() {
  const {
    products,
    categories,
    promotions,
    movements,
    orders,
    stats,
    isLoading,
    addProduct,
    adjustStock,
  } = useAdminStore()

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [restockProductId, setRestockProductId] = useState<string | null>(null)
  const [restockQty, setRestockQty] = useState<number>(10)

  // Calculated Metrics (using backend stats when available)
  const totalProducts = stats?.totalProducts ?? products.length
  const totalStockValue = products.reduce(
    (acc, p) => acc + p.price * p.stockCount,
    0
  )
  const lowStockProducts = products.filter((p) => p.stockCount <= 5)
  const lowStockCount = stats?.lowStockProducts ?? lowStockProducts.length
  const activePromotions = promotions.filter((p) => p.isActive)

  const handleQuickRestock = (productId: string) => {
    adjustStock(productId, restockQty, 'Réassort rapide depuis le tableau de bord')
    setRestockProductId(null)
  }

  // Category distribution for visual stats
  const categoryStats = categories.slice(0, 4).map((cat) => {
    const count = products.filter((p) => p.category === cat.slug).length
    return {
      name: cat.name,
      count,
      color: cat.accentColor || '#3b82f6',
    }
  })

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <AdminHeader
        title="Rapport de Gestion & Dashboard"
        subtitle="Vue d'ensemble de l'activité, du stock et des performances."
        lowStockAlertsCount={lowStockProducts.length}
      />

      <main className="flex-1 overflow-y-auto space-y-6 max-w-7xl w-full mx-auto pr-2 pb-12">
        {isLoading && products.length === 0 ? (
          <AdminDashboardSkeleton />
        ) : (
          <>
            {/* TOP ROW: 4 DealDeck Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: PRIMARY BLUE 900 HERO CARD (Chiffre d'affaires / Valeur Stock en FCFA) */}
          <div className="bg-blue-900 text-white rounded-3xl p-6 shadow-sm border border-blue-950 relative overflow-hidden flex flex-col justify-between h-44">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="bg-emerald-400/20 backdrop-blur-md text-emerald-300 font-extrabold text-xs px-2.5 py-1 rounded-full border border-emerald-300/30 flex items-center gap-1">
                En direct
              </span>
            </div>

            <div>
              <span className="text-xs text-blue-200 font-medium block">
                {stats?.totalRevenue ? "Chiffre d'Affaires Réalisé" : 'Valeur Totale du Stock'}
              </span>
              <div className="text-2xl sm:text-3xl font-black tracking-tight mt-1 truncate">
                {formatPrice(stats?.totalRevenue ?? totalStockValue)}
              </div>
              <span className="text-[11px] text-blue-200/80 block mt-1">
                {stats?.totalOrders ? `${stats.totalOrders} commandes traitées` : 'Valeur estimée du catalogue actuel'}
              </span>
            </div>
          </div>

          {/* Card 2: White Card (Total Produits) */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between h-44 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700">
                <Package className="w-5 h-5" />
              </div>
              <span className="bg-slate-100 text-slate-700 font-extrabold text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                Catalogue
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold block">
                Total Produits
              </span>
              <div className="text-3xl font-black text-slate-900 tracking-tight mt-1">
                {totalProducts}
              </div>
              <span className="text-[11px] text-slate-400 block mt-1">
                Répartis dans {categories.length} catégories
              </span>
            </div>
          </div>

          {/* Card 3: White Card (Alertes Stock Faible) */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between h-44 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="bg-rose-100 text-rose-700 font-extrabold text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                {lowStockCount > 0 ? 'À réapprovisionner' : 'Stock OK'}
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold block">
                Alertes Stock Faible
              </span>
              <div className="text-3xl font-black text-slate-900 tracking-tight mt-1">
                {lowStockCount}
              </div>
              <span className="text-[11px] text-rose-500 font-semibold block mt-1">
                Produits ≤ 5 en stock
              </span>
            </div>
          </div>

          {/* Card 4: White Card (Promotions Actives ou Utilisateurs) */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between h-44 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Tag className="w-5 h-5" />
              </div>
              <span className="bg-purple-100 text-purple-700 font-extrabold text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                Actif
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold block">
                {stats?.totalUsers !== undefined ? 'Utilisateurs Inscrits' : 'Promotions Actives'}
              </span>
              <div className="text-3xl font-black text-slate-900 tracking-tight mt-1">
                {stats?.totalUsers ?? activePromotions.length}
              </div>
              <span className="text-[11px] text-slate-400 block mt-1">
                {stats?.pendingOrders !== undefined
                  ? `${stats.pendingOrders} commande(s) en attente`
                  : `${promotions.length} codes configurés au total`}
              </span>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS BANNER */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-900 animate-pulse" />
              Actions de Gestion Rapide
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Ajoutez un produit, gérez l'inventaire ou publiez un code promo.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex-1 md:flex-initial px-5 py-2.5 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" /> Nouveau Produit
            </button>

            <Link
              href="/admin/stock"
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-200/60"
            >
              <Boxes className="w-4 h-4 text-blue-900" />
              Gérer les Stocks
            </Link>

            <Link
              href="/admin/promotions"
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-200/60"
            >
              <Tag className="w-4 h-4 text-purple-600" />
              Créer Promo
            </Link>
          </div>
        </div>

        {/* MAIN GRID: 2 COLUMNS IN DEALDECK STYLE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT 2 COLUMNS: Visual Inventory Charts & Low Stock Alerts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Visual Inventory Activity Chart Box */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Activité & Flux du Stock
                  </h3>
                  <p className="text-xs text-slate-400">
                    Suivi en temps réel des entrées (réassorts) et sorties (ventes)
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600">
                  <span>{movements.length} mouvement(s)</span>
                </div>
              </div>

              {movements.length === 0 ? (
                <div className="h-44 flex flex-col items-center justify-center text-center p-6 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 my-2">
                  <Boxes className="w-8 h-8 text-slate-300 mb-2" />
                  <p className="text-xs font-bold text-slate-700">Aucun flux de stock pour le moment</p>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-sm">
                    Les flux d'entrées et sorties s'enregistreront automatiquement lors des réassorts et des commandes clients.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
                        {movements.filter((m) => m.changeQuantity > 0 || m.type === 'RESTOCK').length}
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 block">Réassorts (Entrées)</span>
                        <span className="text-[11px] text-slate-400">Opérations d'approvisionnement</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center font-bold">
                        {movements.filter((m) => m.changeQuantity < 0 || m.type === 'SALE').length}
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 block">Sorties & Ventes</span>
                        <span className="text-[11px] text-slate-400">Commandes expédiées</span>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-36 overflow-y-auto">
                    {movements.slice(0, 3).map((mov, idx) => (
                      <div key={mov.id || `mov-top-${idx}`} className="py-2.5 flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800 truncate max-w-[240px]">
                          {mov.productName}
                        </span>
                        {(() => {
                          const qty = Number(mov.changeQuantity) || 0
                          const isPositive = qty > 0
                          return (
                            <span
                              className={`font-mono font-bold text-xs px-2 py-0.5 rounded-md ${
                                isPositive
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-rose-50 text-rose-700'
                              }`}
                            >
                              {isPositive ? `+${qty}` : `${qty}`}
                            </span>
                          )
                        })()}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Low Stock Table Panel */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Alertes Stock Faible ({lowStockProducts.length})
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Nécessitent un réapprovisionnement
                    </p>
                  </div>
                </div>
                <Link
                  href="/admin/stock"
                  className="text-xs text-blue-900 hover:underline font-bold flex items-center gap-1"
                >
                  Voir tout <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {lowStockProducts.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    Aucune alerte. Le niveau de stock est optimal.
                  </div>
                ) : (
                  lowStockProducts.map((product) => (
                    <div
                      key={product.id}
                      className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors px-2 rounded-xl"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-10 h-10 rounded-xl object-cover bg-slate-100 border border-slate-200 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-800 truncate">
                            {product.name}
                          </h4>
                          <p className="text-[10px] text-slate-400 capitalize">
                            {product.category} • {formatPrice(product.price)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          {product.stockCount} restants
                        </span>

                        {restockProductId === product.id ? (
                          <div className="flex items-center gap-1">
                            <Input
                              type="number"
                              min="1"
                              value={restockQty}
                              onChange={(e) => setRestockQty(Number(e.target.value))}
                              className="w-16 h-8 px-2 py-1 text-xs"
                            />
                            <button
                              onClick={() => handleQuickRestock(product.id)}
                              className="px-2 py-1 bg-blue-900 text-white text-[11px] font-bold rounded-lg shadow-sm"
                            >
                              Valider
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setRestockProductId(product.id)
                              setRestockQty(10)
                            }}
                            className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                          >
                            <RefreshCw className="w-3 h-3 text-blue-900" />
                            Réassort
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DealDeck Product Stats & Category Breakdown */}
          <div className="space-y-6">
            {/* Category Statistics Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Répartition du Catalogue
                </h3>
                <span className="text-xs text-slate-400 font-medium">Temps réel</span>
              </div>

              {/* Circular Gauge */}
              <div className="relative py-4 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full border-8 border-blue-900 border-t-slate-700 border-r-emerald-500 border-l-amber-400 flex items-center justify-center shadow-inner">
                  <div className="text-center">
                    <span className="text-2xl font-black text-slate-900 block leading-tight">
                      {totalProducts}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      Produits
                    </span>
                  </div>
                </div>
              </div>

              {/* Category list items */}
              <div className="space-y-3 mt-4 pt-4 border-t border-slate-100">
                {categoryStats.length === 0 ? (
                  <p className="text-center text-xs text-slate-400 py-3">Aucune catégorie répertoriée</p>
                ) : (
                  categoryStats.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-semibold text-slate-700 capitalize">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-bold text-slate-900 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-200/60">
                        {item.count} prods
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Inventory Movements Panel */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">Derniers Mouvements</h3>
                <Link
                  href="/admin/stock"
                  className="text-xs text-blue-900 font-bold hover:underline"
                >
                  Historique
                </Link>
              </div>

              <div className="divide-y divide-slate-100 my-2">
                {movements.length === 0 ? (
                  <p className="py-6 text-center text-xs text-slate-400">
                    Aucun mouvement récent enregistré
                  </p>
                ) : (
                  movements.slice(0, 4).map((mov, idx) => (
                    <div key={mov.id || `mov-rec-${idx}`} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <h4 className="font-bold text-slate-800 line-clamp-1">
                          {mov.productName}
                        </h4>
                        <p className="text-[10px] text-slate-400">{mov.reason || 'Mise à jour du stock'}</p>
                      </div>
                      {(() => {
                        const qty = Number(mov.changeQuantity) || 0
                        const isPositive = qty > 0
                        return (
                          <span
                            className={`font-mono font-extrabold px-2 py-0.5 rounded-md ${
                              isPositive
                                ? 'bg-emerald-50 text-emerald-600'
                                : 'bg-rose-50 text-rose-600'
                            }`}
                          >
                            {isPositive ? `+${qty}` : `${qty}`}
                          </span>
                        )
                      })()}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        </>
        )}

        {/* Modal Form */}
        <ProductFormModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={(data) => addProduct(data)}
          categories={categories}
        />
      </main>
    </div>
  )
}
