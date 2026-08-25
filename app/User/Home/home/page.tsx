'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

interface HeroData {
  title: string;
  content: string;
  bgImage: string;
}

export default function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

  const [heroData, setHeroData] = useState<HeroData>({
    title: 'Mulai Bisnis Kamu Bersama Kami!',
    content: 'IPHUB, Perusahaan Lokal dengan Pengalaman bertahun-tahun yang Hadir untuk Membantu Kamu Memulai Bisnis Kamu dan Mensupport Bisnis Kamu',
    bgImage: '/bg-1.png',
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<HeroData>(`${API_URL}/api/hero`)
      .then((res) => {
        if (res.data) {
          setHeroData({
            title: res.data.title || 'Mulai Bisnis Kamu Bersama Kami!',
            content: res.data.content || '',
            bgImage: res.data.bgImage ? `${API_URL}${res.data.bgImage}` : '/bg-1.png',
          });
        }
      })
      .catch((err) => {
        console.error('Gagal mengambil data hero dari backend:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [API_URL]);

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <Image
        src={heroData.bgImage}
        alt="background"
        fill
        className="object-cover"
        priority
        unoptimized
      />

      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="relative z-10 w-full max-w-6xl mx-auto text-center md:text-left pt-16 md:pt-0">
        <div className="text-white max-w-3xl mx-auto md:mx-0">
          {loading ? (
            <p className="text-zinc-300">Memuat data...</p>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
                {heroData.title}
              </h1>
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base text-zinc-200 leading-relaxed font-light">
                <p className="whitespace-pre-line">
                  {heroData.content}
                </p>
              </div>

              <a
                href="https://wa.me/628118181466?text=Halo,%20saya%20ingin%20bertanya%20mengenai%20layanan%20IPHUB"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full sm:w-auto mt-6 sm:mt-8 bg-amber-500 hover:bg-amber-600 text-zinc-900 font-semibold px-6 py-3 rounded-lg text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer text-center"
              >
                Hubungi Kami Sekarang
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}