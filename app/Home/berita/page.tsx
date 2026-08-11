'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const newsData = [
  {
    id: 1,
    title: 'Workspace in a Coffeeshop: A Flexible and Productive Way of Working',
    date: '10 SEP 2025',
    description: 'Bekerja dari coffeeshop kini menjadi pilihan banyak profesional, freelancer, dan pelaku startup. Suasana...',
    image: '/I1.jpeg'
  },
  {
    id: 2,
    title: 'WHY - Start-Up Company Needs Virtual Office?',
    date: '10 SEP 2025',
    description: 'Di tahap awal pengembangan bisnis, startup dituntut untuk bergerak cepat, efisien, dan profesio...',
    image: '/I2.jpeg'
  },
  {
    id: 3,
    title: 'Understanding Business Forms in Indonesia: Choosing the Right Legal Entity...',
    date: '10 SEP 2025',
    description: 'Berbagai bentuk badan usaha yang tersedia di Indonesia, seperti usaha perseorangan, CV, PT, PT...',
    image: '/I3.jpeg'
  },
  {
    id: 4,
    title: 'Tips Memilih Lokasi Virtual Office yang Strategis di Jakarta',
    date: '15 OKT 2025',
    description: 'Lokasi bisnis yang representatif meningkatkan kepercayaan klien dan mempermudah pengurusan...',
    image: '/I4.jpeg'
  },
  {
    id: 5,
    title: 'Pentingnya NIB bagi Usaha Mikro dan Kecil di Era Digital',
    date: '20 OKT 2025',
    description: 'Nomor Induk Berusaha (NIB) menjadi identitas penting untuk kemudahan izin operasional serta...',
    image: '/I5.jpeg'
  },
  {
    id: 6,
    title: 'Manfaat Private Office untuk Produktivitas Tim Startup',
    date: '02 NOV 2025',
    description: 'Privasi dan kenyamanan ruang kerja khusus membantu menjaga kerahasiaan data serta fokus...',
    image: '/I6.jpeg'
  },
  {
    id: 7,
    title: 'Panduan Lengkap Pengurusan Izin P-IRT untuk Produk Makanan',
    date: '12 NOV 2025',
    description: 'Langkah demi langkah mendapatkan sertifikasi P-IRT agar produk UMKM olahan Anda siap masuk...',
    image: '/I1.jpeg'
  },
  {
    id: 8,
    title: 'Perbedaan Utama PT Biasa dan PT Perorangan UU Cipta Kerja',
    date: '01 DES 2025',
    description: 'Pahami syarat pendirian, permodalan, dan struktur organ perseroan sebelum menentukan jenis...',
    image: '/I2.jpeg'
  },
  {
    id: 9,
    title: 'Strategi Kelola Pajak & Pembukuan Efektif untuk Bisnis Baru',
    date: '15 DES 2025',
    description: 'Hindari sanksi administrasi dengan pencatatan keuangan dan pelaporan SPT bulanan yang rapi...',
    image: '/I3.jpeg'
  }
]

export default function BeritaKegiatan() {
  const [showAll, setShowAll] = useState(false)
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
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-zinc-800 hover:bg-zinc-900 text-white font-medium text-xs md:text-sm px-6 py-2.5 rounded-lg transition-all duration-300 shadow-md shrink-0 active:scale-95 cursor-pointer"
          >
            {showAll ? 'Tampilkan Sedikit' : 'Lihat Semua'}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {visibleNews.map((item, index) => {
            const isFeatured = index === 0

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
                    src={item.image}
                    alt={item.title}
                    fill
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
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}