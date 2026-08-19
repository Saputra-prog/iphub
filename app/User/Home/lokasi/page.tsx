'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const locationImages = [
  {
    id: 1,
    src: '/I1.jpeg',
    alt: 'Ruang kerja utama'
  },
  {
    id: 2,
    src: '/I2.jpeg',
    alt: 'Area lorong dan meja individual'
  },
  {
    id: 3,
    src: '/I3.jpeg',
    alt: 'Ruang santai & diskusi'
  },
  {
    id: 4,
    src: '/I4.jpeg',
    alt: 'Area kafe & meeting'
  },
  {
    id: 5,
    src: '/I5.jpeg',
    alt: 'Ruang Taman'
  },
  {
    id: 6,
    src: '/I6.jpeg',
    alt: 'Ruang Rapat'
  }
]

export default function LokasiKami() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const maxIndex = Math.max(0, locationImages.length - 3)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
  }

  const handleMapsClick = () => {
    window.open(`https://maps.app.goo.gl/rbCRANMJo2UZ8oQx6`, '_blank')
  }

  return (
    <div className="relative w-full bg-white py-16 px-4 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <div className="absolute -top-6 left-2 md:left-12 w-12 h-12 md:w-16 md:h-16 pointer-events-none opacity-80">
          <Image 
            src="/Hiasan1.png"
            alt="Hiasan Kiri"
            width={200}
            height={200}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute -top-6 right-2 md:right-12 w-12 h-12 md:w-16 md:h-16 pointer-events-none opacity-80">
          <Image 
            src="/Hiasan1.png"
            alt="Hiasan Kanan"
            width={200}
            height={200}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="text-center mb-10 max-w-2xl mx-auto pt-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            <span className="text-amber-600">Lokasi</span> <span className="text-gray-900">Kami</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed px-4">
            Jl. Cikini Raya No.9, RT.16/RW.1, Cikini, Kec. Menteng, Kota Jakarta Pusat,<br className="hidden sm:inline" />
            Daerah Khusus Ibukota Jakarta 10330
          </p>
        </div>

        <div className="relative px-8 md:px-12">
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full border border-amber-200 bg-amber-50/80 hover:bg-amber-100 text-amber-700 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105"
          >
            &#10094;
          </button>
          
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out gap-4"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {locationImages.map((img) => (
                <div
                  key={img.id}
                  className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] shrink-0"
                >  
                  <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105"
          >
            &#10095;
          </button>

          <div className="flex justify-center items-center gap-1.5 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-6 bg-amber-600' : 'w-2 bg-amber-200 hover:bg-amber-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleMapsClick}
            className="bg-zinc-800 hover:bg-zinc-900 text-white font-semibold text-xs md:text-sm px-8 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          >
            Lihat Maps
          </button>
        </div>
      </div>

      <style jsx global>{`
        div {
          user-select: none;
        }
      `}</style>
    </div>
  )
}