import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import * as Separator from '@radix-ui/react-separator'
import { useCart } from '@/hooks/useCart'

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage,
  head: () => ({
    meta: [{ title: 'Checkout — Bratva Outlet' }],
  }),
})

function CheckoutPage() {
  const { items, getTotalPrice, isHydrated, clearCart } = useCart()
  const navigate = Route.useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isHydrated) return null

  // Redireciona se carrinho vazio
  if (items.length === 0) {
    navigate({ to: '/carrinho', replace: true })
    return null
  }

  const total = getTotalPrice
  const discount = 0
  const finalTotal = total - discount

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulando processamento do pedido...
    setTimeout(() => {
      clearCart()
      const orderId = Math.random().toString(36).substring(2, 10).toUpperCase()
      navigate({ to: '/pedido/$id', params: { id: orderId } })
    }, 1500)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Finalizar Compra</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Preencha seus dados para concluir o pedido.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* ── Form ──────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 xl:col-span-8">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
            <h2 className="mb-6 font-display text-xl font-bold">
              Dados Pessoais
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="firstName" className="text-sm font-medium text-zinc-300">Nome</label>
                <input
                  id="firstName"
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50"
                  placeholder="João"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="lastName" className="text-sm font-medium text-zinc-300">Sobrenome</label>
                <input
                  id="lastName"
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50"
                  placeholder="Silva"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-300">E-mail</label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50"
                  placeholder="joao@exemplo.com"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="phone" className="text-sm font-medium text-zinc-300">Celular (WhatsApp)</label>
                <input
                  id="phone"
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <Separator.Root className="my-8 h-px bg-zinc-800" />

            <h2 className="mb-6 font-display text-xl font-bold">
              Endereço de Entrega
            </h2>
            <div className="grid gap-4 sm:grid-cols-6">
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="zip" className="text-sm font-medium text-zinc-300">CEP</label>
                <input
                  id="zip"
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50"
                  placeholder="00000-000"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-4">
                <label htmlFor="street" className="text-sm font-medium text-zinc-300">Rua / Avenida</label>
                <input
                  id="street"
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50"
                  placeholder="Av. Paulista"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="number" className="text-sm font-medium text-zinc-300">Número</label>
                <input
                  id="number"
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50"
                  placeholder="1000"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-4">
                <label htmlFor="complement" className="text-sm font-medium text-zinc-300">Complemento (opcional)</label>
                <input
                  id="complement"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50"
                  placeholder="Apto 123, Bloco B"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-4">
                <label htmlFor="city" className="text-sm font-medium text-zinc-300">Cidade</label>
                <input
                  id="city"
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50"
                  placeholder="São Paulo"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="state" className="text-sm font-medium text-zinc-300">Estado</label>
                <input
                  id="state"
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50"
                  placeholder="SP"
                />
              </div>
            </div>

            <Separator.Root className="my-8 h-px bg-zinc-800" />

            <h2 className="mb-6 font-display text-xl font-bold">
              Pagamento
            </h2>
            <div className="rounded-xl border border-brand-500/30 bg-brand-600/10 p-4">
              <p className="text-sm text-brand-300">
                Esta é uma versão de demonstração. Você não será cobrado e a compra será simulada via boleto/Pix fictício.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-4 text-sm font-bold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/25 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando...
                </>
              ) : (
                'Confirmar Pedido'
              )}
            </button>
          </div>
        </form>

        {/* ── Summary ───────────────────────────────────────────── */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="font-display text-lg font-bold">Seu Pedido</h2>

            <div className="mt-6 flex max-h-64 flex-col gap-4 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800/50">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    )}
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-700 text-[10px] font-bold text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-200 line-clamp-2">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {item.size} {item.color ? `/ ${item.color}` : ''}
                    </p>
                  </div>
                  <div className="text-right text-sm font-bold text-zinc-100">
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </div>
                </div>
              ))}
            </div>

            <Separator.Root className="my-6 h-px bg-zinc-800" />

            <dl className="space-y-3 text-sm">
              <div className="flex items-center justify-between text-zinc-400">
                <dt>Subtotal</dt>
                <dd>R$ {total.toFixed(2).replace('.', ',')}</dd>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <dt>Frete</dt>
                <dd className="text-brand-400">Grátis</dd>
              </div>
              
              <Separator.Root className="my-4 h-px bg-zinc-800" />
              
              <div className="flex items-center justify-between text-lg font-bold text-zinc-100">
                <dt>Total</dt>
                <dd>R$ {finalTotal.toFixed(2).replace('.', ',')}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
