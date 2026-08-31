import { useState } from 'react'
import { createFileRoute, Link, useNavigate, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/admin/produtos/novo')({
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) throw redirect({ to: '/login' })
  },
  component: NovoProdutoPage,
  head: () => ({
    meta: [{ title: 'Novo Produto — Admin' }],
  }),
})

const productSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  brand: z.string().min(2, 'Marca deve ter pelo menos 2 caracteres'),
  description: z.string().min(10, 'Descrição muito curta'),
  price: z.number().min(0.01, 'Preço deve ser maior que 0'),
  stock: z.number().int().min(0, 'Estoque não pode ser negativo'),
  category: z.string().min(2, 'Categoria é obrigatória'),
  image_url: z.string().url('URL de imagem inválida').or(z.literal('')),
})

function NovoProdutoPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image_url: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
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
      // Conversão e Validação Zod
      const parsedData = productSchema.parse({
        ...formData,
        price: parseFloat(formData.price || '0'),
        stock: parseInt(formData.stock || '0', 10),
      })

      // Simulate API saving logic (or save to Supabase)
      const { error } = await supabase.from('products').insert([
        {
          name: parsedData.name,
          brand: parsedData.brand,
          description: parsedData.description,
          price: parsedData.price,
          stock: parsedData.stock,
          category: parsedData.category,
          image_url: parsedData.image_url || null,
        },
      ])

      if (error) throw error

      navigate({ to: '/admin/produtos' })
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        err.errors.forEach((errObj) => {
          if (errObj.path[0]) {
            fieldErrors[errObj.path[0].toString()] = errObj.message
          }
        })
        setErrors(fieldErrors)
      } else {
        setServerError(err.message || 'Erro ao criar produto')
      }
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
      {/* ── Breadcrumb ────────────────────────────────────────────── */}
      <nav className="mb-8 flex text-sm text-zinc-500">
        <ol className="flex items-center space-x-2">
          <li><Link to="/admin" className="hover:text-zinc-300">Admin</Link></li>
          <li><span className="mx-2">/</span></li>
          <li><Link to="/admin/produtos" className="hover:text-zinc-300">Produtos</Link></li>
          <li><span className="mx-2">/</span></li>
          <li className="font-medium text-zinc-100">Novo Produto</li>
        </ol>
      </nav>

      <div className="mb-8 border-b border-zinc-800 pb-8">
        <h1 className="font-display text-3xl font-bold text-zinc-100">Adicionar Produto</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Preencha os dados abaixo para cadastrar um novo item na loja.
        </p>
      </div>

      {serverError && (
        <div className="mb-6 rounded-xl border border-red-900/50 bg-red-500/10 p-4 text-sm text-red-400">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            
            {/* Nome */}
            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="name" className="text-sm font-medium text-zinc-300">Nome do Produto</label>
              <input
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:ring-1 ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-zinc-800 focus:border-brand-500 focus:ring-brand-500/50'}`}
                placeholder="Ex: Tênis Nike Air Max"
              />
              {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
            </div>

            {/* Marca e Categoria */}
            <div className="space-y-1.5">
              <label htmlFor="brand" className="text-sm font-medium text-zinc-300">Marca</label>
              <input
                id="brand"
                value={formData.brand}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:ring-1 ${errors.brand ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-zinc-800 focus:border-brand-500 focus:ring-brand-500/50'}`}
                placeholder="Ex: Nike"
              />
              {errors.brand && <p className="text-xs text-red-400">{errors.brand}</p>}
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="category" className="text-sm font-medium text-zinc-300">Categoria</label>
              <input
                id="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:ring-1 ${errors.category ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-zinc-800 focus:border-brand-500 focus:ring-brand-500/50'}`}
                placeholder="Ex: Tênis"
              />
              {errors.category && <p className="text-xs text-red-400">{errors.category}</p>}
            </div>

            {/* Preço e Estoque */}
            <div className="space-y-1.5">
              <label htmlFor="price" className="text-sm font-medium text-zinc-300">Preço (R$)</label>
              <input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:ring-1 ${errors.price ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-zinc-800 focus:border-brand-500 focus:ring-brand-500/50'}`}
                placeholder="0.00"
              />
              {errors.price && <p className="text-xs text-red-400">{errors.price}</p>}
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="stock" className="text-sm font-medium text-zinc-300">Estoque (un)</label>
              <input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:ring-1 ${errors.stock ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-zinc-800 focus:border-brand-500 focus:ring-brand-500/50'}`}
                placeholder="0"
              />
              {errors.stock && <p className="text-xs text-red-400">{errors.stock}</p>}
            </div>

            {/* Imagem */}
            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="image_url" className="text-sm font-medium text-zinc-300">URL da Imagem (Opcional)</label>
              <input
                id="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:ring-1 ${errors.image_url ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-zinc-800 focus:border-brand-500 focus:ring-brand-500/50'}`}
                placeholder="https://exemplo.com/imagem.jpg"
              />
              {errors.image_url && <p className="text-xs text-red-400">{errors.image_url}</p>}
            </div>

            {/* Descrição */}
            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="description" className="text-sm font-medium text-zinc-300">Descrição</label>
              <textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className={`w-full resize-y rounded-xl border bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:ring-1 ${errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-zinc-800 focus:border-brand-500 focus:ring-brand-500/50'}`}
                placeholder="Descreva os detalhes do produto..."
              />
              {errors.description && <p className="text-xs text-red-400">{errors.description}</p>}
            </div>

          </div>
        </div>

        {/* ── Actions ─────────────────────────────────────────── */}
        <div className="flex justify-end gap-4">
          <Link
            to="/admin/produtos"
            className="rounded-xl border border-zinc-700 bg-transparent px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar Produto'}
          </button>
        </div>
      </form>
    </div>
  )
}
