import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Bratva Outlet</h3>
            <p className="text-gray-400">Calçados premium com desconto</p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/produtos" className="hover:text-white transition">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contato@bratva.com</li>
              <li>WhatsApp: +55 11 9999-9999</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Redes</h3>
            <div className="flex gap-4">
              <a href="https://instagram.com" className="hover:text-purple-400">
                Instagram
              </a>
              <a href="https://tiktok.com" className="hover:text-purple-400">
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Bratva Outlet. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
