'use client';

import { FaWhatsapp } from 'react-icons/fa6';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/628118181466?text=Halo,%20saya%20ingin%20bertanya%20mengenai%20layanan%20IPHUB"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-[#1c1c1c] text-white border border-zinc-700/80 rounded-full shadow-2xl hover:bg-black hover:border-amber-500 hover:scale-110 active:scale-95 transition-all duration-300 group"
    >
      <FaWhatsapp className="w-7 h-7 text-green-500 group-hover:text-green-400 transition-colors" />
      <span className="absolute left-16 bg-[#1c1c1c] border border-zinc-700 text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
        Hubungi Kami via WhatsApp
      </span>
    </a>
  );
}