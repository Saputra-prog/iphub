'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { useLanguage } from '../../../components/LanguageContext';

interface LocationData {
  address_id?: string
  address_en?: string
  images?: string[] | string
}

export default function LokasiKami() {
  const { lang } = useLanguage()
  console.log('LANGUAGE LOCATION:', lang)

  const [data, setData] = useState<LocationData>({
    address_id: 'Jl. Cikini Raya No.9, RT.16/RW.1, Cikini, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10330',
    address_en: 'Jl. Cikini Raya No.9, RT.16/RW.1, Cikini, Menteng District, Central Jakarta, Special Capital Region of Jakarta 10330',
  })

  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

  const parseImagesArray = (rawImages: any): string[] => {
    if (Array.isArray(rawImages)) return rawImages

    if (typeof rawImages === 'string') {
      try {
        const parsed = JSON.parse(rawImages)
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return []
      }
    }

    return []
  }

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)

    return () => {
      window.removeEventListener('resize', updateItemsPerView)
    }
  }, [])

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        setLoading(true)

        const res = await axios.get(`${API_URL}/api/location`)

        if (res.data?.success && res.data?.data) {
          setData({
            address_id:
              res.data.data.address_id ||
              'Jl. Cikini Raya No.9, RT.16/RW.1, Cikini, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10330',
            address_en:
              res.data.data.address_en ||
              'Jl. Cikini Raya No.9, RT.16/RW.1, Cikini, Menteng District, Central Jakarta, Special Capital Region of Jakarta 10330',
          })

          setImages(parseImagesArray(res.data.data.images))
        }
      } catch (error) {
        console.error('Gagal mengambil data lokasi dari backend:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLocationData()
  }, [API_URL])

  useEffect(() => {
    const maxIndex = Math.max(0, images.length - itemsPerView)

    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex)
    }
  }, [itemsPerView, images.length, currentIndex])

  const address = lang === 'ID'
    ? data.address_id
    : data.address_en

  const totalImages = images.length
  const maxIndex = Math.max(0, totalImages - itemsPerView)

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return maxIndex
      return prev - 1
    })
  }

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) return 0
      return prev + 1
    })
  }

  const handleMapsClick = () => {
    window.open(
      'https://maps.app.goo.gl/rbCRANMJo2UZ8oQx6',
      '_blank'
    )
  }

  return (
    <div className="relative w-full bg-white py-12 sm:py-16 px-4 sm:px-6 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <div className="absolute -top-6 left-1 sm:left-4 md:left-12 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 pointer-events-none opacity-80">
          <Image
            src="/Hiasan1.png"
            alt="Hiasan Kiri"
            width={200}
            height={200}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="absolute -top-6 right-1 sm:right-4 md:right-12 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 pointer-events-none opacity-80">
          <Image
            src="/Hiasan1.png"
            alt="Hiasan Kanan"
            width={200}
            height={200}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto pt-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            <span className="text-amber-600">
              {lang === 'ID' ? 'Lokasi' : 'Our'}
            </span>{' '}
            <span className="text-gray-900">
              {lang === 'ID' ? 'Kami' : 'Location'}
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed px-2 sm:px-4 whitespace-pre-line">
            {address}
          </p>
        </div>

        <div className="relative px-7 sm:px-10 md:px-12">
          {totalImages > 0 && (
            <button
              onClick={handlePrev}
              aria-label={lang === 'ID' ? 'Slide Sebelumnya' : 'Previous Slide'}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-amber-200 bg-amber-50/90 hover:bg-amber-100 text-amber-700 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105"
            >
              &#10094;
            </button>
          )}

          <div className="overflow-hidden rounded-2xl w-full">
            {loading ? (
              <div className="py-12 text-center text-gray-400 text-sm">
                {lang === 'ID'
                  ? 'Memuat lokasi...'
                  : 'Loading location...'}
              </div>
            ) : totalImages === 0 ? (
              <div className="py-12 text-center text-gray-400 text-sm">
                {lang === 'ID'
                  ? 'Belum ada foto lokasi.'
                  : 'No location photos yet.'}
              </div>
            ) : (
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                }}
              >
                {images.map((imgSrc, idx) => {
                  const fullImgUrl = imgSrc.startsWith('http')
                    ? imgSrc
                    : `${API_URL}${imgSrc}`

                  return (
                    <div
                      key={idx}
                      className="shrink-0 px-2"
                      style={{
                        width: `${100 / itemsPerView}%`,
                      }}
                    >
                      <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <Image
                          src={fullImgUrl}
                          alt={`Foto Lokasi ${idx + 1}`}
                          fill
                          unoptimized
                          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
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
              aria-label={lang === 'ID' ? 'Slide Berikutnya' : 'Next Slide'}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105"
            >
              &#10095;
            </button>
          )}

          {totalImages > itemsPerView && (
            <div className="flex justify-center items-center gap-1.5 mt-5 sm:mt-6">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? 'w-6 bg-amber-600'
                      : 'w-2 bg-amber-200 hover:bg-amber-300'
                  }`}
                  aria-label={
                    lang === 'ID'
                      ? `Ke slide ${idx + 1}`
                      : `Go to slide ${idx + 1}`
                  }
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center mt-7 sm:mt-8">
          <button
            onClick={handleMapsClick}
            className="bg-zinc-800 hover:bg-zinc-900 text-white font-semibold text-xs sm:text-sm px-7 sm:px-8 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          >
            {lang === 'ID' ? 'Lihat Maps' : 'View Maps'}
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