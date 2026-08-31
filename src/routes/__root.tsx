import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Outlet,
  ScrollRestoration,
} from '@tanstack/react-router'
import { Meta, Scripts } from '@tanstack/react-start'
import { Header } from '@/components/common/Header'
import { Footer } from '@/components/common/Footer'
import appCss from '@/styles/globals.css?url'

// ─── Query Client (shared across SSR + client) ─────────────────────────────

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 min
      refetchOnWindowFocus: false,
    },
  },
})

// ─── Root Route ─────────────────────────────────────────────────────────────

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Bratva Outlet V2' },
      {
        name: 'description',
        content: 'Bratva Outlet — Moda premium com os melhores preços',
      },
      { name: 'theme-color', content: '#09090b' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
    ],
  }),
  component: RootComponent,
})

// ─── Root Component ─────────────────────────────────────────────────────────

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootDocument>
        <Header />
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </RootDocument>
    </QueryClientProvider>
  )
}

// ─── HTML Shell ─────────────────────────────────────────────────────────────

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <Meta />
      </head>
      <body className="overflow-x-hidden">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
