'use client';

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";

export default function ProdutosPage() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("cat") || "");
  
  const { data: products = [], isLoading } = useProducts();

  const filtered = products.filter((p: any) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !category || p.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Produtos</h1>

      <div className="mb-8 flex gap-4 flex-col md:flex-row">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">Todas</option>
          <option value="Tênis">Tênis</option>
          <option value="Sapatos">Sapatos</option>
          <option value="Sandálias">Sandálias</option>
        </select>
      </div>

      {isLoading ? (
        <p className="text-center">Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product: any) => (
            <Link key={product.id} href={`/produtos/${product.id}`}>
              <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer h-full">
                <div className="bg-gray-200 h-40"></div>
                <div className="p-4">
                  <h3 className="font-bold line-clamp-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.category}</p>
                  <p className="text-purple-600 font-bold mt-2">R$ {product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
