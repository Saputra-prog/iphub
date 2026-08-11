import React from 'react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image
        src="/bg-1.png"
        alt="background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center md:text-left pt-16">
        <div className="text-white max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Mulai Bisnis Kamu Bersama Kami!
          </h1>
          <div className="space-y-4 text-xs md:text-sm lg:text-base text-zinc-200 leading-relaxed font-light">
            <p>
              IPHUB, Perusahaan Lokal dengan Pengalaman bertahun-tahun yang Hadir untuk Membantu Kamu Memulai Bisnis Kamu dan Mensupport Bisnis Kamu
            </p>
            <p>
              IPHUB adalah Perusahaan yang Terafiliasi dengan <strong className="font-bold text-white">REANDA BERNARDI</strong>, Kantor Akuntan Publik Terkemuka di Dunia
            </p>
            <p className="pt-2">
              Dapatkan penawaran menarik dari Kami
            </p>
          </div>
          <a href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20bertanya%20mengenai%20layanan%20IPHUB"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block mt-8 bg-amber-500 hover:bg-amber-600 text-zinc-900 font-semibold px-6 py-3 rounded-lg text-xs md:text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer text-center">
            Hubungi Kami Sekarang
          </a>
        </div>
      </div>
    </div>
  );
}