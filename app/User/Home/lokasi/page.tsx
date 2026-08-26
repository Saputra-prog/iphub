'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'

export default function LokasiKami() {
  const [address, setAddress] = useState<string>(
    'Jl. Cikini Raya No.9, RT.16/RW.1, Cikini, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10330'
  )
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || ''
  const parseImagesArray = (rawImages: any): string[] => {
    if (Array.isArray(rawImages)) return rawImages
    if (typeof rawImages === 'string') {
      try {
        const parsed = JSON.parse(rawImages)
        return Array.isArray(parsed) ? parsed : []
      } catch (e) {
        return []
      }
    }
    return []
  }

  // Fetch Data dari API Backend
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/location`)
        if (res.data?.success && res.data?.data) {
          if (res.data.data.address) {
            setAddress(res.data.data.address)
          }
          const safeImages = parseImagesArray(res.data.data.images)
          setImages(safeImages)
        }
      } catch (error) {
        console.error('Gagal mengambil data lokasi dari backend:', error)
      } finally {
        setLoading(false);
      }
    }

    fetchLocationData()
  }, [API_URL])

  // Hitung jumlah maksimal slide berdasarkan total gambar
  const totalImages = images.length
  const maxIndex = Math.max(0, totalImages - 3)

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

        {/* Header Alamat Dinamis */}
        <div className="text-center mb-10 max-w-2xl mx-auto pt-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            <span className="text-amber-600">Lokasi</span> <span className="text-gray-900">Kami</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed px-4 whitespace-pre-line">
            {address}
          </p>
        </div>

        {/* Carousel Slider */}
        <div className="relative px-8 md:px-12">
          {totalImages > 0 && (
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full border border-amber-200 bg-amber-50/80 hover:bg-amber-100 text-amber-700 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105"
            >
              &#10094;
            </button>
          )}
          
          <div className="overflow-hidden rounded-2xl">
            {loading ? (
              <div className="py-12 text-center text-gray-400">Memuat lokasi...</div>
            ) : totalImages === 0 ? (
              <div className="py-12 text-center text-gray-400">Belum ada foto lokasi.</div>
            ) : (
              <div
                className="flex transition-transform duration-500 ease-out gap-4"
                style={{ transform: `translateX(-${currentIndex * (100 / Math.min(3, totalImages))}%)` }}
              >
                {images.map((imgSrc, idx) => {
                  const fullImgUrl = imgSrc.startsWith('http') ? imgSrc : `${API_URL}${imgSrc}`
                  return (
                    <div
                      key={idx}
                      className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] shrink-0"
                    >  
                      <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <Image
                          src={fullImgUrl}
                          alt={`Foto Lokasi ${idx + 1}`}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {totalImages > 0 && (
            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105"
            >
              &#10095;
            </button>
          )}

          {/* Indicators Dot Slider */}
          {totalImages > 0 && maxIndex > 0 && (
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
          )}
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