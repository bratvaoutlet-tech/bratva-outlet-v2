import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [
      { title: 'Bratva Outlet V2 — Moda Premium' },
      {
        name: 'description',
        content:
          'As melhores marcas com os melhores preços. Confira nosso outlet online.',
      },
    ],
  }),
})

function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center py-24 text-center">
        <span className="mb-4 inline-block rounded-full bg-brand-500/10 px-4 py-1.5 text-xs font-medium text-brand-400">
          Nova Coleção Disponível
        </span>

        <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
          Estilo sem
          <br />
          <span className="text-gradient">Compromisso</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-zinc-400">
          Marcas premium até 70% OFF. Qualidade original, preços que cabem no
          seu bolso.
        </p>

        <div className="mt-10 flex gap-4">
          <button
            id="cta-produtos"
            className="rounded-xl bg-brand-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/25"
          >
            Ver Produtos
          </button>
          <button
            id="cta-sobre"
            className="rounded-xl border border-zinc-700 bg-zinc-900 px-8 py-3 text-sm font-semibold text-zinc-300 transition-all hover:border-zinc-600 hover:bg-zinc-800"
          >
            Sobre Nós
          </button>
        </div>
      </section>

      {/* Feature cards placeholder */}
      <section className="grid gap-6 py-16 md:grid-cols-3">
        {[
          {
            icon: '🚚',
            title: 'Frete Grátis',
            desc: 'Para compras acima de R$ 299',
          },
          {
            icon: '🔄',
            title: 'Troca Fácil',
            desc: 'Até 30 dias para trocar',
          },
          {
            icon: '🔒',
            title: 'Compra Segura',
            desc: 'Pagamento 100% protegido',
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-center transition-colors hover:border-zinc-700"
          >
            <span className="text-3xl">{feature.icon}</span>
            <h3 className="mt-3 font-semibold">{feature.title}</h3>
            <p className="mt-1 text-sm text-zinc-500">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
