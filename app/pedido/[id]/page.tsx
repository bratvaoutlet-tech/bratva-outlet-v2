'use client';

import Link from "next/link";
import { useParams } from "next/navigation";

export default function PedidoPage() {
  const params = useParams();

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <div className="bg-green-100 text-green-800 p-8 rounded-lg mb-8">
        <h1 className="text-3xl font-bold mb-4">✓ Pedido Confirmado!</h1>
        <p className="text-lg mb-4">Número do pedido: <span className="font-bold">{params.id}</span></p>
        <p className="mb-4">Um email de confirmação foi enviado com os detalhes do seu pedido.</p>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600">Você pode acompanhar seu pedido na sua conta.</p>
        <Link
          href="/produtos"
          className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700 transition"
        >
          Continuar Comprando
        </Link>
      </div>
    </div>
  );
}
