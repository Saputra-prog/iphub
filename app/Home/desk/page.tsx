'use client'

import React, { useState } from 'react'
import { 
  Building2, 
  Users, 
  Utensils, 
  Pill, 
  FileCheck2, 
  UserCheck, 
  Stethoscope, 
  Building, 
  BookOpenCheck, 
  Landmark, 
  Receipt, 
  Briefcase,
  ChevronDown,
  LucideIcon
} from 'lucide-react'

interface ServiceItem {
  title: string
  description: string
  icon: LucideIcon
}

const servicesData: ServiceItem[] = [
  { title: 'Kantor Virtual', description: 'Dari ruang kerja modern hingga penasihat pajak berpengalaman, temukan pakar dan fasilitas yang dirancang untuk kesuksesan bisnis Anda.', icon: Building2 },
  { title: 'Ruang Meeting', description: 'Sewa ruang rapat profesional dengan fasilitas lengkap untuk keperluan presentasi dan diskusi.', icon: Users },
  { title: 'Izin Khusus Pangan Industri Rumah Tangga (P-IRT)', description: 'Bantuan sertifikasi P-IRT agar produk makanan/minuman rumah tangga Anda siap dipasarkan.', icon: Utensils },
  { title: 'Izin Khusus Pedagang Besar Farmasi (PBF)', description: 'Pengurusan izin distribusi sediaan farmasi sesuai standar regulasi yang berlaku.', icon: Pill },
  { title: 'Pengajuan Layanan Pengadaan Secara Elektronik (LPSE)', description: 'Pendampingan pendaftaran dan verifikasi berkas untuk mengikuti tender pemerintah.', icon: FileCheck2 },
  { title: 'Perseroan Perorangan (PT Perorangan)', description: 'Pendirian PT Perorangan dengan proses cepat, praktis, dan sesuai regulasi UU Cipta Kerja.', icon: UserCheck },
  { title: 'Izin Khusus Distribusi Alat Kesehatan (IDAK)', description: 'Layanan legalitas izin penyalur alat kesehatan resmi dan terverifikasi.', icon: Stethoscope },
  { title: 'Pendirian Perusahaan', description: 'Pembuatan PT, CV, atau badan usaha lainnya lengkap dengan akta dan NIB.', icon: Building },
  { title: 'Pembukuan', description: 'Jasa pencatatan keuangan dan penyusunan laporan keuangan bulanan/tahunan.', icon: BookOpenCheck },
  { title: 'Pendirian Yayasan', description: 'Layanan legalitas pendirian yayasan untuk kegiatan sosial, keagamaan, dan kemanusiaan.', icon: Landmark },
  { title: 'Perpajakan & Penggajian', description: 'Kelola kewajiban pajak bulanan/tahunan serta sistem payroll karyawan secara profesional.', icon: Receipt },
  { title: 'Kantor Pribadi', description: 'Sewa ruang kantor fisik privat lengkap dengan fasilitas pendukung bisnis.', icon: Briefcase },
]

export default function Desk() {
  const [openIndex, setOpenIndex] = useState<number | null>(6)

  const toggleCard = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const col1 = servicesData.filter((_, i) => i % 3 === 0)
  const col2 = servicesData.filter((_, i) => i % 3 === 1)
  const col3 = servicesData.filter((_, i) => i % 3 === 2)

  const renderColumn = (colData: typeof servicesData, colOffset: number) => (
    <div className="flex flex-col gap-4">
      {colData.map((service, idx) => {
        const actualIndex = idx * 3 + colOffset
        const isOpen = openIndex === actualIndex
        const IconComponent = service.icon

        return (
          <div
            key={actualIndex}
            onClick={() => toggleCard(actualIndex)}
            className={`border rounded-2xl p-4 cursor-pointer transition-all duration-300 min-h-19 flex flex-col justify-center ${
              isOpen
                ? 'bg-amber-50/50 border-amber-300 shadow-sm'
                : 'bg-white border-gray-200 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <IconComponent className="w-5 h-5 text-amber-600 shrink-0" />
                <h3 className={`font-semibold text-sm leading-tight ${isOpen ? 'text-amber-800' : 'text-gray-800'}`}>
                  {service.title}
                </h3>
              </div>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 transition-transform duration-300 ${
                  isOpen ? 'bg-amber-200 text-amber-800 rotate-180' : 'bg-amber-100 text-amber-700'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            {isOpen && (
              <p className="mt-3 text-xs text-gray-600 leading-relaxed border-t border-amber-100 pt-3">
                {service.description}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )

  return (
    <div className="bg-white min-h-screen p-8">
      <h1 className="font-bold text-2xl flex justify-center gap-2 mb-2">
        <span className="text-yellow-600">Layanan</span>
        <span className="text-gray-600">Kami</span>
      </h1>
      <p className="text-center text-sm text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
        Dari ruang kerja modern hingga penasihat pajak berpengalaman tentukan pakar dan fasilitas yang dirancang untuk kesuksesan bisnis anda
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto items-start">
        {renderColumn(col1, 0)}
        {renderColumn(col2, 1)}
        {renderColumn(col3, 2)}
      </div>
    </div>
  )
}