import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types'

export const Route = createFileRoute('/admin/produtos')({
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) throw redirect({ to: '/login' })
  },
  component: AdminProdutosPage,
  head: () => ({
    meta: [{ title: 'Gerenciar Produtos — Admin' }],
  }),
})

function AdminProdutosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // States para deleção
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchProducts = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setProducts(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    
    // Simulate API delay
    await new Promise((res) => setTimeout(res, 800))
    // await supabase.from('products').delete().eq('id', deleteId)
    
    setProducts((prev) => prev.filter((p) => p.id !== deleteId))
    setDeleteId(null)
    setIsDeleting(false)
  }

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
          <li><span className="mx-2">/</span></li>
          <li className="font-medium text-zinc-100">Produtos</li>
        </ol>
      </nav>

      <div className="mb-8 flex items-center justify-between border-b border-zinc-800 pb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-zinc-100">
            Gerenciar Produtos
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Cadastre, edite e remova produtos do catálogo
          </p>
        </div>
        <Link
          to="/admin/produtos/novo"
          className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
        >
          + Novo Produto
        </Link>
      </div>

      {/* ── Tabela ────────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-zinc-900 text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-6 py-4 font-medium">Produto</th>
                <th className="px-6 py-4 font-medium">Preço</th>
                <th className="px-6 py-4 font-medium">Estoque</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">
                    Carregando produtos...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">
                    Nenhum produto cadastrado.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="transition-colors hover:bg-zinc-800/20">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-zinc-800">
                          {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-zinc-600">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-zinc-200">{product.name}</p>
                          <p className="text-xs text-zinc-500">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-zinc-300">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        product.stock > 10 ? 'bg-green-500/10 text-green-400' :
                        product.stock > 0 ? 'bg-amber-500/10 text-amber-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {product.stock} un
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="rounded px-2 py-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-brand-400">
                          Editar
                        </button>
                        <button 
                          onClick={() => setDeleteId(product.id)}
                          className="rounded px-2 py-1 text-zinc-400 transition-colors hover:bg-red-950/50 hover:text-red-400"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Dialog Confirmação Exclusão ───────────────────────────── */}
      <Dialog.Root open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            <Dialog.Title className="font-display text-lg font-bold text-zinc-100">
              Confirmar Exclusão
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-zinc-400">
              Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
            </Dialog.Description>
            <div className="mt-6 flex justify-end gap-3">
              <Dialog.Close asChild>
                <button className="rounded-xl border border-zinc-700 bg-transparent px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800">
                  Cancelar
                </button>
              </Dialog.Close>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-50"
              >
                {isDeleting ? 'Excluindo...' : 'Sim, excluir'}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
