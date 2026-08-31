import { Link } from '@tanstack/react-router'
import * as Separator from '@radix-ui/react-separator'

const FOOTER_NAV = [
  { to: '/' as const, label: 'Home' },
  { to: '/produtos' as const, label: 'Produtos' },
  { to: '/carrinho' as const, label: 'Carrinho' },
]

const FOOTER_SUPPORT = [
  { href: '#', label: 'Central de Ajuda' },
  { href: '#', label: 'Trocas e Devoluções' },
  { href: '#', label: 'Rastrear Pedido' },
  { href: '#', label: 'Política de Privacidade' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-800/50 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* ── Brand ────────────────────────────────────────────────── */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-600 text-xs font-extrabold text-white">
                B
              </span>
              BRATVA<span className="text-brand-500">OUTLET</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
              Moda premium com os melhores preços. Qualidade e estilo ao seu
              alcance desde 2024.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {['instagram', 'tiktok', 'whatsapp'].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-500 transition-all hover:border-brand-600/50 hover:text-brand-400"
                >
                  <SocialIcon name={social} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Navigation ───────────────────────────────────────────── */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-300">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_NAV.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-zinc-500 transition-colors hover:text-zinc-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Support ──────────────────────────────────────────────── */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-300">
              Suporte
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_SUPPORT.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-zinc-500 transition-colors hover:text-zinc-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ──────────────────────────────────────────────── */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-300">
              Contato
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-500">
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                contato@bratvaoutlet.com
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                (11) 99999-9999
              </li>
            </ul>
          </div>
        </div>

        <Separator.Root className="my-10 h-px bg-zinc-800/70" />

        {/* ── Bottom bar ──────────────────────────────────────────── */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-zinc-600 sm:flex-row">
          <p>© {currentYear} Bratva Outlet. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="transition-colors hover:text-zinc-400">Termos de Uso</a>
            <a href="#" className="transition-colors hover:text-zinc-400">Privacidade</a>
            <a href="#" className="transition-colors hover:text-zinc-400">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── Tiny Social Icon helper ───────────────────────────────────────────── */

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case 'instagram':
      return (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      )
    case 'tiktok':
      return (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      )
    default:
      return null
  }
}
