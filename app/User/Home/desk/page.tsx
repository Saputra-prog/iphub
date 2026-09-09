'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Building2,
  Building,
  UserCheck,
  Landmark,
  FileCheck2,
  BookOpenCheck,
  FileSearch,
  Receipt,
  Globe,
  Award,
  Coffee,
  Users,
  Briefcase,
  ChevronDown,
  LucideIcon
} from 'lucide-react'
import { useLanguage } from '../../../components/LanguageContext'

interface ServiceItem {
  _id?: string
  id?: string | number
  title_id: string
  title_en: string
  category_id: string
  category_en: string
  description_id?: string
  description_en?: string
  icon?: string | LucideIcon
}

interface ServiceCategory {
  categoryName: string
  items: ServiceItem[]
}

const CATEGORY_LIST = [
  {
    id: 'Kantor Virtual',
    en: 'Virtual Office'
  },
  {
    id: 'Pendirian Perusahaan',
    en: 'Corporate Establishment'
  },
  {
    id: 'Layanan Perizinan Usaha Standar',
    en: 'Standard Business License Service'
  },
  {
    id: 'Layanan Keuangan, Konsultasi & Hukum',
    en: 'Financial, Advisory & Legal Services'
  },
  {
    id: 'Fasilitas',
    en: 'Facilities'
  }
]

const ICON_MAP: Record<string, LucideIcon> = {
  'Kantor Virtual': Building2,
  'Virtual Office': Building2,
  'Perseroan Terbatas (PMA)': Building,
  'Limited Liability Company (PMA)': Building,
  'Perseroan Terbatas (Lokal)': UserCheck,
  'Limited Liability Company (local)': UserCheck,
  'Yayasan': Landmark,
  'Foundation (Yayasan)': Landmark,
  'Foundation': Landmark,
  'Perusahaan Perorangan': UserCheck,
  'Individual Limited Liability Company': UserCheck,
  'Pendirian Perusahaan': Building,
  'Corporate Establishment': Building,
  'Layanan Perizinan Usaha Standar': FileCheck2,
  'Standard Business License Service': FileCheck2,
  'Pembukuan': BookOpenCheck,
  'Book-keeping': BookOpenCheck,
  'Bookkeeping': BookOpenCheck,
  'Layanan Audit': FileSearch,
  'Audit Service': FileSearch,
  'Konsultasi Pajak': Receipt,
  'Tax Consulting Service': Receipt,
  'VISA & KITAS': Globe,
  'Merek & Paten': Award,
  'Trademark & Patent': Award,
  'Kafe & Coffee Roastery': Coffee,
  'Cafe & Coffee Roastery': Coffee,
  'Ruang Meeting': Users,
  'Meeting Room': Users,
  'Private Office': Briefcase
}

