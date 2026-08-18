'use client';

import { FaWhatsapp } from 'react-icons/fa6';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/628118181466?text=Halo,%20saya%20ingin%20bertanya%20mengenai%20layanan%20IPHUB"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-12 h-12 bg-[#121212] text-[#f59e0b] border border-[#f59e0b]/40 rounded-xl shadow-2xl hover:bg-[#1f1f1f] hover:border-[#f59e0b] hover:scale-105 active:scale-95 transition-all duration-300 group"
    >
      <FaWhatsapp className="w-6 h-6 text-[#f59e0b] group-hover:text-amber-400 transition-colors" />
      <span className="absolute left-16 bg-[#1c1c1c] border border-zinc-700 text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
        Hubungi Kami via WhatsApp
      </span>
    </a>
  );
}