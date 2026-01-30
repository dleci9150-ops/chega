import React, { useState } from 'react';
import Link from 'next/link';
import ThemeSwitcher from '../UI/ThemeSwitcher'

export default function Header(){
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-md">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <Link href="/">
            <span className="text-2xl font-bold">Leidy Cleaner</span>
          </Link>
          <div className="text-sm text-muted hidden md:block">+55 51 98030-3740</div>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/servicos" className="hover:text-blue-600">Serviços</Link>
          <Link href="/agendar" className="hover:text-blue-600">Agendar</Link>
          <Link href="/dashboard" className="hover:text-blue-600">Minha Conta</Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <Link href="/agendar" className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Agendar
          </Link>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t">
          <Link href="/" className="block py-2 px-4">Home</Link>
          <Link href="/servicos" className="block py-2 px-4">Serviços</Link>
          <Link href="/agendar" className="block py-2 px-4">Agendar</Link>
          <Link href="/dashboard" className="block py-2 px-4">Minha Conta</Link>
        </div>
      )}
    </header>
  )
}
