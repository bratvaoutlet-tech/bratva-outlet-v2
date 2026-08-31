import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import * as Dialog from '@radix-ui/react-dialog'
import * as Separator from '@radix-ui/react-separator'
import { useProduct } from '@/hooks/useProducts'
import type { Tables } from '@/types/database'

export const Route = createFileRoute('/produtos/$id')({
  component: ProdutoDetailPage,
  head: () => ({
    meta: [{ title: 'Produto — Bratva Outlet' }],
  }),
})

// ─── Page Component ─────────────────────────────────────────────────────────

function ProdutoDetailPage() {
  const { id } = Route.useParams()
  const { data: product, isLoading, isError, error } = useProduct(id)

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)

  // ── Loading ─────────────────────────────────────────────────────────────
  if (isLoading) {
    return <ProductSkeleton />
  }

  // ── Error ───────────────────────────────────────────────────────────────
  if (isError || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-red-900/50 bg-red-950/20 px-6 py-20 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <p className="mt-4 text-red-400">Produto não encontrado</p>
          <p className="mt-1 text-sm text-zinc-600">
            {error instanceof Error ? error.message : 'Este produto pode ter sido removido.'}
          </p>
          <Link
            to="/produtos"
            className="mt-6 rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
          >
            Ver todos os produtos
          </Link>
        </div>
      </div>
    )
  }

  // ── Derived data ────────────────────────────────────────────────────────
  const discount = product.compare_at_price
    ? Math.round((1 - product.price / product.compare_at_price) * 100)
    : 0
  const installment = (product.price / 3).toFixed(2).replace('.', ',')
  const images = product.images?.length > 0 ? product.images : []
  const currentColor = selectedColor ?? product.colors?.[0] ?? null

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      {/* ── Breadcrumb ──────────────────────────────────────────── */}
      <nav className="mb-8 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link to="/" className="transition-colors hover:text-zinc-300">
          Home
        </Link>
        <span className="mx-2 text-zinc-700">/</span>
        <Link to="/produtos" className="transition-colors hover:text-zinc-300">
          Produtos
        </Link>
        <span className="mx-2 text-zinc-700">/</span>
        <span className="text-zinc-300">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* ── Image Gallery ─────────────────────────────────────── */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50">
            {images[activeImage] ? (
              <img
                src={images[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-zinc-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
              </div>
            )}
            {/* Discount badge */}
            {discount > 0 && (
              <span className="absolute left-4 top-4 rounded-lg bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
                -{discount}%
              </span>
            )}
            {/* Out of stock overlay */}
            {product.stock === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/60">
                <span className="rounded-xl bg-zinc-900 px-6 py-3 text-sm font-bold text-zinc-400">
                  Esgotado
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square w-20 overflow-hidden rounded-xl border transition-all ${
                    activeImage === i
                      ? 'border-brand-500 ring-1 ring-brand-500/50'
                      : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} - foto ${i + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Product Info ──────────────────────────────────────── */}
        <div className="flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            {product.brand}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-zinc-100 lg:text-4xl">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-zinc-100">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            {product.compare_at_price && (
              <span className="text-lg text-zinc-600 line-through">
                R$ {product.compare_at_price.toFixed(2).replace('.', ',')}
              </span>
            )}
            {discount > 0 && (
              <span className="rounded-md bg-red-500/10 px-2 py-0.5 text-xs font-bold text-red-400">
                -{discount}%
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-zinc-500">
            ou 3x de{' '}
            <strong className="text-zinc-400">R$ {installment}</strong> sem
            juros
          </p>

          <Separator.Root className="my-6 h-px bg-zinc-800" />

          {/* Description */}
          <p className="text-sm leading-relaxed text-zinc-400">
            {product.description}
          </p>

          <Separator.Root className="my-6 h-px bg-zinc-800" />

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div>
              <p className="mb-3 text-sm font-medium text-zinc-300">
                Cor:{' '}
                <span className="text-zinc-500">{currentColor ?? '—'}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-xl border-2 px-4 py-2 text-sm transition-all ${
                      currentColor === color
                        ? 'border-brand-500 bg-brand-600/10 text-brand-400'
                        : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium text-zinc-300">Tamanho</p>
                <Dialog.Root
                  open={sizeGuideOpen}
                  onOpenChange={setSizeGuideOpen}
                >
                  <Dialog.Trigger asChild>
                    <button className="text-xs font-medium text-brand-400 transition-colors hover:text-brand-300">
                      Guia de tamanhos
                    </button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
                      <Dialog.Title className="font-display text-lg font-bold">
                        Guia de Tamanhos
                      </Dialog.Title>
                      <Dialog.Description className="mt-1 text-sm text-zinc-500">
                        Medidas em centímetros
                      </Dialog.Description>
                      <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800">
                        <table className="w-full text-sm">
                          <thead className="bg-zinc-900">
                            <tr className="text-left text-zinc-400">
                              <th className="px-4 py-2">Tam.</th>
                              <th className="px-4 py-2">Peito</th>
                              <th className="px-4 py-2">Cintura</th>
                              <th className="px-4 py-2">Quadril</th>
                            </tr>
                          </thead>
                          <tbody className="text-zinc-300">
                            {[
                              { size: 'P', chest: '96', waist: '80', hip: '96' },
                              { size: 'M', chest: '100', waist: '84', hip: '100' },
                              { size: 'G', chest: '104', waist: '88', hip: '104' },
                              { size: 'GG', chest: '110', waist: '94', hip: '110' },
                            ].map((row) => (
                              <tr key={row.size} className="border-t border-zinc-800">
                                <td className="px-4 py-2 font-medium">{row.size}</td>
                                <td className="px-4 py-2">{row.chest}</td>
                                <td className="px-4 py-2">{row.waist}</td>
                                <td className="px-4 py-2">{row.hip}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <Dialog.Close asChild>
                        <button className="mt-4 w-full rounded-xl border border-zinc-700 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900">
                          Fechar
                        </button>
                      </Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'border-brand-500 bg-brand-600/10 text-brand-400'
                        : 'border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="mt-8 flex gap-3">
            <div className="flex items-center rounded-xl border border-zinc-800">
              <button
                id="btn-qty-minus"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-3 text-zinc-400 transition-colors hover:text-zinc-100"
                aria-label="Diminuir quantidade"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                </svg>
              </button>
              <span className="w-10 text-center text-sm font-medium">
                {quantity}
              </span>
              <button
                id="btn-qty-plus"
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                className="px-3 py-3 text-zinc-400 transition-colors hover:text-zinc-100"
                aria-label="Aumentar quantidade"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>

            <button
              id="btn-add-to-cart"
              disabled={!selectedSize || product.stock === 0}
              onClick={() => {
                console.log('[cart] Adding to cart:', {
                  productId: product.id,
                  name: product.name,
                  size: selectedSize,
                  color: currentColor,
                  quantity,
                  price: product.price,
                })
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-600 disabled:hover:shadow-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {product.stock === 0
                ? 'Esgotado'
                : selectedSize
                  ? 'Adicionar ao Carrinho'
                  : 'Selecione um tamanho'}
            </button>
          </div>

          {/* Stock info */}
          {product.stock > 0 && product.stock <= 5 && (
            <p className="mt-3 text-xs font-medium text-amber-400">
              ⚡ Apenas {product.stock} unidade{product.stock > 1 ? 's' : ''} em
              estoque!
            </p>
          )}

          <Separator.Root className="my-8 h-px bg-zinc-800" />

          {/* Category + Slug */}
          <div className="flex flex-wrap gap-2">
            <span className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-500">
              {product.category}
            </span>
            <span className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-500">
              {product.brand}
            </span>
          </div>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { icon: '🚚', text: 'Frete grátis' },
              { icon: '🔄', text: 'Troca em 30d' },
              { icon: '🔒', text: 'Compra segura' },
            ].map((badge) => (
              <div
                key={badge.text}
                className="flex flex-col items-center gap-1 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-center"
              >
                <span className="text-lg">{badge.icon}</span>
                <span className="text-[10px] font-medium text-zinc-500">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Skeleton ───────────────────────────────────────────────────────────────

function ProductSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      {/* Breadcrumb skeleton */}
      <div className="mb-8 flex gap-2">
        <div className="h-4 w-10 animate-pulse rounded bg-zinc-800" />
        <div className="h-4 w-2 rounded bg-zinc-800" />
        <div className="h-4 w-16 animate-pulse rounded bg-zinc-800" />
        <div className="h-4 w-2 rounded bg-zinc-800" />
        <div className="h-4 w-32 animate-pulse rounded bg-zinc-800" />
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image skeleton */}
        <div className="space-y-4">
          <div className="aspect-square animate-pulse rounded-2xl border border-zinc-800 bg-zinc-800/50" />
          <div className="flex gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square w-20 animate-pulse rounded-xl border border-zinc-800 bg-zinc-800/50"
              />
            ))}
          </div>
        </div>

        {/* Info skeleton */}
        <div className="space-y-6">
          <div className="h-3 w-20 animate-pulse rounded bg-zinc-800" />
          <div className="h-8 w-3/4 animate-pulse rounded bg-zinc-800" />
          <div className="flex gap-3">
            <div className="h-8 w-32 animate-pulse rounded bg-zinc-800" />
            <div className="h-8 w-24 animate-pulse rounded bg-zinc-800" />
          </div>
          <div className="h-px bg-zinc-800" />
          <div className="space-y-2">
            <div className="h-3 w-full animate-pulse rounded bg-zinc-800" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-zinc-800" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-zinc-800" />
          </div>
          <div className="h-px bg-zinc-800" />
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-10 w-10 animate-pulse rounded-xl bg-zinc-800" />
            ))}
          </div>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-11 w-14 animate-pulse rounded-xl bg-zinc-800" />
            ))}
          </div>
          <div className="h-14 animate-pulse rounded-xl bg-zinc-800" />
        </div>
      </div>
    </div>
  )
}
