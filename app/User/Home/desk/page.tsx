'use client'

import React, { useState } from 'react'
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

interface LicenseOption {
  optionLabel: string
  description: string
}

interface ServiceItem {
  id: number
  title: string
  description?: string
  options?: LicenseOption[]
  icon: LucideIcon
}

interface ServiceCategory {
  categoryName: string
  items: ServiceItem[]
}

const servicesCategories: ServiceCategory[] = [
  {
    categoryName: 'General Corporate & Virtual Office',
    items: [
      { 
        id: 1, 
        title: 'Kantor Virtual', 
        description: "Elevate your business to the pinnacle of corporate sophistication with an iconic Jakarta's Golden Triangle location that commands immediate respect, offering a prestigious professional address, seamless call handling, and full administrative support to ensure your enterprise operates flawlessly at the highest level.", 
        icon: Building2 
      },
    ]
  },
  {
    categoryName: 'Corporate Establishment',
    items: [
      { 
        id: 2, 
        title: 'Limited Liability Company (PMA)', 
        description: 'Seamlessly navigate the complexities of local regulations and launch your enterprise with a fully compliant, market-ready corporate structure tailored for global growth.', 
        icon: Building 
      },
      { 
        id: 3, 
        title: 'Limited Liability Company (local)', 
        description: 'Transition from a small business to a powerful legal entity with a flawless limited liability company establishment service that secures your notary deed, Ministry of Law and Human Rights (AHU) approval, and complete licensing with absolute precision and zero operational downtime.', 
        icon: UserCheck 
      },
      { 
        id: 4, 
        title: 'Foundation (Yayasan)', 
        description: 'Establish your Foundation with complete confidence through our comprehensive legal services, securing seamless Ministry approval, compliant operational permits, and a bulletproof organizational structure tailored for lasting social impact.', 
        icon: Landmark 
      },
      { 
        id: 5, 
        title: 'Individual Limited Liability Company', 
        description: 'Establish your Individual Limited Liability Company seamlessly with our expert legal guidance, allowing you to secure single-founder corporate liability, official Ministry approval, and professional business licensing without the requirement of minimum capital or partners.', 
        icon: UserCheck 
      },
    ]
  },
  {
    categoryName: 'Standard Business License Service',
    items: [
      { 
        id: 6, 
        title: 'Standard Business License Service', 
        icon: FileCheck2,
        options: [
          {
            optionLabel: '',
            description: 'From high-risk sector approvals to specialized ministry permits, our premium licensing service handles your specific corporate compliance architecture while you focus entirely on market domination.'
          }  
        ]
      },
    ]
  },
  {
    categoryName: 'Financial, Advisory & Legal Services',
    items: [
      { 
        id: 7, 
        title: 'Book-keeping', 
        description: 'Entrust your financial architecture to Reanda Bernardi, our sister firm, a premium corporate advisory powerhouse that delivers flawless bookkeeping, immaculate financial ledger maintenance, and uncompromising regulatory compliance to support your high-stakes executive decisions.', 
        icon: BookOpenCheck 
      },
      { 
        id: 8, 
        title: 'Audit Service', 
        description: 'Leveraging over 50 years of domestic excellence and the cross-border strength of a top-tier global network, Reanda Bernardi (our sister firm) delivers institutional-grade audit and assurance services that satisfy stringent regulatory compliance while revealing deep, realistic business insights to foster multi-generational enterprise sustainability.', 
        icon: FileSearch 
      },
      { 
        id: 9, 
        title: 'Tax Consulting Service', 
        description: 'Reanda Bernardi delivers elite tax consulting services that provide absolute assurance on your tax compliance, meticulously insulating your enterprise from fiscal exposure while strategically aligning your operations with the latest regulatory frameworks.', 
        icon: Receipt 
      },
      { 
        id: 10, 
        title: 'VISA & KITAS', 
        description: 'Transition your international executives and specialized talent into Indonesia effortlessly with a premium immigration service that manages your corporate visas and KITAS processing with strict regulatory precision and boardroom-level transparency.', 
        icon: Globe 
      },
      { 
        id: 11, 
        title: 'Trademark & Patent', 
        description: "Deliver elite intellectual property management services that safeguard your enterprise's proprietary innovations, strategically securing your trademark and patent registrations to provide absolute legal protection and commercial exclusivity in domestic markets.", 
        icon: Award 
      },
    ]
  },
  {
    categoryName: 'Facilities',
    items: [
      { 
        id: 12, 
        title: 'Cafe & Coffee Roastery', 
        description: 'Workroom Coffee is built different—bringing you lightning-fast Wi-Fi, premium house-roasted beans, and an electric atmosphere designed to take you from a high-stakes team meeting to creative deep work, right into a fully relaxed afternoon lounge session.', 
        icon: Coffee 
      },
      { 
        id: 13, 
        title: 'Meeting Room', 
        description: 'Elevate your presentations and client pitches in our three stunning, fully equipped meeting rooms, offering an expansive 14-pax boardroom for major corporate strategy sessions and two intimate 8-pax spaces optimized for fluid team collaboration.', 
        icon: Users 
      },
      { 
        id: 14, 
        title: 'Private Office', 
        description: 'Find your ideal workspace home within a corporate ecosystem designed for comfort, featuring flexible office sizing to scale your business seamlessly and a premium first-floor cafe that serves as the ultimate backdrop for casual meetings and afternoon relaxation.', 
        icon: Briefcase 
      },
    ]
  }
]

export default function Desk() {
  const [openId, setOpenId] = useState<number | null>(1)

  const toggleCard = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  const renderCard = (service: ServiceItem) => {
    const isOpen = openId === service.id
    const IconComponent = service.icon

    return (
      <div
        key={service.id}
        onClick={() => toggleCard(service.id)}
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
            {service.options ? (
              <div className="flex flex-col gap-3">
                {service.options.map((opt, idx) => (
                  <div key={idx} className="bg-white/80 p-3 rounded-xl border border-amber-200/60">
                    <span className="font-semibold text-amber-800 block mb-1">
                      {opt.optionLabel}
                    </span>
                    <p className="leading-relaxed">{opt.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="leading-relaxed">{service.description}</p>
            )}
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
        <div className="flex justify-center gap-4 w-full">
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
            service
          </span>
        </div>

        <div className="flex flex-col gap-10">
          {servicesCategories.map((group, groupIdx) => {
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