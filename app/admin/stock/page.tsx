'use client'

import { useState, useMemo, useEffect } from 'react'
import {
  Boxes,
  AlertTriangle,
  History,
  Search,
  RefreshCw,
  SlidersHorizontal,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/admin-header'
import { useAdminStore } from '@/lib/admin-store'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export default function AdminStockPage() {
  const { products, movements, adjustStock } = useAdminStore()

  // Active view: 'inventory' or 'history'
  const [activeTab, setActiveTab] = useState<'inventory' | 'history'>('inventory')

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [filterMode, setFilterMode] = useState<'all' | 'lowstock' | 'out'>('all')

  // Adjustment state
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [quantityInput, setQuantityInput] = useState<number>(10)
  const [reasonInput, setReasonInput] = useState<string>('Réassort fournisseur')
  const [movementType, setMovementType] = useState<'ADD' | 'REMOVE'>('ADD')

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Computed counts
  const totalUnits = products.reduce((acc, p) => acc + p.stockCount, 0)
  const lowStockCount = products.filter((p) => p.stockCount > 0 && p.stockCount <= 5).length
  const outOfStockCount = products.filter((p) => p.stockCount === 0).length

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())

      let matchesFilter = true
      if (filterMode === 'lowstock') matchesFilter = p.stockCount > 0 && p.stockCount <= 5
      if (filterMode === 'out') matchesFilter = p.stockCount === 0

      return matchesSearch && matchesFilter
    })
  }, [products, searchQuery, filterMode])

  // Filtered Movements
  const filteredMovements = useMemo(() => {
    return movements.filter((m) => {
      return (
        m.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
  }, [movements, searchQuery])

  // Reset pagination on tab / search / filter change
  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, searchQuery, filterMode])

  // Active list based on tab
  const currentListLength = activeTab === 'inventory' ? filteredProducts.length : filteredMovements.length
  const totalPages = Math.max(1, Math.ceil(currentListLength / itemsPerPage))

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(start, start + itemsPerPage)
  }, [filteredProducts, currentPage, itemsPerPage])

  const paginatedMovements = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredMovements.slice(start, start + itemsPerPage)
  }, [filteredMovements, currentPage, itemsPerPage])

  const startIndex = currentListLength === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(currentPage * itemsPerPage, currentListLength)

  const handleApplyAdjustment = () => {
    if (!selectedProductId) return
    const delta = movementType === 'ADD' ? Math.abs(quantityInput) : -Math.abs(quantityInput)
    adjustStock(selectedProductId, delta, reasonInput || 'Ajustement manuel de stock')
    setSelectedProductId(null)
    setQuantityInput(10)
    setReasonInput('Réassort fournisseur')
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <AdminHeader
        title="Gestion & Suivi des Stocks"
        subtitle="Contrôlez l'inventaire en temps réel, ajustez les quantités et consultez l'historique des flux."
        lowStockAlertsCount={lowStockCount}
      />

      {/* Main Page Area: 100% static layout, only table body scrolls */}
      <div className="flex-1 flex flex-col min-h-0 space-y-4 max-w-7xl w-full mx-auto pb-4">
        {/* Compact KPI Stats Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-shrink-0">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center flex-shrink-0">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black text-slate-900 block leading-tight">
                {totalUnits.toLocaleString('fr-FR')}
              </span>
              <p className="text-[11px] text-slate-400 font-medium">Unités totales en réserve</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black text-amber-600 block leading-tight">
                {lowStockCount}
              </span>
              <p className="text-[11px] text-slate-400 font-medium">Stock faible (≤ 5 unités)</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
              <History className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black text-rose-600 block leading-tight">
                {outOfStockCount}
              </span>
              <p className="text-[11px] text-slate-400 font-medium">Ruptures de stock (0)</p>
            </div>
          </div>
        </div>

        {/* Controls & Tab Navigation Bar */}
        <div className="bg-white p-3.5 sm:p-4 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 flex-shrink-0">
          {/* Tabs Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200/60 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'inventory'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Inventaire & Réassort</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'history'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Historique des Flux ({movements.length})</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-1 md:max-w-md items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  activeTab === 'inventory'
                    ? 'Rechercher un produit...'
                    : 'Rechercher dans l\'historique...'
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20"
              />
            </div>

            {/* Filter mode pills if in inventory */}
            {activeTab === 'inventory' && (
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60">
                <button
                  onClick={() => setFilterMode('all')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    filterMode === 'all'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Tous
                </button>
                <button
                  onClick={() => setFilterMode('lowstock')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    filterMode === 'lowstock'
                      ? 'bg-amber-100 text-amber-900 font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Faibles
                </button>
                <button
                  onClick={() => setFilterMode('out')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    filterMode === 'out'
                      ? 'bg-rose-100 text-rose-900 font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Ruptures
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Table Card (Static wrapper, only table body scrolls) */}
        <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm">
          {/* Scrollable Table Area */}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto">
            {activeTab === 'inventory' ? (
              <Table>
                <TableHeader className="sticky top-0 bg-slate-50/95 backdrop-blur-md z-10 border-b border-slate-200">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="py-3 px-6 font-bold uppercase tracking-wider text-[10px] text-slate-400">
                      Produit
                    </TableHead>
                    <TableHead className="py-3 px-4 font-bold uppercase tracking-wider text-[10px] text-slate-400">
                      Catégorie
                    </TableHead>
                    <TableHead className="py-3 px-4 font-bold uppercase tracking-wider text-[10px] text-slate-400">
                      Stock Actuel
                    </TableHead>
                    <TableHead className="py-3 px-6 text-right font-bold uppercase tracking-wider text-[10px] text-slate-400">
                      Action d'ajustement
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="py-16 text-center text-slate-400 text-xs">
                        Aucun produit ne correspond aux filtres de stock.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedProducts.map((p) => {
                      const isEditingThis = selectedProductId === p.id
                      const isOut = p.stockCount === 0
                      const isLow = p.stockCount > 0 && p.stockCount <= 5

                      return (
                        <TableRow key={p.id} className="hover:bg-slate-50/80 transition-colors">
                          <TableCell className="py-3 px-6">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.images[0]}
                                alt={p.name}
                                className="w-9 h-9 rounded-xl object-cover bg-slate-100 border border-slate-200 flex-shrink-0"
                              />
                              <div className="min-w-0">
                                <span className="font-bold text-slate-900 text-xs block truncate">
                                  {p.name}
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium">
                                  Réf: {p.slug}
                                </span>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell className="py-3 px-4">
                            <Badge variant="secondary" className="font-medium text-[11px] lowercase first-letter:uppercase">
                              {p.category}
                            </Badge>
                          </TableCell>

                          <TableCell className="py-3 px-4">
                            {isOut ? (
                              <Badge variant="destructive" className="flex items-center gap-1 font-bold">
                                <XCircle className="w-3 h-3" /> 0 unité
                              </Badge>
                            ) : isLow ? (
                              <Badge variant="warning" className="flex items-center gap-1 font-bold">
                                <AlertCircle className="w-3 h-3" /> {p.stockCount} unités
                              </Badge>
                            ) : (
                              <Badge variant="success" className="flex items-center gap-1 font-bold">
                                <CheckCircle2 className="w-3 h-3" /> {p.stockCount} unités
                              </Badge>
                            )}
                          </TableCell>

                          <TableCell className="py-3 px-6 text-right">
                            {isEditingThis ? (
                              <div className="inline-flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 shadow-md">
                                <select
                                  value={movementType}
                                  onChange={(e) => setMovementType(e.target.value as any)}
                                  className="bg-white border border-slate-200 text-slate-800 rounded-xl px-2 py-1 text-xs font-semibold focus:outline-none"
                                >
                                  <option value="ADD">+ Entrée (Réassort)</option>
                                  <option value="REMOVE">- Sortie (Ajustement)</option>
                                </select>

                                <input
                                  type="number"
                                  min="1"
                                  value={quantityInput}
                                  onChange={(e) => setQuantityInput(Number(e.target.value))}
                                  className="w-16 bg-white border border-slate-200 text-slate-900 rounded-xl px-2 py-1 text-xs font-bold text-center focus:outline-none"
                                />

                                <input
                                  type="text"
                                  value={reasonInput}
                                  onChange={(e) => setReasonInput(e.target.value)}
                                  placeholder="Motif"
                                  className="w-32 bg-white border border-slate-200 text-slate-900 rounded-xl px-2 py-1 text-xs focus:outline-none"
                                />

                                <Button
                                  size="sm"
                                  onClick={handleApplyAdjustment}
                                  className="px-3 py-1 bg-blue-900 hover:bg-blue-800 font-bold text-white rounded-xl text-xs shadow-xs h-auto"
                                >
                                  Valider
                                </Button>

                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => setSelectedProductId(null)}
                                  className="px-2 py-1 bg-slate-200 text-slate-700 rounded-xl text-xs h-auto"
                                >
                                  Annuler
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedProductId(p.id)
                                  setQuantityInput(10)
                                  setReasonInput('Réassort fournisseur')
                                }}
                                className="px-3 py-1.5 rounded-2xl text-blue-900 text-xs font-bold border-slate-200/80 hover:bg-blue-50/60 transition-colors h-auto"
                              >
                                Ajuster la quantité
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            ) : (
              <Table>
                <TableHeader className="sticky top-0 bg-slate-50/95 backdrop-blur-md z-10 border-b border-slate-200">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="py-3 px-6 font-bold uppercase tracking-wider text-[10px] text-slate-400">
                      Date & Heure
                    </TableHead>
                    <TableHead className="py-3 px-4 font-bold uppercase tracking-wider text-[10px] text-slate-400">
                      Produit
                    </TableHead>
                    <TableHead className="py-3 px-4 font-bold uppercase tracking-wider text-[10px] text-slate-400">
                      Type
                    </TableHead>
                    <TableHead className="py-3 px-4 font-bold uppercase tracking-wider text-[10px] text-slate-400">
                      Variation
                    </TableHead>
                    <TableHead className="py-3 px-6 font-bold uppercase tracking-wider text-[10px] text-slate-400">
                      Motif
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedMovements.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-16 text-center text-slate-400 text-xs">
                        Aucun mouvement de stock enregistré pour cette recherche.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedMovements.map((mov) => {
                      const isPositive = mov.changeQuantity > 0

                      return (
                        <TableRow key={mov.id} className="hover:bg-slate-50/80 transition-colors">
                          <TableCell className="py-3 px-6 font-mono text-slate-500 text-xs">
                            {new Date(mov.createdAt).toLocaleString('fr-FR')}
                          </TableCell>

                          <TableCell className="py-3 px-4 font-bold text-slate-900 text-xs">
                            {mov.productName}
                          </TableCell>

                          <TableCell className="py-3 px-4">
                            <Badge variant="secondary" className="font-semibold text-[10px]">
                              {mov.type}
                            </Badge>
                          </TableCell>

                          <TableCell className="py-3 px-4">
                            <span
                              className={`inline-flex items-center gap-1 font-mono font-extrabold px-2.5 py-0.5 rounded-lg text-xs ${
                                isPositive
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-rose-50 text-rose-700'
                              }`}
                            >
                              {isPositive ? (
                                <>
                                  <ArrowUpRight className="w-3.5 h-3.5" /> +{mov.changeQuantity}
                                </>
                              ) : (
                                <>
                                  <ArrowDownRight className="w-3.5 h-3.5" /> {mov.changeQuantity}
                                </>
                              )}
                            </span>
                          </TableCell>

                          <TableCell className="py-3 px-6 text-slate-600 font-medium text-xs">
                            {mov.reason}
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            )}
          </div>

          {/* Static Pagination Footer */}
          <div className="p-3 sm:px-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white flex-shrink-0">
            <span className="text-xs text-slate-500 font-medium">
              Affichage de <span className="font-bold text-slate-900">{startIndex}</span> à{' '}
              <span className="font-bold text-slate-900">{endIndex}</span> sur{' '}
              <span className="font-bold text-slate-900">{currentListLength}</span> éléments
            </span>

            {totalPages > 1 && (
              <Pagination className="mx-0 w-auto">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
