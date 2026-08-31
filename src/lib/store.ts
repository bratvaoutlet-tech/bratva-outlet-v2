import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Tables } from '@/types/database'

// ─── Types ──────────────────────────────────────────────────────────────────

type Product = Tables<'products'>

interface ProductsState {
  /** Cached products list */
  products: Product[]
  /** Last time the cache was refreshed (ISO timestamp) */
  lastFetched: string | null
  /** Categories extracted from products */
  categories: string[]

  // Actions
  setProducts: (products: Product[]) => void
  getProductById: (id: string) => Product | undefined
  getProductsByCategory: (category: string) => Product[]
  clearCache: () => void
}

// ─── Store ──────────────────────────────────────────────────────────────────

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: [],
      lastFetched: null,
      categories: [],

      setProducts: (products) => {
        const categories = [...new Set(products.map((p) => p.category))].sort()

        console.log(
          `[store] Cached ${products.length} products, ${categories.length} categories`,
        )

        set({
          products,
          lastFetched: new Date().toISOString(),
          categories,
        })
      },

      getProductById: (id) => {
        return get().products.find((p) => p.id === id)
      },

      getProductsByCategory: (category) => {
        return get().products.filter((p) => p.category === category)
      },

      clearCache: () => {
        set({ products: [], lastFetched: null, categories: [] })
      },
    }),
    {
      name: 'bratva-products-cache',
      storage: createJSONStorage(() => localStorage),
      // Only persist products and timestamp, not derived data
      partialize: (state) => ({
        products: state.products,
        lastFetched: state.lastFetched,
      }),
    },
  ),
)

// ─── Cache freshness helper ─────────────────────────────────────────────────

const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

export function isCacheStale(): boolean {
  const { lastFetched } = useProductsStore.getState()
  if (!lastFetched) return true
  return Date.now() - new Date(lastFetched).getTime() > CACHE_TTL_MS
}
