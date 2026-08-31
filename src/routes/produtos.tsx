import { useState, useMemo } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import * as Select from '@radix-ui/react-select'

// ─── Route Search Params ────────────────────────────────────────────────────

type ProdutosSearch = {
  category?: string
  sort?: string
  q?: string
}

export const Route = createFileRoute('/produtos')({
  component: ProdutosPage,
  validateSearch: (search: Record<string, unknown>): ProdutosSearch => ({
    category: (search.category as string) || undefined,
    sort: (search.sort as string) || undefined,
    q: (search.q as string) || undefined,
  }),
  head: () => ({
    meta: [
      { title: 'Produtos — Bratva Outlet' },
      {
        name: 'description',
        content: 'Confira todos os produtos do nosso outlet. Moda premium com até 70% OFF.',
      },
    ],
  }),
})

// ─── Mock Data ──────────────────────────────────────────────────────────────

const ALL_PRODUCTS = [
  { id: '1', name: 'Camiseta Oversized Premium', brand: 'ESSENTIALS', price: 189.9, compare_at_price: 349.9, category: 'camisetas', sizes: ['P', 'M', 'G', 'GG'] },
  { id: '2', name: 'Calça Cargo Streetwear', brand: 'URBAN CO.', price: 259.9, compare_at_price: 459.9, category: 'calcas', sizes: ['38', '40', '42', '44'] },
  { id: '3', name: 'Jaqueta Corta-Vento', brand: 'STORM', price: 329.9, compare_at_price: 599.9, category: 'jaquetas', sizes: ['M', 'G', 'GG'] },
  { id: '4', name: 'Tênis Runner Pro', brand: 'VELOCITY', price: 449.9, compare_at_price: 799.9, category: 'tenis', sizes: ['39', '40', '41', '42', '43'] },
  { id: '5', name: 'Bermuda Tech Flex', brand: 'ESSENTIALS', price: 149.9, compare_at_price: 279.9, category: 'bermudas', sizes: ['P', 'M', 'G'] },
  { id: '6', name: 'Camiseta Basic Fit', brand: 'URBAN CO.', price: 89.9, compare_at_price: 159.9, category: 'camisetas', sizes: ['P', 'M', 'G', 'GG', 'XG'] },
  { id: '7', name: 'Boné Snapback Classic', brand: 'HEADZ', price: 79.9, compare_at_price: 149.9, category: 'acessorios', sizes: ['Único'] },
  { id: '8', name: 'Calça Jogger Premium', brand: 'STORM', price: 219.9, compare_at_price: 399.9, category: 'calcas', sizes: ['P', 'M', 'G', 'GG'] },
  { id: '9', name: 'Tênis Casual Slip-On', brand: 'VELOCITY', price: 349.9, compare_at_price: 649.9, category: 'tenis', sizes: ['38', '39', '40', '41', '42'] },
  { id: '10', name: 'Jaqueta Puffer Inverno', brand: 'STORM', price: 489.9, compare_at_price: 899.9, category: 'jaquetas', sizes: ['M', 'G', 'GG'] },
  { id: '11', name: 'Relógio Digital Sport', brand: 'HEADZ', price: 199.9, compare_at_price: 399.9, category: 'acessorios', sizes: ['Único'] },
  { id: '12', name: 'Camiseta Tie-Dye Drop', brand: 'ESSENTIALS', price: 129.9, compare_at_price: 249.9, category: 'camisetas', sizes: ['P', 'M', 'G', 'GG'] },
]

const CATEGORIES_FILTER = [
  { value: 'all', label: 'Todas' },
  { value: 'camisetas', label: 'Camisetas' },
  { value: 'calcas', label: 'Calças' },
  { value: 'tenis', label: 'Tênis' },
  { value: 'jaquetas', label: 'Jaquetas' },
  { value: 'bermudas', label: 'Bermudas' },
  { value: 'acessorios', label: 'Acessórios' },
]

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevância' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'discount', label: 'Maior desconto' },
]

// ─── Page Component ─────────────────────────────────────────────────────────

