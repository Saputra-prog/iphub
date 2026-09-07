'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from './LanguageContext';

import 'flag-icons/css/flag-icons.min.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const { lang, setLang, t } = useLanguage();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const selectLanguage = (language: 'ID' | 'EN') => {
    setLang(language);
    setLanguageOpen(false);
  };

  return (
    <nav className="w-full bg-[#1c1c1c] text-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">

          {/* ================= LOGO ================= */}
          <div className="shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="/Logo3.png"
                width={250}
                height={140}
                alt="IPHUB LOGO"
                priority
                className="w-28 sm:w-36 md:w-40 h-auto object-contain"
              />
            </Link>
          </div>

          {/* ================= MENU DESKTOP ================= */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm lg:text-base font-semibold tracking-wide whitespace-nowrap">

            <a
              href="#home"
              className="hover:text-amber-400 transition-colors"
            >
              {t('Tentang kami', 'About Us')}
            </a>

            <a
              href="#desk"
              className="hover:text-amber-400 transition-colors"
            >
              {t(
                'Layanan Dan Perencanaan',
                'Services & Planning'
              )}
            </a>

            <a
              href="#lokasi"
              className="hover:text-amber-400 transition-colors"
            >
              {t('Lokasi', 'Location')}
            </a>

            <a
              href="#berita"
              className="hover:text-amber-400 transition-colors"
            >
              {t('Berita', 'News')}
            </a>

            <a
              href="#footer"
              className="hover:text-amber-400 transition-colors"
            >
              {t('Hubungi Kami', 'Contact Us')}
            </a>

          </div>

          {/* ================= BAGIAN KANAN ================= */}
          <div className="flex items-center gap-3">

            {/* ================= LANGUAGE DROPDOWN ================= */}
            <div className="relative">

              {/* Tombol Bahasa */}
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                type="button"
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-2 rounded-full border border-zinc-700 transition-all cursor-pointer"
                aria-label="Select Language"
              >

                {/* Bendera Aktif */}
                <span
                  className={`fi ${
                    lang === 'ID' ? 'fi-id' : 'fi-gb'
                  }`}
                  style={{
                    width: '22px',
                    height: '16px',
                    display: 'inline-block',
                  }}
                />

                {/* Panah */}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    languageOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>

              </button>

              {/* ================= DROPDOWN ================= */}
              {languageOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-[#1c1c1c] border border-zinc-700 rounded-xl shadow-xl overflow-hidden z-100">

                  {/* Indonesia */}
                  <button
                    type="button"
                    onClick={() => selectLanguage('ID')}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-zinc-800 transition-colors"
                  >

                    <span className="flex items-center gap-3">

                      <span
                        className="fi fi-id"
                        style={{
                          width: '24px',
                          height: '18px',
                          display: 'inline-block',
                        }}
                      />

                      <span>
                        Indonesia
                      </span>

                    </span>

                    {lang === 'ID' && (
                      <span className="text-amber-400 font-bold">
                        ✓
                      </span>
                    )}

                  </button>

                  {/* English */}
                  <button
                    type="button"
                    onClick={() => selectLanguage('EN')}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-zinc-800 transition-colors"
                  >

                    <span className="flex items-center gap-3">

                      <span
                        className="fi fi-gb"
                        style={{
                          width: '24px',
                          height: '18px',
                          display: 'inline-block',
                        }}
                      />

                      <span>
                        English
                      </span>

                    </span>

                    {lang === 'EN' && (
                      <span className="text-amber-400 font-bold">
                        ✓
                      </span>
                    )}

                  </button>

                </div>
              )}

            </div>

            {/* ================= MOBILE MENU BUTTON ================= */}
            <div className="flex md:hidden">

              <button
                onClick={toggleMenu}
                type="button"
                className="text-white hover:text-gray-300 focus:outline-none p-2"
                aria-label="Toggle Menu"
              >

                {isOpen ? (
                  /* X Icon */
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  /* Hamburger Icon */
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}

              </button>

            </div>

          </div>

        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isOpen && (
        <div className="md:hidden bg-[#1c1c1c] border-t border-zinc-800 px-6 py-4 space-y-3 text-base font-medium">

          <a
            href="#home"
            onClick={closeMenu}
            className="block hover:text-amber-400 py-1 transition-colors"
          >
            {t('Tentang kami', 'About Us')}
          </a>

          <a
            href="#desk"
            onClick={closeMenu}
            className="block hover:text-amber-400 py-1 transition-colors"
          >
            {t(
              'Layanan Dan Perencanaan',
              'Services & Planning'
            )}
          </a>

          <a
            href="#lokasi"
            onClick={closeMenu}
            className="block hover:text-amber-400 py-1 transition-colors"
          >
            {t('Lokasi', 'Location')}
          </a>

          <a
            href="#berita"
            onClick={closeMenu}
            className="block hover:text-amber-400 py-1 transition-colors"
          >
            {t('Berita', 'News')}
          </a>

          <a
            href="#footer"
            onClick={closeMenu}
            className="block hover:text-amber-400 py-1 transition-colors"
          >
            {t('Hubungi Kami', 'Contact Us')}
          </a>

        </div>
      )}

    </nav>
  );
}

export default Navbar;