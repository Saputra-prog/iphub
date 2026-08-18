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
    <nav className="w-full bg-[#1c1c1c] text-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          <div className="shrink-0 flex items-center">
            <Link href="/">
              <Image 
                src="/Logo3.png" 
                width={160} 
                height={50} 
                alt="IPHUB LOGO" 
                priority 
                className="w-28 sm:w-36 md:w-40 h-auto object-contain"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm lg:text-base font-semibold tracking-wide whitespace-nowrap">
            <a href="#home" className="hover:text-amber-400 transition-colors">
              Tentang kami
            </a>
            <a href="#desk" className="hover:text-amber-400 transition-colors">
              Layanan Dan Perencanaan
            </a>
            <a href="#lokasi" className="hover:text-amber-400 transition-colors">
              Lokasi
            </a>
            <a href="#berita" className="hover:text-amber-400 transition-colors">
              Berita
            </a>
            <a href="#footer" className="hover:text-amber-400 transition-colors">
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
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#1c1c1c] border-t border-zinc-800 px-6 py-4 space-y-3 text-base font-medium">
          <a href="#home" onClick={closeMenu} className="block hover:text-amber-400 py-1 transition-colors">
            Tentang kami
          </a>
          <a href="#desk" onClick={closeMenu} className="block hover:text-amber-400 py-1 transition-colors">
            Layanan Dan Perencanaan
          </a>
          <a href="#lokasi" onClick={closeMenu} className="block hover:text-amber-400 py-1 transition-colors">
            Lokasi
          </a>
          <a href="#berita" onClick={closeMenu} className="block hover:text-amber-400 py-1 transition-colors">
            Berita
          </a>
          <a href="#footer" onClick={closeMenu} className="block hover:text-amber-400 py-1 transition-colors">
            Hubungi Kami
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;