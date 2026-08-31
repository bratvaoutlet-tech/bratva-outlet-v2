import { createFileRoute, Link } from '@tanstack/react-router'
import * as Separator from '@radix-ui/react-separator'

export const Route = createFileRoute('/pedido/$id')({
  component: PedidoPage,
  head: () => ({
    meta: [{ title: 'Pedido Confirmado — Bratva Outlet' }],
  }),
})

function PedidoPage() {
  const { id } = Route.useParams()

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="mt-6 font-display text-3xl font-bold">
          Pedido Confirmado!
        </h1>
        <p className="mt-2 text-zinc-400">
          Obrigado pela sua compra. Seu pedido <strong className="text-zinc-200">#{id}</strong> foi recebido e está sendo processado.
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold">O que acontece agora?</h2>
        <ul className="mt-6 space-y-4">
          <li className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
              1
            </span>
            <div>
              <p className="font-medium text-zinc-200">Confirmação de Pagamento</p>
              <p className="text-sm text-zinc-500">
                Você receberá um e-mail assim que o pagamento for aprovado. (Lembrando que esta é uma demonstração, nenhum valor foi cobrado).
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-bold text-zinc-400">
              2
            </span>
            <div>
              <p className="font-medium text-zinc-200">Separação e Envio</p>
              <p className="text-sm text-zinc-500">
                Separamos seus produtos com cuidado. O prazo de postagem é de até 2 dias úteis.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-bold text-zinc-400">
              3
            </span>
            <div>
              <p className="font-medium text-zinc-200">Entrega</p>
              <p className="text-sm text-zinc-500">
                Enviaremos o código de rastreio para você acompanhar a entrega até sua casa.
              </p>
            </div>
          </li>
        </ul>

        <Separator.Root className="my-8 h-px bg-zinc-800" />

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <button
            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 py-3 text-sm font-bold text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-zinc-100"
          >
            Acompanhar Pedido
          </button>
          <Link
            to="/"
            className="flex-1 rounded-xl bg-brand-600 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-brand-500"
          >
            Voltar para a Loja
          </Link>
        </div>
      </div>
    </div>
  )
}
