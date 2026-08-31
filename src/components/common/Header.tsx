import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import * as Dialog from '@radix-ui/react-dialog'
import * as Separator from '@radix-ui/react-separator'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'

const NAV_LINKS = [
  { to: '/' as const, label: 'Home' },
  { to: '/produtos' as const, label: 'Produtos' },
  { to: '/carrinho' as const, label: 'Carrinho' },
] as const

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { getTotalItems, isHydrated } = useCart()
  const { user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* ── Logo ──────────────────────────────────────────────────── */}
        <Link
          to="/"
          className="group flex items-center gap-2 font-display text-xl font-bold tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-extrabold text-white transition-transform group-hover:scale-110">
            B
          </span>
          <span>
            BRATVA<span className="text-brand-500">OUTLET</span>
          </span>
        </Link>

        {/* ── Desktop Nav ───────────────────────────────────────────── */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800/60 hover:text-zinc-100 [&.active]:bg-brand-600/10 [&.active]:text-brand-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Actions ───────────────────────────────────────────────── */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            id="btn-search"
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            aria-label="Buscar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>

          <Separator.Root
            orientation="vertical"
            className="mx-1 hidden h-6 w-px bg-zinc-800 md:block"
          />

          {/* Cart */}
          <Link
            to="/carrinho"
            id="btn-cart"
            className="relative rounded-lg bg-zinc-900 p-2 transition-colors hover:bg-zinc-800"
            aria-label="Carrinho"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {isHydrated && getTotalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                {getTotalItems}
              </span>
            )}
          </Link>

          <Separator.Root
            orientation="vertical"
            className="mx-1 hidden h-6 w-px bg-zinc-800 md:block"
          />

          {/* User Auth */}
          <div className="hidden items-center md:flex">
            {user ? (
              <div className="group relative flex items-center gap-3 rounded-lg border border-transparent px-2 py-1.5 transition-colors hover:border-zinc-800 hover:bg-zinc-900/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600/20 text-sm font-bold text-brand-400">
                  {user.user_metadata?.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
                </div>
                
                {/* Dropdown menu simples on hover */}
                <div className="absolute right-0 top-full mt-2 hidden w-48 origin-top-right flex-col rounded-xl border border-zinc-800 bg-zinc-950 p-2 shadow-xl group-hover:flex">
                  <span className="block truncate px-3 py-2 text-xs text-zinc-500">
                    {user.email}
                  </span>
                  <Separator.Root className="my-1 h-px bg-zinc-800" />
                  <Link
                    to="/admin"
                    className="rounded-lg px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
                  >
                    Painel Admin
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="rounded-lg px-3 py-2 text-left text-sm text-zinc-300 transition-colors hover:bg-red-950/50 hover:text-red-400"
                  >
                    Sair
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-brand-400 transition-colors hover:bg-brand-600/10 hover:text-brand-300"
              >
                Entrar
              </Link>
            )}
          </div>

          {/* ── Mobile Menu (Radix Dialog) ──────────────────────────── */}
          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger asChild>
              <button
                id="btn-mobile-menu"
                className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 md:hidden"
                aria-label="Abrir menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l border-zinc-800 bg-zinc-950 p-6 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold">Menu</span>
                  <Dialog.Close asChild>
                    <button
                      className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                      aria-label="Fechar menu"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </Dialog.Close>
                </div>

                <Separator.Root className="my-4 h-px bg-zinc-800" />

                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-4 py-3 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800/60 hover:text-zinc-100 [&.active]:bg-brand-600/10 [&.active]:text-brand-400"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  )
}
