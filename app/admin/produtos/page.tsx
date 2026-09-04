// @ts-nocheck
'use client';

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function AdminProdutosPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: products, refetch } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data } = await supabase.from("products").select("*");
      return data;
    },
  });

  if (!user) {
    router.push("/auth/login");
    return null;
  }

  const handleDelete = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    refetch();
    setDeleteId(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <Link
          href="/admin/produtos/novo"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          + Novo Produto
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Categoria</th>
              <th className="px-4 py-2 text-left">Preço</th>
              <th className="px-4 py-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product: any) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">R$ {product.price}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setDeleteId(product.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <p className="mb-4">Tem certeza que quer deletar?</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleDelete(deleteId)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Deletar
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
