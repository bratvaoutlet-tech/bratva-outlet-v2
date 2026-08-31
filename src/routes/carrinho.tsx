import { createFileRoute, Link } from '@tanstack/react-router'
import * as Separator from '@radix-ui/react-separator'
import { useCart } from '@/hooks/useCart'

export const Route = createFileRoute('/carrinho')({
  component: CarrinhoPage,
  head: () => ({
    meta: [{ title: 'Carrinho — Bratva Outlet' }],
  }),
})

function CarrinhoPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    isHydrated,
  } = useCart()

  if (!isHydrated) return null // Evita mismatch no SSR

  const total = getTotalPrice
  const discount = 0 // Simulação de cupom se houver no futuro
  const finalTotal = total - discount

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="mb-8 flex items-baseline justify-between">
        <h1 className="font-display text-3xl font-bold">Seu Carrinho</h1>
        <p className="text-sm text-zinc-500">
          {getTotalItems} iten{getTotalItems !== 1 ? 's' : ''}
        </p>
      </div>

      {items.length === 0 ? (
        /* ── Empty State ──────────────────────────────────────── */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 px-6 py-24 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-zinc-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={0.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <p className="mt-4 font-medium text-zinc-300">
            Seu carrinho está vazio
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Adicione itens ao carrinho para finalizar sua compra.
          </p>
          <Link
            to="/produtos"
            className="mt-6 rounded-xl bg-brand-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
          >
            Ver Produtos
          </Link>
        </div>
      ) : (
        /* ── Cart Content ─────────────────────────────────────── */
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Items List */}
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-6"
                >
                  {/* Image */}
                  <Link
                    to="/produtos/$id"
                    params={{ id: item.productId }}
                    className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800/50 sm:h-32 sm:w-32"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-zinc-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={0.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                          />
                        </svg>
                      </div>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between gap-4">
                        <Link
                          to="/produtos/$id"
                          params={{ id: item.productId }}
                          className="font-medium text-zinc-200 transition-colors hover:text-brand-400 line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <span className="font-bold text-zinc-100">
                          R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-zinc-500">
                        {item.brand}
                      </p>
                      
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-400">
                        <span className="rounded bg-zinc-800 px-2 py-1">
                          Tam: {item.size}
                        </span>
                        {item.color && (
                          <span className="rounded bg-zinc-800 px-2 py-1">
                            Cor: {item.color}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center rounded-lg border border-zinc-700 bg-zinc-800">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-3 py-1.5 text-zinc-400 hover:text-zinc-100"
                          aria-label="Diminuir"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1.5 text-zinc-400 hover:text-zinc-100"
                          aria-label="Aumentar"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm font-medium text-zinc-500 underline decoration-zinc-700 underline-offset-4 hover:text-red-400 hover:decoration-red-400/30"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h2 className="font-display text-lg font-bold">Resumo</h2>

              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex items-center justify-between text-zinc-400">
                  <dt>Subtotal</dt>
                  <dd>R$ {total.toFixed(2).replace('.', ',')}</dd>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <dt>Descontos</dt>
                  <dd>- R$ {discount.toFixed(2).replace('.', ',')}</dd>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <dt>Frete</dt>
                  <dd>Calculado no checkout</dd>
                </div>
                
                <Separator.Root className="my-4 h-px bg-zinc-800" />
                
                <div className="flex items-center justify-between text-base font-bold text-zinc-100">
                  <dt>Total</dt>
                  <dd>R$ {finalTotal.toFixed(2).replace('.', ',')}</dd>
                </div>
              </dl>

              <Link
                to="/checkout"
                className="mt-8 flex w-full items-center justify-center rounded-xl bg-brand-600 py-3.5 text-sm font-bold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/25"
              >
                Ir para o Checkout
              </Link>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Ambiente 100% seguro
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
