'use client';

import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export default function CarrinhoPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
        <Link href="/produtos" className="text-purple-600 hover:underline">
          Continuar comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Carrinho</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item: any) => (
            <div key={`${item.id}-${item.size}-${item.color}`} className="border-b py-4 flex gap-4">
              <div className="bg-gray-200 w-20 h-20 rounded"></div>
              <div className="flex-1">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.size} - {item.color}</p>
                <p className="text-purple-600 font-bold">R$ {item.price}</p>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-12 px-2 py-1 border rounded"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-100 p-6 rounded-lg h-fit">
          <h2 className="font-bold text-lg mb-4">Resumo</h2>
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span>R$ {(getTotalPrice() as number).toFixed(2)}</span>
          </div>
          <div className="border-t pt-4 flex justify-between font-bold mb-6">
            <span>Total</span>
            <span>R$ {(getTotalPrice() as number).toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            className="w-full block text-center bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Finalizar Compra
          </Link>
        </div>
      </div>
    </div>
  );
}
