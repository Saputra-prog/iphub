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

interface ServiceItem {
  _id?: string
  id?: string | number
  title: string
  category: string
  description?: string
  icon?: string | LucideIcon
}

interface ServiceCategory {
  categoryName: string
  items: ServiceItem[]
}

const CATEGORY_LIST = [
  'General Corporate & Virtual Office',
  'Corporate Establishment',
  'Standard Business License Service',
  'Financial, Advisory & Legal Services',
  'Facilities'
]

const ICON_MAP: Record<string, LucideIcon> = {
  'Kantor Virtual': Building2,
  'Limited Liability Company (PMA)': Building,
  'Limited Liability Company (local)': UserCheck,
  'Foundation (Yayasan)': Landmark,
  'Individual Limited Liability Company': UserCheck,
  'Standard Business License Service': FileCheck2,
  'Book-keeping': BookOpenCheck,
  'Audit Service': FileSearch,
  'Tax Consulting Service': Receipt,
  'VISA & KITAS': Globe,
  'Trademark & Patent': Award,
  'Cafe & Coffee Roastery': Coffee,
  'Meeting Room': Users,
  'Private Office': Briefcase
}

export default function Desk() {
  const [openId, setOpenId] = useState<string | number | null>(null)
  const [servicesCategories, setServicesCategories] = useState<ServiceCategory[]>([])

  const API_URL = process.env.NEXT_PUBLIC_API_URL || ""

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/serviceModel`)
        if (res.data.success) {
          const rawData: ServiceItem[] = res.data.data

          const groupedCategories: ServiceCategory[] = CATEGORY_LIST.map((catName) => {
            const filteredItems = rawData.filter((item) => item.category === catName)
            return {
              categoryName: catName,
              items: filteredItems
            }
          })

          setServicesCategories(groupedCategories)
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchServices()
  }, [API_URL])

  const toggleCard = (id: string | number) => {
    setOpenId(openId === id ? null : id)
  }

  const renderCard = (service: ServiceItem) => {
    const itemId = service._id || service.id || ""
    const isOpen = openId === itemId

    let IconComponent: LucideIcon = Building2
    if (typeof service.icon === 'function' || typeof service.icon === 'object') {
      IconComponent = service.icon as LucideIcon
    } else if (typeof service.icon === 'string' && ICON_MAP[service.icon]) {
      IconComponent = ICON_MAP[service.icon]
    } else if (ICON_MAP[service.title]) {
      IconComponent = ICON_MAP[service.title]
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
          <div className="mt-3 text-xs text-gray-600 border-t border-amber-100 pt-3">
            <p className="leading-relaxed">{service.description}</p>
          </div>
        )}
      </div>
    )
  }

  const renderRow = (items: ServiceItem[]) => {
    if (items.length === 0) return null

    if (items.length === 1) {
      return (
        <div className="flex justify-center w-full">
          <div className="w-full md:w-[calc(33.333%-11px)]">
            {renderCard(items[0])}
          </div>
        </div>
      )
    }

    if (items.length === 2) {
      return (
        <div className="flex flex-col md:flex-row justify-center gap-4 w-full">
          <div className="w-full md:w-[calc(33.333%-11px)]">
            {renderCard(items[0])}
          </div>
          <div className="w-full md:w-[calc(33.333%-11px)]">
            {renderCard(items[1])}
          </div>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-start">
        {items.map(renderCard)}
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen p-8">
      <h1 className="font-bold text-2xl flex justify-center gap-2 mb-2">
        <span className="text-amber-600">Layanan</span>
        <span className="text-gray-600">Kami</span>
      </h1>
      <p className="text-center text-sm text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
        Dari ruang kerja modern hingga penasihat pajak berpengalaman, temukan pakar dan fasilitas yang dirancang untuk kesuksesan bisnis Anda.
      </p>

      <div className="relative max-w-6xl mx-auto border border-amber-200 rounded-3xl p-6 md:p-8 pt-10 bg-amber-50/20">
        <div className="absolute -top-3.5 left-6">
          <span className="px-3.5 py-1 text-xs font-semibold text-amber-700 bg-amber-100 border border-amber-300 rounded-full select-none cursor-default shadow-sm">
            Service
          </span>
        </div>

        <div className="flex flex-col gap-10">
          {servicesCategories.map((group, groupIdx) => {
            if (group.items.length === 0) return null

            const firstRowItems = group.items.slice(0, 3)
            const secondRowItems = group.items.slice(3)

            return (
              <div key={groupIdx} className="flex flex-col items-center w-full">
                <div className="mb-4">
                  <span className="px-4 py-1 text-xs font-medium text-amber-800 bg-white border border-amber-200 rounded-full shadow-xs select-none cursor-default">
                    {group.categoryName}
                  </span>
                </div>

                <div className="flex flex-col gap-4 w-full">
                  {renderRow(firstRowItems)}
                  {renderRow(secondRowItems)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}