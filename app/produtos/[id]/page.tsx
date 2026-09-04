'use client';

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProduct } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";

export default function ProdutoPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const { addItem } = useCart();

  const { data: product, isLoading } = useProduct(params.id as string);

  const handleAddCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Selecione tamanho e cor");
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
    } as any);
    router.push("/carrinho");
  };

  if (isLoading) return <div className="text-center py-12">Carregando...</div>;
  if (!product) return <div className="text-center py-12">Produto não encontrado</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Imagem do produto</span>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.category}</p>
          <p className="text-2xl font-bold text-purple-600 mb-6">R$ {product.price}</p>

          <div className="mb-6">
            <label className="block font-bold mb-2">Cor</label>
            <div className="flex gap-2">
              {["Preto", "Branco", "Azul"].map((cor) => (
                <button
                  key={cor}
                  onClick={() => setSelectedColor(cor)}
                  className={`px-4 py-2 rounded border transition ${
                    selectedColor === cor
                      ? "bg-purple-600 text-white border-purple-600"
                      : "border-gray-300 hover:border-purple-600"
                  }`}
                >
                  {cor}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-bold mb-2">Tamanho</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Selecione</option>
              {[35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block font-bold mb-2">Quantidade</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <button
            onClick={handleAddCart}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
