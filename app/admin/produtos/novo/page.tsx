// @ts-nocheck
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

export default function NovoProdutoPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    price: string;
    category: string;
  }>({
    name: "",
    description: "",
    price: "",
    category: "Tênis",
  });

  if (!user) {
    router.push("/auth/login");
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await supabase
        .from("products")
        .insert([
          {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
          } as any,
        ]);
      router.push("/admin/produtos");
    } catch (error) {
      alert("Erro ao criar produto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Novo Produto</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          name="description"
          placeholder="Descrição"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          rows={4}
        />
        <input
          type="number"
          name="price"
          placeholder="Preço"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="Tênis">Tênis</option>
          <option value="Sapatos">Sapatos</option>
          <option value="Sandálias">Sandálias</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 rounded-lg font-bold hover:bg-purple-700 transition disabled:opacity-50"
        >
          {loading ? "Criando..." : "Criar Produto"}
        </button>
      </form>
    </div>
  );
}
