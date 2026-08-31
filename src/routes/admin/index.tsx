import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  component: AdminPage,
  head: () => ({
    meta: [{ title: 'Admin — Bratva Outlet' }],
  }),
})

function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="font-display text-3xl font-bold">Painel Admin</h1>
      <p className="mt-2 text-zinc-500">
        Dashboard administrativo em construção.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          { label: 'Pedidos', value: '—', color: 'brand' },
          { label: 'Receita', value: 'R$ —', color: 'green' },
          { label: 'Clientes', value: '—', color: 'blue' },
          { label: 'Produtos', value: '—', color: 'amber' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              {stat.label}
            </p>
            <p className="mt-2 font-display text-2xl font-bold">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
