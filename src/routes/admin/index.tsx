import { createFileRoute, redirect, Link } from '@tanstack/react-router'
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
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* ── Breadcrumb ────────────────────────────────────────────── */}
      <nav className="mb-8 flex text-sm text-zinc-500">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/admin" className="hover:text-zinc-300">
              Admin
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="font-medium text-zinc-100">Dashboard</li>
        </ol>
      </nav>

      <div className="mb-8 flex items-center justify-between border-b border-zinc-800 pb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-zinc-100">
            Painel Administrativo
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Visão geral da sua loja
          </p>
        </div>
        <Link
          to="/admin/produtos"
          className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
        >
          Gerenciar Produtos
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Cards */}
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

      {/* ── Mock Chart (Tailwind CSS) ─────────────────────────────── */}
      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 lg:p-8">
        <h2 className="mb-6 font-display text-lg font-bold">Vendas Recentes (Mock)</h2>
        <div className="flex h-64 items-end gap-2 sm:gap-4">
          {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
            <div key={i} className="group relative flex flex-1 flex-col items-center justify-end">
              <div 
                className="w-full rounded-t-lg bg-brand-600/20 transition-all group-hover:bg-brand-500/50"
                style={{ height: `${height}%` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-zinc-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {height * 12}
                </div>
              </div>
              <span className="mt-2 text-xs text-zinc-500">Dia {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
