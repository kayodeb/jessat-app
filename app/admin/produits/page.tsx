'use client'

import { useState, useMemo, useEffect } from 'react'
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Filter,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/admin-header'
import { useAdminStore } from '@/lib/admin-store'
import { ProductFormModal } from '@/components/admin/product-form-modal'
import { Product } from '@/types/product'
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

export default function AdminProductsPage() {
  const { products, categories, addProduct, updateProduct, deleteProduct } =
    useAdminStore()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [stockFilter, setStockFilter] = useState<'all' | 'instock' | 'lowstock' | 'out'>('all')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.slug.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory

      let matchesStock = true
      if (stockFilter === 'instock') matchesStock = product.stockCount > 5
      if (stockFilter === 'lowstock') matchesStock = product.stockCount > 0 && product.stockCount <= 5
      if (stockFilter === 'out') matchesStock = product.stockCount === 0

      return matchesSearch && matchesCategory && matchesStock
    })
  }, [products, searchQuery, selectedCategory, stockFilter])

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, stockFilter])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage))
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredProducts, currentPage, itemsPerPage])

  const startIndex = filteredProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(currentPage * itemsPerPage, filteredProducts.length)

  const handleOpenCreateModal = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleSubmitForm = (data: any) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data)
    } else {
      addProduct(data)
    }
  }

  const handleDelete = (id: string) => {
    deleteProduct(id)
    setDeletingProductId(null)
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <AdminHeader
        title="Gestion du Catalogue & Produits"
        subtitle="Créez, modifiez, organisez et supprimez vos références de produits."
      />

      {/* Main Page Area: Static page, only the table body scrolls */}
      <div className="flex-1 flex flex-col min-h-0 space-y-4 max-w-7xl w-full mx-auto pb-4">
        {/* Static Controls & Filters Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-sm flex-shrink-0">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par nom, marque, slug..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20"
            />
          </div>

          {/* Category & Stock Filter + Add Button */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-medium"
              >
                <option value="all">Toutes les catégories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-medium"
            >
              <option value="all">Tous les stocks</option>
              <option value="instock">En stock (&gt; 5)</option>
              <option value="lowstock">Stock faible (1 à 5)</option>
              <option value="out">Rupture (0)</option>
            </select>

            {/* Add Product Button */}
            <Button
              onClick={handleOpenCreateModal}
              size="sm"
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-2xl flex items-center gap-2 shadow-sm transition-all whitespace-nowrap px-4 py-2 h-auto"
            >
              <Plus className="w-4 h-4" /> Nouveau Produit
            </Button>
          </div>
        </div>

        {/* Table Card (Static wrapper, only table body scrolls) */}
        <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm">
          {/* Scrollable Table Area */}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-slate-50/95 backdrop-blur-md z-10 border-b border-slate-200">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="py-3.5 px-6 font-bold uppercase tracking-wider text-[10px] text-slate-400">
                    Produit
                  </TableHead>
                  <TableHead className="py-3.5 px-4 font-bold uppercase tracking-wider text-[10px] text-slate-400">
                    Catégorie
                  </TableHead>
                  <TableHead className="py-3.5 px-4 font-bold uppercase tracking-wider text-[10px] text-slate-400">
                    Prix
                  </TableHead>
                  <TableHead className="py-3.5 px-4 font-bold uppercase tracking-wider text-[10px] text-slate-400">
                    Stock
                  </TableHead>
                  <TableHead className="py-3.5 px-4 font-bold uppercase tracking-wider text-[10px] text-slate-400">
                    État
                  </TableHead>
                  <TableHead className="py-3.5 px-6 text-right font-bold uppercase tracking-wider text-[10px] text-slate-400">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-16 text-center text-slate-400 text-xs">
                      Aucun produit ne correspond à votre recherche.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedProducts.map((product) => {
                    const isLowStock = product.stockCount > 0 && product.stockCount <= 5
                    const isOutOfStock = product.stockCount === 0

                    return (
                      <TableRow
                        key={product.id}
                        className="hover:bg-slate-50/80 transition-colors group"
                      >
                        {/* Produit Info */}
                        <TableCell className="py-3 px-6">
                          <div className="flex items-center gap-3.5">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-10 h-10 rounded-2xl object-cover bg-slate-100 border border-slate-200 flex-shrink-0 shadow-xs"
                            />
                            <div className="min-w-0">
                              <h4 className="font-bold text-slate-900 text-xs truncate group-hover:text-blue-900 transition-colors">
                                {product.name}
                              </h4>
                              <p className="text-[11px] text-slate-400 truncate">
                                Marque: <span className="text-slate-600 font-medium">{product.brand}</span>
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Catégorie */}
                        <TableCell className="py-3 px-4 font-semibold text-slate-700 capitalize">
                          <Badge variant="secondary" className="font-medium text-[11px] lowercase first-letter:uppercase">
                            {product.category}
                          </Badge>
                        </TableCell>

                        {/* Prix */}
                        <TableCell className="py-3 px-4 font-black text-slate-900">
                          {product.price.toLocaleString('fr-FR')} €
                          {product.compareAtPrice && (
                            <span className="block text-[10px] text-slate-400 line-through font-normal">
                              {product.compareAtPrice} €
                            </span>
                          )}
                        </TableCell>

                        {/* Stock with shadcn Badge */}
                        <TableCell className="py-3 px-4">
                          {isOutOfStock ? (
                            <Badge variant="destructive" className="flex items-center gap-1 font-bold">
                              <XCircle className="w-3 h-3" /> Rupture (0)
                            </Badge>
                          ) : isLowStock ? (
                            <Badge variant="warning" className="flex items-center gap-1 font-bold">
                              <AlertCircle className="w-3 h-3" /> {product.stockCount} restants
                            </Badge>
                          ) : (
                            <Badge variant="success" className="flex items-center gap-1 font-bold">
                              <CheckCircle2 className="w-3 h-3" /> {product.stockCount} en stock
                            </Badge>
                          )}
                        </TableCell>

                        {/* État */}
                        <TableCell className="py-3 px-4 text-slate-500 font-medium capitalize text-xs">
                          {product.condition || 'neuf'}
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="py-3 px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenEditModal(product)}
                              className="h-8 w-8 p-0 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-blue-900 transition-colors"
                              title="Modifier"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </Button>

                            {deletingProductId === product.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleDelete(product.id)}
                                  className="px-2 py-1 bg-rose-600 text-white font-bold text-[10px] rounded-lg shadow-sm"
                                >
                                  Confirmer
                                </button>
                                <button
                                  onClick={() => setDeletingProductId(null)}
                                  className="px-2 py-1 bg-slate-200 text-slate-700 text-[10px] rounded-lg"
                                >
                                  Annuler
                                </button>
                              </div>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setDeletingProductId(product.id)}
                                className="h-8 w-8 p-0 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors"
                                title="Supprimer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Static Pagination Footer */}
          <div className="p-3 sm:px-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white flex-shrink-0">
            <span className="text-xs text-slate-500 font-medium">
              Affichage de <span className="font-bold text-slate-900">{startIndex}</span> à{' '}
              <span className="font-bold text-slate-900">{endIndex}</span> sur{' '}
              <span className="font-bold text-slate-900">{filteredProducts.length}</span> produits
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

        {/* Modal Form */}
        <ProductFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitForm}
          initialProduct={editingProduct}
          categories={categories}
        />
      </div>
    </div>
  )
}
