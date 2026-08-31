import { createFileRoute, Link } from '@tanstack/react-router'

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

// ─── Mock de produtos para a homepage ───────────────────────────────────────

const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Camiseta Oversized Premium',
    brand: 'ESSENTIALS',
    price: 189.9,
    compare_at_price: 349.9,
    image: null,
  },
  {
    id: '2',
    name: 'Calça Cargo Streetwear',
    brand: 'URBAN CO.',
    price: 259.9,
    compare_at_price: 459.9,
    image: null,
  },
  {
    id: '3',
    name: 'Jaqueta Corta-Vento',
    brand: 'STORM',
    price: 329.9,
    compare_at_price: 599.9,
    image: null,
  },
  {
    id: '4',
    name: 'Tênis Runner Pro',
    brand: 'VELOCITY',
    price: 449.9,
    compare_at_price: 799.9,
    image: null,
  },
]

const CATEGORIES = [
  { name: 'Camisetas', slug: 'camisetas', emoji: '👕', count: 48 },
  { name: 'Calças', slug: 'calcas', emoji: '👖', count: 32 },
  { name: 'Tênis', slug: 'tenis', emoji: '👟', count: 24 },
  { name: 'Acessórios', slug: 'acessorios', emoji: '⌚', count: 56 },
  { name: 'Jaquetas', slug: 'jaquetas', emoji: '🧥', count: 18 },
  { name: 'Bermudas', slug: 'bermudas', emoji: '🩳', count: 20 },
]

// ─── Page Component ─────────────────────────────────────────────────────────

function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background gradient blobs */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute -top-20 right-0 h-[300px] w-[400px] rounded-full bg-brand-500/5 blur-[80px]" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pb-20 pt-28 text-center lg:px-8 lg:pt-36">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-xs font-medium text-brand-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
            </span>
            Nova Coleção Disponível
          </span>

          <h1 className="font-display text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Estilo sem
            <br />
            <span className="bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 bg-clip-text text-transparent">
              Compromisso
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Marcas premium até <strong className="text-zinc-200">70% OFF</strong>.
            Qualidade original, preços que cabem no seu bolso.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/produtos"
              id="cta-produtos"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-xl hover:shadow-brand-500/25"
            >
              Ver Produtos
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <button
              id="cta-sobre"
              className="rounded-xl border border-zinc-700 bg-zinc-900/80 px-8 py-3.5 text-sm font-semibold text-zinc-300 transition-all hover:border-zinc-600 hover:bg-zinc-800"
            >
              Sobre Nós
            </button>
          </div>

          {/* Stats strip */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-center sm:gap-16">
            {[
              { value: '2K+', label: 'Clientes' },
              { value: '500+', label: 'Produtos' },
              { value: '70%', label: 'Desconto máx.' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-zinc-100">
                  {stat.value}
                </p>
                <p className="text-xs text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Categorias
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Encontre exatamente o que procura
            </p>
          </div>
          <Link
            to="/produtos"
            className="hidden text-sm font-medium text-brand-400 transition-colors hover:text-brand-300 sm:inline-flex sm:items-center sm:gap-1"
          >
            Ver todas
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to="/produtos"
              search={{ category: cat.slug }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 text-center transition-all hover:border-brand-600/40 hover:bg-brand-600/5"
            >
              <span className="text-3xl transition-transform group-hover:scale-110">
                {cat.emoji}
              </span>
              <div>
                <p className="text-sm font-semibold text-zinc-200">
                  {cat.name}
                </p>
                <p className="text-xs text-zinc-600">{cat.count} itens</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Destaques
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Os mais vendidos desta semana
            </p>
          </div>
          <Link
            to="/produtos"
            className="hidden text-sm font-medium text-brand-400 transition-colors hover:text-brand-300 sm:inline-flex sm:items-center sm:gap-1"
          >
            Ver todos
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PRODUCTS.map((product) => (
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
      </section>

      {/* ── Features strip ────────────────────────────────────────── */}
      <section className="border-y border-zinc-800/50 bg-zinc-900/30">
        <div className="mx-auto grid max-w-7xl gap-px sm:grid-cols-3">
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
              className="flex items-center gap-4 px-6 py-8 lg:px-10"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-xl">
                {feature.icon}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-zinc-200">
                  {feature.title}
                </h3>
                <p className="text-xs text-zinc-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Newsletter CTA ────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 px-6 py-16 text-center sm:px-16">
          {/* Glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-brand-600/15 blur-[80px]" />

          <h2 className="relative font-display text-2xl font-bold sm:text-3xl">
            Fique por dentro das{' '}
            <span className="text-gradient">novidades</span>
          </h2>
          <p className="relative mt-2 text-sm text-zinc-500">
            Receba ofertas exclusivas e lançamentos direto no seu e-mail.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative mx-auto mt-8 flex max-w-md gap-2"
          >
            <input
              id="newsletter-email"
              type="email"
              placeholder="seu@email.com"
              className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-500"
            >
              Assinar
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
