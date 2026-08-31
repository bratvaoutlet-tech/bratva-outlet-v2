import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/produtos/$id')({
  component: ProdutoPage,
  head: () => ({
    meta: [{ title: 'Produto — Bratva Outlet' }],
  }),
})

function ProdutoPage() {
  const { id } = Route.useParams()

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <nav className="mb-8 text-sm text-zinc-500">
        <span>Home</span>
        <span className="mx-2">/</span>
        <span>Produtos</span>
        <span className="mx-2">/</span>
        <span className="text-zinc-300">{id}</span>
      </nav>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Image placeholder */}
        <div className="aspect-square rounded-2xl border border-zinc-800 bg-zinc-900/50" />

        {/* Product info placeholder */}
        <div className="space-y-6">
          <h1 className="font-display text-3xl font-bold">Produto {id}</h1>
          <p className="text-2xl font-semibold text-brand-400">R$ --,--</p>
          <p className="text-sm text-zinc-500">
            Detalhes do produto serão carregados do Supabase.
          </p>

          <button
            id="btn-add-to-cart"
            className="w-full rounded-xl bg-brand-600 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/25"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  )
}
