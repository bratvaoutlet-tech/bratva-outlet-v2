import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/login')({
  component: LoginPage,
  head: () => ({
    meta: [{ title: 'Entrar — Bratva Outlet' }],
  }),
})

function LoginPage() {
  const { signIn, user, isLoading } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redireciona se já estiver logado
  if (!isLoading && user) {
    navigate({ to: '/', replace: true })
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const { error: signInError } = await signIn(email, password)
      if (signInError) throw signInError

      navigate({ to: '/', replace: true })
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-bold text-zinc-100">
            Bem-vindo de volta
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Acesse sua conta para continuar
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-900/50 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-zinc-300">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50"
              placeholder="seu@email.com"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-300"
              >
                Senha
              </label>
              <Link
                to="/"
                className="text-xs font-medium text-brand-400 hover:text-brand-300"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="mt-6 flex w-full items-center justify-center rounded-xl bg-brand-600 py-3.5 text-sm font-bold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/25 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Não tem uma conta?{' '}
          <Link
            to="/signup"
            className="font-semibold text-zinc-300 hover:text-white"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
