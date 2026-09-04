'use client';

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [products, orders] = await Promise.all([
        supabase.from("products").select("id"),
        supabase.from("orders").select("id"),
      ]);
      return {
        productCount: products.data?.length || 0,
        orderCount: orders.data?.length || 0,
      };
    },
  });

  if (!user) {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-purple-100 p-6 rounded-lg">
          <h2 className="text-lg font-bold mb-2">Produtos</h2>
          <p className="text-3xl font-bold">{stats?.productCount || 0}</p>
        </div>
        <div className="bg-pink-100 p-6 rounded-lg">
          <h2 className="text-lg font-bold mb-2">Pedidos</h2>
          <p className="text-3xl font-bold">{stats?.orderCount || 0}</p>
        </div>
      </div>

      <div className="space-y-4">
        <Link
          href="/admin/produtos"
          className="block p-4 border rounded-lg hover:shadow-lg transition"
        >
          <h3 className="font-bold">Gerenciar Produtos</h3>
          <p className="text-sm text-gray-600">Ver, editar, deletar produtos</p>
        </Link>
      </div>
    </div>
  );
}
