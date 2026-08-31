import { useQuery } from '@tanstack/react-query'
import { db } from '@/lib/supabase'
import { useProductsStore, isCacheStale } from '@/lib/store'
import type { Tables } from '@/types/database'

type Product = Tables<'products'>

// ─── Query Keys ─────────────────────────────────────────────────────────────

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) =>
    [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
}

// ─── Fetch all products ─────────────────────────────────────────────────────

async function fetchProducts(): Promise<Product[]> {
  console.log('[supabase] Fetching products from database...')

  const { data, error } = await db
    .products()
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[supabase] Error fetching products:', error.message)
    throw new Error(`Failed to fetch products: ${error.message}`)
  }

  console.log(`[supabase] ✓ Loaded ${data.length} products`)
  return data
}

// ─── Fetch single product by ID ─────────────────────────────────────────────

async function fetchProductById(id: string): Promise<Product> {
  console.log(`[supabase] Fetching product ${id}...`)

  // Try Zustand cache first
  const cached = useProductsStore.getState().getProductById(id)
  if (cached && !isCacheStale()) {
    console.log(`[supabase] ✓ Product ${id} served from cache`)
    return cached
  }

  const { data, error } = await db
    .products()
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error(`[supabase] Error fetching product ${id}:`, error.message)
    throw new Error(`Product not found: ${error.message}`)
  }

  console.log(`[supabase] ✓ Loaded product: ${data.name}`)
  return data
}

// ─── Hooks ──────────────────────────────────────────────────────────────────

/**
 * Fetch all active products.
 * Syncs results to Zustand cache for offline/instant access.
 */
export function useProducts(filters?: {
  category?: string
  sort?: string
  search?: string
}) {
  const setProducts = useProductsStore((s) => s.setProducts)

  return useQuery({
    queryKey: productKeys.list(filters ?? {}),
    queryFn: async () => {
      const products = await fetchProducts()

      // Sync to Zustand cache
      setProducts(products)

      // Apply client-side filters (Supabase handles is_active + ordering)
      let result = [...products]

      if (filters?.category && filters.category !== 'all') {
        result = result.filter((p) => p.category === filters.category)
      }

      if (filters?.search) {
        const q = filters.search.toLowerCase()
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q),
        )
      }

      if (filters?.sort) {
        switch (filters.sort) {
          case 'price-asc':
            result.sort((a, b) => a.price - b.price)
            break
          case 'price-desc':
            result.sort((a, b) => b.price - a.price)
            break
          case 'discount':
            result.sort((a, b) => {
              const dA = a.compare_at_price
                ? 1 - a.price / a.compare_at_price
                : 0
              const dB = b.compare_at_price
                ? 1 - b.price / b.compare_at_price
                : 0
              return dB - dA
            })
            break
        }
      }

      return result
    },
    staleTime: 1000 * 60 * 2, // 2 min
    gcTime: 1000 * 60 * 10,   // 10 min
  })
}

/**
 * Fetch a single product by ID.
 */
export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProductById(id),
    staleTime: 1000 * 60 * 5, // 5 min
    gcTime: 1000 * 60 * 15,   // 15 min
    enabled: !!id,
  })
}
