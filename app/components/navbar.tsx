'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image 
                src="/Logo3.png" 
                width={140} 
                height={140} 
                alt="LOGO" 
                priority 
                className="w-28 sm:w-36 md:w-44 h-auto"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6 text-white text-sm font-medium whitespace-nowrap">
            <a href="#home" className="hover:opacity-80 transition-opacity">
              Tentang kami
            </a>
            <a href="#desk" className="hover:opacity-80 transition-opacity">
              Layanan Dan Perencanaan
            </a>
            <a href="#lokasi" className="hover:opacity-80 transition-opacity">
              Lokasi
            </a>
            <a href="#berita" className="hover:opacity-80 transition-opacity">
              Berita
            </a>
            <a href="#footer" className="hover:opacity-80 transition-opacity">
              Hubungi Kami
            </a>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-white hover:text-gray-300 focus:outline-none p-2"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-md px-4 pt-2 pb-6 space-y-3 text-white text-sm font-medium border-b border-white/10">
          <a href="#home" onClick={closeMenu} className="block hover:opacity-80 py-1 transition-opacity">
            Tentang kami
          </a>
          <a href="#desk" onClick={closeMenu} className="block hover:opacity-80 py-1 transition-opacity">
            Layanan Dan Perencanaan
          </a>
          <a href="#lokasi" onClick={closeMenu} className="block hover:opacity-80 py-1 transition-opacity">
            Lokasi
          </a>
          <a href="#berita" onClick={closeMenu} className="block hover:opacity-80 py-1 transition-opacity">
            Berita
          </a>
          <a href="#footer" onClick={closeMenu} className="block hover:opacity-80 py-1 transition-opacity">
            Hubungi Kami
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;