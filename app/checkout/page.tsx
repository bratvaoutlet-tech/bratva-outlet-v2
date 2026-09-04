'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // @ts-ignore
      const { data: order } = await supabase
        .from("orders")
        .insert([
          {
            customer_email: formData.email,
            customer_name: formData.name,
            total: getTotalPrice(),
            items: items,
            status: "pending",
          },
        ])
        .select()
        .single();

      if (order) {
        router.push(`/pedido/${order.id}`);
      }
    } catch (error) {
      alert("Erro ao processar pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="name"
              placeholder="Nome completo"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Telefone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="address"
              placeholder="Endereço"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="Cidade"
                value={formData.city}
                onChange={handleChange}
                required
                className="px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="state"
                placeholder="Estado"
                value={formData.state}
                onChange={handleChange}
                required
                className="px-4 py-2 border rounded-lg"
              />
            </div>
            <input
              type="text"
              name="zip"
              placeholder="CEP"
              value={formData.zip}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition disabled:opacity-50"
            >
              {loading ? "Processando..." : "Confirmar Pedido"}
            </button>
          </form>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg h-fit">
          <h2 className="font-bold text-lg mb-4">Resumo</h2>
          <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
            {items.map((item: any) => (
              <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                <span>{item.name} x{item.quantity}</span>
                <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>R$ {(getTotalPrice() as number).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
