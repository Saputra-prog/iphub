'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'

interface BeritaItem {
  id: number
  title: string
  date: string
  content: string
  image?: string
}

export default function BeritaKegiatan() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

  const [newsData, setNewsData] = useState<BeritaItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [showAll, setShowAll] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get<BeritaItem[]>(`${API_URL}/api/berita`)
      .then((res) => {
        setNewsData(res.data || [])
      })
      .catch((err) => {
        console.error('Gagal mengambil data berita:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [API_URL])

  const visibleNews = showAll ? newsData : newsData.slice(0, 3)

  return (
    <div className="bg-zinc-100/80 py-16 px-4 md:px-8 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none right-top bg-no-repeat bg-contain"
        style={{ backgroundImage: `url('/pattern.png')` }} 
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              <span className="text-amber-500">Berita &</span> <span className="text-zinc-900">Kegiatan</span>
            </h2>
            <p className="text-xs md:text-sm text-zinc-500 max-w-xl">
              Informasi terkini mengenai berita, kegiatan, dan perkembangan terbaru perusahaan kami.
            </p>
          </div>
          {newsData.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-zinc-800 hover:bg-zinc-900 text-white font-medium text-xs md:text-sm px-6 py-2.5 rounded-lg transition-all duration-300 shadow-md shrink-0 active:scale-95 cursor-pointer"
            >
              {showAll ? 'Tampilkan Sedikit' : 'Lihat Semua'}
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12 text-zinc-500 text-sm">Memuat berita...</div>
        ) : newsData.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 text-sm">Belum ada berita yang tersedia.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {visibleNews.map((item, index) => {
              const isFeatured = index === 0
              const imageUrl = item.image
                ? item.image.startsWith('http')
                  ? item.image
                  : `${API_URL}${item.image}`
                : '/I1.jpeg'

              return (
                <div
                  key={item.id}
                  className={`group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer border ${
                    isFeatured 
                      ? 'border-amber-400 bg-amber-50/40' 
                      : 'border-zinc-200/80 bg-white'
                  }`}
                >
                  <div className="relative w-full aspect-16/10 overflow-hidden bg-zinc-200">
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className={`p-5 flex flex-col flex-1 justify-between ${
                    isFeatured ? 'bg-amber-50/30' : 'bg-white'
                  }`}>
                    <div>
                      <span className="text-[11px] font-semibold text-amber-500 block mb-2">
                        {item.date}
                      </span>
                      <h3 className="font-bold text-xs md:text-sm text-zinc-900 leading-snug mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-[11px] md:text-xs text-zinc-500 leading-relaxed line-clamp-2">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}