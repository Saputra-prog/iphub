"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface BannerItem {
  id: number | string;
  title?: string;
  judul?: string;
  description?: string;
  deskripsi?: string;
  image: string;
}

export default function PromoBanner() {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [current, setCurrent] = useState(0);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/promo-banners`);
        if (res.data?.success && res.data.data.length > 0) {
          setBanners(res.data.data);
        }
      } catch (err) {
        console.error("Gagal mengambil data promo banner:", err);
      }
    };

    if (API_URL) {
      fetchBanners();
    }
  }, [API_URL]);

  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return "/bg-1.png";
    if (imagePath.startsWith("http")) return imagePath;

    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    return `${API_URL}${cleanPath}`;
  };

  const handlePrevious = () => {
    if (banners.length === 0) return;
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    if (banners.length === 0) return;
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length, current]);

  if (banners.length === 0) {
    return null;
  }

  const activeBanner = banners[current];
  const bannerTitle = activeBanner.title || activeBanner.judul || "";
  const bannerDesc = activeBanner.description || activeBanner.deskripsi || "";

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-12 py-6 relative">
      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl group">
        
        <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-80 sm:min-h-96">
          <div className="p-6 sm:p-10 md:p-12 flex flex-col justify-center order-2 md:order-1 z-10">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-[#e88900] uppercase bg-[#e88900]/10 border border-[#e88900]/30 rounded-full w-fit">
              Promo Spesial
            </span>
            
            {bannerTitle && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {bannerTitle}
              </h2>
            )}

            {bannerDesc && (
              <p className="mt-3 text-sm sm:text-base text-gray-300 line-clamp-3 leading-relaxed">
                {bannerDesc}
              </p>
            )}
          </div>

          {/* Kolom Kanan: Gambar Promo */}
          <div className="relative h-56 sm:h-72 md:h-full w-full overflow-hidden order-1 md:order-2 bg-gray-950">
            <img
              key={activeBanner.id}
              src={getImageUrl(activeBanner.image)}
              alt={bannerTitle || "Promo Banner"}
              className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out"
            />
            {/* Overlay Gradient Halus */}
            <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-gray-900 via-transparent to-transparent opacity-90 md:opacity-100 pointer-events-none" />
          </div>

        </div>

        {/* Dots Indicator (Bawah Tengah) */}
        {banners.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={
                  current === index
                    ? "h-2 w-7 rounded-full bg-[#e88900] transition-all duration-300"
                    : "h-2 w-2 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300"
                }
              />
            ))}
          </div>
        )}

      </div>

     {/* Tombol Navigasi Oranye di Luar Banner (Kanan & Kiri) */}
{banners.length > 1 && (
  <>
    <button
      type="button"
      onClick={handlePrevious}
      aria-label="Banner sebelumnya"
      className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-30 grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-[#e88900] text-white shadow-lg transition-all duration-300 hover:bg-[#d07a00] hover:scale-110 active:scale-95"
    >
      ‹
    </button>

    <button
      type="button"
      onClick={handleNext}
      aria-label="Banner selanjutnya"
      className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-30 grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-[#e88900] text-white shadow-lg transition-all duration-300 hover:bg-[#d07a00] hover:scale-110 active:scale-95"
    >
      ›
    </button>
  </>
      )}
    </section>
  );
}