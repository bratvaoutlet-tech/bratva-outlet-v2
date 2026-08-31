import { Link } from '@tanstack/react-router'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-800/50 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              to="/"
              className="font-display text-lg font-bold tracking-tight"
            >
              BRATVA<span className="text-brand-500">OUTLET</span>
            </Link>
            <p className="text-sm text-zinc-500">
              Moda premium com os melhores preços. Qualidade e estilo ao seu
              alcance.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>
                <Link
                  to="/"
                  className="transition-colors hover:text-zinc-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/carrinho"
                  className="transition-colors hover:text-zinc-300"
                >
                  Carrinho
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Suporte
            </h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>
                <a href="#" className="transition-colors hover:text-zinc-300">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-zinc-300">
                  Trocas e Devoluções
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-zinc-300">
                  Rastrear Pedido
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Contato
            </h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>contato@bratvaoutlet.com</li>
              <li>WhatsApp: (11) 99999-9999</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-800 pt-8 text-center text-xs text-zinc-600">
          © {currentYear} Bratva Outlet. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