function ProdutosPage() {
  const { category: searchCategory, sort: searchSort, q } = Route.useSearch()
  const navigate = Route.useNavigate()

  const [selectedCategory, setSelectedCategory] = useState(searchCategory || 'all')
  const [selectedSort, setSelectedSort] = useState(searchSort || 'relevance')
  const [searchQuery, setSearchQuery] = useState(q || '')

  const filteredProducts = useMemo(() => {
    let result = [...ALL_PRODUCTS]

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Filter by search
    if (searchQuery) {
      const lower = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.brand.toLowerCase().includes(lower),
      )
    }

    // Sort
    switch (selectedSort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'discount':
        result.sort((a, b) => {
          const discA = a.compare_at_price ? 1 - a.price / a.compare_at_price : 0
          const discB = b.compare_at_price ? 1 - b.price / b.compare_at_price : 0
          return discB - discA
        })
        break
    }

    return result
  }, [selectedCategory, selectedSort, searchQuery])

  function handleCategoryChange(value: string) {
    setSelectedCategory(value)
    navigate({
      search: (prev: ProdutosSearch) => ({
        ...prev,
        category: value === 'all' ? undefined : value,
      }),
      replace: true,
    })
  }

  function handleSortChange(value: string) {
    setSelectedSort(value)
    navigate({
      search: (prev: ProdutosSearch) => ({
        ...prev,
        sort: value === 'relevance' ? undefined : value,
      }),
      replace: true,
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      {/* ── Breadcrumb ──────────────────────────────────────────── */}
      <nav className="mb-6 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link to="/" className="transition-colors hover:text-zinc-300">Home</Link>
        <span className="mx-2 text-zinc-700">/</span>
        <span className="text-zinc-300">Produtos</span>
      </nav>

      {/* ── Title + Search ──────────────────────────────────────── */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Produtos</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            id="search-products"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar produtos..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50"
          />
        </div>
      </div>

      {/* ── Filters Bar ─────────────────────────────────────────── */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        {/* Category Filter — Radix Select */}
        <Select.Root value={selectedCategory} onValueChange={handleCategoryChange}>
          <Select.Trigger
            id="filter-category"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2.5 text-sm text-zinc-300 outline-none transition-colors hover:border-zinc-700 focus:border-brand-500 data-[placeholder]:text-zinc-500"
          >
            <Select.Value placeholder="Categoria" />
            <Select.Icon>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content
              className="z-50 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl"
              position="popper"
              sideOffset={4}
            >
              <Select.Viewport className="p-1">
                {CATEGORIES_FILTER.map((cat) => (
                  <Select.Item
                    key={cat.value}
                    value={cat.value}
                    className="cursor-pointer rounded-lg px-3 py-2 text-sm text-zinc-300 outline-none transition-colors hover:bg-zinc-800 hover:text-zinc-100 data-[state=checked]:text-brand-400"
                  >
                    <Select.ItemText>{cat.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        {/* Sort — Radix Select */}
        <Select.Root value={selectedSort} onValueChange={handleSortChange}>
          <Select.Trigger
            id="filter-sort"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2.5 text-sm text-zinc-300 outline-none transition-colors hover:border-zinc-700 focus:border-brand-500 data-[placeholder]:text-zinc-500"
          >
            <Select.Value placeholder="Ordenar" />
            <Select.Icon>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content
              className="z-50 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl"
              position="popper"
              sideOffset={4}
            >
              <Select.Viewport className="p-1">
                {SORT_OPTIONS.map((opt) => (
                  <Select.Item
                    key={opt.value}
                    value={opt.value}
                    className="cursor-pointer rounded-lg px-3 py-2 text-sm text-zinc-300 outline-none transition-colors hover:bg-zinc-800 hover:text-zinc-100 data-[state=checked]:text-brand-400"
                  >
                    <Select.ItemText>{opt.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        {/* Active filter pills */}
        {selectedCategory !== 'all' && (
          <button
            onClick={() => handleCategoryChange('all')}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-600/30 bg-brand-600/10 px-3 py-1.5 text-xs font-medium text-brand-400 transition-colors hover:bg-brand-600/20"
          >
            {CATEGORIES_FILTER.find((c) => c.value === selectedCategory)?.label}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Product Grid ────────────────────────────────────────── */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to="/produtos/$id"
              params={{ id: product.id }}
              className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 transition-all hover:border-zinc-700 hover:shadow-xl hover:shadow-black/20"
            >
              {/* Image placeholder */}
              <div className="relative aspect-square bg-zinc-800/50">
                <div className="absolute inset-0 flex items-center justify-center text-zinc-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                </div>
                {/* Discount badge */}
                {product.compare_at_price && (
                  <span className="absolute left-3 top-3 rounded-lg bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    -{Math.round((1 - product.price / product.compare_at_price) * 100)}%
                  </span>
                )}
                {/* Quick sizes */}
                <div className="absolute bottom-0 left-0 right-0 flex translate-y-full gap-1 bg-gradient-to-t from-zinc-900/90 to-transparent p-3 pt-8 transition-transform group-hover:translate-y-0">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-[10px] font-medium text-zinc-400"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  {product.brand}
                </p>
                <h3 className="mt-1 text-sm font-medium text-zinc-200 transition-colors group-hover:text-brand-400">
                  {product.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-zinc-100">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  {product.compare_at_price && (
                    <span className="text-xs text-zinc-600 line-through">
                      R$ {product.compare_at_price.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 px-6 py-20 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <p className="mt-4 text-zinc-400">Nenhum produto encontrado</p>
          <p className="mt-1 text-sm text-zinc-600">
            Tente outra busca ou remova os filtros
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              handleCategoryChange('all')
            }}
            className="mt-6 rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  )
}
