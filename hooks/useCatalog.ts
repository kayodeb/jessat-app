'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { Product } from '@/types/product'
import { CategoryItem } from '@/types/category'
import { ConfigCategory, ConfigOption } from '@/types/configurator'
import { PRODUCTS } from '@/data/products'
import { CATEGORIES } from '@/data/categories'
import { CONFIGURATOR_OPTIONS } from '@/data/configurator'

export function useProducts(params?: {
  category?: string
  search?: string
  condition?: string
  featured?: boolean
  inStock?: boolean
  sort?: string
}) {
  const [products, setProducts] = useState<Product[]>(() => PRODUCTS)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchProducts() {
      try {
        setIsLoading(true)
        const data = await api.products.getAll(params)
        if (isMounted && data && data.length > 0) {
          setProducts(data)
          setError(null)
        }
      } catch (err: any) {
        console.warn('Backend products fetch failed, using fallback data:', err?.message)
        if (isMounted) {
          setError(err?.message || 'Erreur chargement')
        }
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchProducts()

    return () => {
      isMounted = false
    }
  }, [
    params?.category,
    params?.search,
    params?.condition,
    params?.featured,
    params?.inStock,
    params?.sort,
  ])

  return { products, isLoading, error }
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(
    () => PRODUCTS.find((p) => p.slug === slug) || null
  )
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchProduct() {
      try {
        setIsLoading(true)
        const data = await api.products.getBySlug(slug)
        if (isMounted && data) {
          setProduct(data)
          setError(null)
        }
      } catch (err: any) {
        console.warn(`Backend product [${slug}] fetch failed, using fallback:`, err?.message)
        if (isMounted) {
          setError(err?.message || 'Produit introuvable')
        }
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    if (slug) {
      fetchProduct()
    }

    return () => {
      isMounted = false
    }
  }, [slug])

  return { product, isLoading, error }
}

export function useCategories() {
  const [categories, setCategories] = useState<CategoryItem[]>(() => CATEGORIES)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function fetchCategories() {
      try {
        const data = await api.categories.getAll()
        if (isMounted && data && data.length > 0) {
          setCategories(data)
        }
      } catch (err: any) {
        console.warn('Backend categories fetch failed, using fallback:', err?.message)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchCategories()

    return () => {
      isMounted = false
    }
  }, [])

  return { categories, isLoading }
}

export function useConfiguratorOptions() {
  const [options, setOptions] = useState<Record<ConfigCategory, ConfigOption[]>>(() => CONFIGURATOR_OPTIONS)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function fetchOptions() {
      try {
        const data = await api.configurator.getOptions()
        if (isMounted && data && Object.keys(data).length > 0) {
          setOptions(data)
        }
      } catch (err: any) {
        console.warn('Backend configurator fetch failed, using fallback:', err?.message)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchOptions()

    return () => {
      isMounted = false
    }
  }, [])

  return { options, isLoading }
}
