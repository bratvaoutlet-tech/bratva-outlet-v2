import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/carrinho')({
  component: CarrinhoPage,
  head: () => ({
    meta: [{ title: 'Carrinho — Bratva Outlet' }],
  }),
})

function CarrinhoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-display text-3xl font-bold">Carrinho</h1>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-16 w-16 text-zinc-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>

        <p className="mt-4 text-zinc-500">Seu carrinho está vazio</p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
        >
          Continuar Comprando
        </Link>
      </div>
    </div>
  )
}
