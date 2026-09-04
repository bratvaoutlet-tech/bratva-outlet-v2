'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";

export function Header() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { items } = useCart();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-600">
          Bratva
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link
            href="/produtos"
            className={`${isActive("/produtos") ? "text-purple-600 font-bold" : "text-gray-600"} hover:text-purple-600 transition`}
          >
            Produtos
          </Link>
          <Link
            href="/carrinho"
            className={`${isActive("/carrinho") ? "text-purple-600 font-bold" : "text-gray-600"} hover:text-purple-600 transition relative`}
          >
            Carrinho
            {items.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
        </nav>

        <div className="flex gap-4">
          {user ? (
            <>
              <Link href="/admin" className="text-gray-600 hover:text-purple-600">
                Admin
              </Link>
              <button
                onClick={() => signOut()}
                className="text-gray-600 hover:text-red-600"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-gray-600 hover:text-purple-600">
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Cadastro
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
