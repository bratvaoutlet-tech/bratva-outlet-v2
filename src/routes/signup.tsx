import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/signup')({
  component: SignUpPage,
  head: () => ({
    meta: [{ title: 'Criar Conta — Bratva Outlet' }],
  }),
})

const signUpSchema = z
  .object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

function SignUpPage() {
  const { signUp, user, isLoading } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Redireciona se já estiver logado
  if (!isLoading && user) {
    navigate({ to: '/', replace: true })
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    // Limpa erro do campo ao digitar
    if (errors[e.target.id]) {
      setErrors((prev) => ({ ...prev, [e.target.id]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setServerError(null)
    setErrors({})

    try {
      // Validação Zod
      const validData = signUpSchema.parse(formData)

      // Supabase Auth
      const { error: signUpError } = await signUp(
        validData.email,
        validData.password,
        validData.name,
      )

      if (signUpError) throw signUpError

      setIsSuccess(true)
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        err.errors.forEach((e) => {
          if (e.path[0]) {
            fieldErrors[e.path[0].toString()] = e.message
          }
        })
        setErrors(fieldErrors)
      } else {
        setServerError(err.message || 'Erro ao criar conta')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 text-center shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/20 text-brand-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold text-zinc-100">
            Verifique seu e-mail
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Enviamos um link de confirmação para <br />
            <strong className="text-zinc-300">{formData.email}</strong>
          </p>
          <Link
            to="/login"
            className="mt-8 flex w-full justify-center rounded-xl border border-zinc-700 bg-zinc-800 py-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
          >
            Voltar para o Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-bold text-zinc-100">
            Criar Conta
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Junte-se a milhares de clientes VIP
          </p>
        </div>

        {serverError && (
          <div className="mb-6 rounded-xl border border-red-900/50 bg-red-500/10 p-4 text-sm text-red-400">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-medium text-zinc-300">
              Nome Completo
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-xl border bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:ring-1 ${
                errors.name
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-zinc-800 focus:border-brand-500 focus:ring-brand-500/50'
              }`}
              placeholder="João da Silva"
            />
            {errors.name && (
              <p className="text-xs text-red-400">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-zinc-300">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-xl border bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:ring-1 ${
                errors.email
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-zinc-800 focus:border-brand-500 focus:ring-brand-500/50'
              }`}
              placeholder="seu@email.com"
            />
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-300"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full rounded-xl border bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:ring-1 ${
                errors.password
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-zinc-800 focus:border-brand-500 focus:ring-brand-500/50'
              }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-xs text-red-400">{errors.password}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-zinc-300"
            >
              Confirmar Senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full rounded-xl border bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:ring-1 ${
                errors.confirmPassword
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-zinc-800 focus:border-brand-500 focus:ring-brand-500/50'
              }`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-400">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="mt-8 flex w-full items-center justify-center rounded-xl bg-brand-600 py-3.5 text-sm font-bold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/25 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Criar Conta'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Já tem uma conta?{' '}
          <Link
            to="/login"
            className="font-semibold text-zinc-300 hover:text-white"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}
