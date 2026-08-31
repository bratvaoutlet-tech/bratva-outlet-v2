import { createFileRoute, redirect } from '@tanstack/react-router'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/admin/')({
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: AdminPage,
  head: () => ({
    meta: [{ title: 'Painel Admin — Bratva Outlet' }],
  }),
})

function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-8 border-b border-zinc-800 pb-8">
        <h1 className="font-display text-3xl font-bold text-zinc-100">
          Painel Administrativo
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Bem-vindo à área restrita. Somente usuários autenticados podem ver esta página.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder cards for admin dashboard */}
        {[
          { title: 'Vendas Hoje', value: 'R$ 2.450,00', trend: '+15%' },
          { title: 'Pedidos Pendentes', value: '12', trend: '-2' },
          { title: 'Clientes Ativos', value: '840', trend: '+120' },
          { title: 'Produtos sem Estoque', value: '5', trend: 'Atenção' },
        ].map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
          >
            <p className="text-sm font-medium text-zinc-400">{stat.title}</p>
            <p className="mt-2 font-display text-2xl font-bold text-zinc-100">
              {stat.value}
            </p>
            <p
              className={`mt-2 text-xs font-medium ${
                stat.trend.includes('+')
                  ? 'text-green-400'
                  : stat.trend.includes('-')
                    ? 'text-red-400'
                    : 'text-amber-400'
              }`}
            >
              {stat.trend}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