export default function Desk() {
  const { lang, t } = useLanguage()
  const [openId, setOpenId] = useState<string | number | null>(null)
  const [servicesCategories, setServicesCategories] = useState<ServiceCategory[]>([])
  const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/serviceModel`)

        if (res.data?.success) {
          const rawData: ServiceItem[] = Array.isArray(res.data.data)
            ? res.data.data
            : []

          const groupedCategories: ServiceCategory[] = []

          CATEGORY_LIST.forEach((category) => {
            const filteredItems = rawData.filter(
              (item) =>
                item.category_id === category.id ||
                item.category_en === category.en
            )

            if (filteredItems.length > 0) {
              groupedCategories.push({
                categoryName: lang === 'ID' ? category.id : category.en,
                items: filteredItems
              })
            }
          })

          const remainingItems = rawData.filter(
            (item) =>
              !CATEGORY_LIST.some(
                (category) =>
                  item.category_id === category.id ||
                  item.category_en === category.en
              )
          )

          if (remainingItems.length > 0) {
            const remainingGroups = new Map<string, ServiceItem[]>()

            remainingItems.forEach((item) => {
              const category =
                lang === 'ID'
                  ? item.category_id || item.category_en || 'Lainnya'
                  : item.category_en || item.category_id || 'Others'

              if (!remainingGroups.has(category)) {
                remainingGroups.set(category, [])
              }

              remainingGroups.get(category)!.push(item)
            })

            remainingGroups.forEach((items, categoryName) => {
              groupedCategories.push({
                categoryName,
                items
              })
            })
          }

          setServicesCategories(groupedCategories)
        } else {
          setServicesCategories([])
        }
      } catch (err) {
        console.error('Error GET Services:', err)
        setServicesCategories([])
      }
    }

    fetchServices()
  }, [API_URL, lang])

  const toggleCard = (id: string | number) => {
    setOpenId((current) => (current === id ? null : id))
  }

  const renderCard = (service: ServiceItem) => {
    const itemId = service._id || service.id || ''
    const isOpen = openId === itemId

    const title =
      lang === 'ID'
        ? service.title_id || service.title_en
        : service.title_en || service.title_id

    const description =
      lang === 'ID'
        ? service.description_id || service.description_en
        : service.description_en || service.description_id

    let IconComponent: LucideIcon = Building2

    if (typeof service.icon === 'function') {
      IconComponent = service.icon as LucideIcon
    } else if (
      typeof service.icon === 'string' &&
      ICON_MAP[service.icon]
    ) {
      IconComponent = ICON_MAP[service.icon]
    } else if (ICON_MAP[service.title_id]) {
      IconComponent = ICON_MAP[service.title_id]
    } else if (ICON_MAP[service.title_en]) {
      IconComponent = ICON_MAP[service.title_en]
    } else if (ICON_MAP[service.category_id]) {
      IconComponent = ICON_MAP[service.category_id]
    } else if (ICON_MAP[service.category_en]) {
      IconComponent = ICON_MAP[service.category_en]
    }

    return (
      <div
        key={itemId}
        onClick={() => toggleCard(itemId)}
        className={`border rounded-2xl p-4 cursor-pointer transition-all duration-300 min-h-19 flex flex-col justify-center w-full ${
          isOpen
            ? 'bg-amber-50/80 border-amber-300 shadow-sm'
            : 'bg-white border-gray-200 hover:border-amber-300'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <IconComponent className="w-5 h-5 text-amber-600 shrink-0" />

            <h3
              className={`font-semibold text-sm leading-tight ${
                isOpen ? 'text-amber-800' : 'text-gray-800'
              }`}
            >
              {title}
            </h3>
          </div>

          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 transition-transform duration-300 ${
              isOpen
                ? 'bg-amber-200 text-amber-800 rotate-180'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {isOpen && (
          <div className="mt-3 text-xs text-gray-600 border-t border-amber-100 pt-3">
            <p className="leading-relaxed">
              {description}
            </p>
          </div>
        )}
      </div>
    )
  }

  const renderRow = (items: ServiceItem[]) => {
    if (items.length === 0) return null

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-start">
        {items.map((item) => renderCard(item))}
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen p-8">
      <h1 className="font-bold text-2xl flex justify-center gap-2 mb-2">
        <span className="text-amber-600">
          {t('Layanan', 'Our')}
        </span>

        <span className="text-gray-600">
          {t('Kami', 'Services')}
        </span>
      </h1>

      <p className="text-center text-sm text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
        {t(
          'Dari ruang kerja modern hingga penasihat pajak berpengalaman, temukan pakar dan fasilitas yang dirancang untuk kesuksesan bisnis Anda.',
          'From modern workspaces to experienced tax advisors, discover experts and facilities designed to support your business success.'
        )}
      </p>

      <div className="relative max-w-6xl mx-auto border border-amber-200 rounded-3xl p-6 md:p-8 pt-10 bg-amber-50/20">
        <div className="absolute -top-3.5 left-6">
          <span className="px-3.5 py-1 text-xs font-semibold text-amber-700 bg-amber-100 border border-amber-300 rounded-full select-none cursor-default shadow-sm">
            {t('Layanan', 'Services')}
          </span>
        </div>

        <div className="flex flex-col gap-10">
          {servicesCategories.map((group) => (
            <div
              key={group.categoryName}
              className="flex flex-col items-center w-full"
            >
              <div className="mb-4">
                <span className="px-4 py-1 text-xs font-medium text-amber-800 bg-white border border-amber-200 rounded-full shadow-xs select-none cursor-default">
                  {group.categoryName}
                </span>
              </div>

              <div className="flex flex-col gap-4 w-full">
                {renderRow(group.items)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}