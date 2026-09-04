'use client';

import { useProducts } from '@/hooks/useProducts';
import Link from 'next/link';

export default function ProdutosPage() {
  const { data: produtos, isLoading } = useProducts();

  if (isLoading) return <div>Carregando...</div>;
  if (!produtos) return <div>Nenhum produto</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Produtos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {produtos?.map((p: any) => (
          <Link href={`/produtos/${p.id}`} key={p.id} className="border rounded-lg p-4 block hover:shadow-lg transition">
            <h2 className="font-bold text-lg mb-2">{p.name}</h2>
            <p className="text-purple-600 font-bold">R$ {p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
