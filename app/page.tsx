import { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Bratva Outlet - Home",
  description: "Calçados premium com desconto"
};

export default async function Home() {
  try {
    const { data: products } = await supabase
      .from("products")
      .select("*")
      .limit(6);

    return (
      <div className="space-y-12">
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Bratva Outlet</h1>
            <p className="text-xl mb-8">Calçados premium com desconto</p>
            <Link
              href="/produtos"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Ver Produtos
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Categorias</h2>
          <div className="grid grid-cols-3 gap-4">
            {["Tênis", "Sapatos", "Sandálias"].map((cat) => (
              <div key={cat} className="bg-gray-100 p-6 rounded-lg text-center hover:shadow-lg transition cursor-pointer">
                <h3 className="font-bold text-lg">{cat}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Destaques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((product: any) => (
              <Link key={product.id} href={`/produtos/${product.id}`}>
                <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer h-full">
                  <div className="bg-gray-200 h-40"></div>
                  <div className="p-4">
                    <h3 className="font-bold line-clamp-2">{product.name}</h3>
                    <p className="text-purple-600 font-bold">R$ {product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Receba ofertas exclusivas</h2>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Seu email"
                className="flex-1 px-4 py-2 rounded text-gray-900"
              />
              <button className="bg-purple-600 px-6 py-2 rounded font-bold hover:bg-purple-700 transition">
                Inscrever
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    return <div>Erro ao carregar página</div>;
  }
}
