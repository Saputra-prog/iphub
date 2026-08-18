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
  // sevices (ini tolong dibikin kaya video yang akukirim di WA)
  { title: 'Kantor Virtual', description: "Elevate your business to the pinnacle of corporate sophistication with an iconic Jakarta's Golden Triangle location that commands immediate respect, offering a prestigious professional address, seamless call handling, and full administrative support to ensure your enterprise operates flawlessly at the highest level.", icon: Building2 },

  // Corporate Establishment (isinya 4 statement di bawah)
    // { title: 'Limited Liability Company (PMA)', description: "Seamlessly navigate the complexities of local regulations and launch your enterprise with a fully compliant, market-ready corporate structure tailored for global growth.", icon: Users },
    // { title: 'Limited Liability Company (local)', description: "Transition from a small business to a powerful legal entity with a flawless limited liability company establishment service that secures your notary deed, Ministry of Law and Human Rights (AHU) approval, and complete licensing with absolute precision and zero operational downtime.", icon: Utensils },
    // { title: 'Foundation (Yayasan)', description: "Establish your Foundation with complete confidence through our comprehensive legal services, securing seamless Ministry approval, compliant operational permits, and a bulletproof organizational structure tailored for lasting social impact." , icon: Pill },
    // { title: 'Individual Limited Liability Company', description: " Establish your Individual Limited Liability Company seamlessly with our expert legal guidance, allowing you to secure single-founder corporate liability, official Ministry approval, and professional business licensing without the requirement of minimum capital or partners.", icon: FileCheck2 },

  //Standard Business License Service (isinya 3 statement pilihan di baawah)
    //pilihan 1 description: "From high-risk sector approvals to specialized ministry permits, our premium licensing service handles your specific corporate compliance architecture while you focus entirely on market domination."
    //pilihan 2 description: "Ensure that every specific commercial activity, product certification, and technical standard relevant to your business sector has absolute legal validation through PB-UMKU processing services that are fully integrated with the relevant ministries and the latest OSS RBA system."
    //pilihan 3 description: "Protect your business investment from the risks of administrative sanctions and operational hurdles by entrusting the verification of your standard certificates, distribution permits, and PB-UMKU special licenses to our team of corporate legal experts."

  { title: 'Book-keeping', description: "Entrust your financial architecture to Reanda Bernardi (link), our sister firm, a premium corporate advisory powerhouse that delivers flawless bookkeeping, immaculate financial ledger maintenance, and uncompromising regulatory compliance to support your high-stakes executive decisions.", icon: UserCheck },
  { title: 'Audit Service', description: " Leveraging over 50 years of domestic excellence and the cross-border strength of a top-tier global network, Reanda Bernardi (link) (our sister firm) delivers institutional-grade audit and assurance services that satisfy stringent regulatory compliance while revealing deep, realistic business insights to foster multi-generational enterprise sustainability.", icon: Stethoscope },
  { title: 'Tax Consulting Service', description: "Reanda Bernardi (link) delivers elite tax consulting services that provide absolute assurance on your tax compliance, meticulously insulating your enterprise from fiscal exposure while strategically aligning your operations with the latest regulatory frameworks.", icon: Building },
  { title: 'VISA & KITAS', description: "Transition your international executives and specialized talent into Indonesia effortlessly with a premium immigration service that manages your corporate visas and KITAS processing with strict regulatory precision and boardroom-level transparency.", icon: BookOpenCheck },
  { title: 'Trademark & Patent', description: "Deliver elite intellectual property management services that safeguard your enterprise's proprietary innovations, strategically securing your trademark and patent registrations to provide absolute legal protection and commercial exclusivity in domestic markets.", icon: Landmark },
  
  //facility (ini dipisah sendiri tapi masih dalam 1 page yang sama)
  { title: 'Cafe & Coffee Roastery', description: "Workroom Coffee is built different—bringing you lightning-fast Wi-Fi, premium house-roasted beans, and an electric atmosphere designed to take you from a high-stakes team meeting to creative deep work, right into a fully relaxed afternoon lounge session.", icon: Receipt },
  { title: 'Meeting Room', description: "Elevate your presentations and client pitches in our three stunning, fully equipped meeting rooms, offering an expansive 14-pax boardroom for major corporate strategy sessions and two intimate 8-pax spaces optimized for fluid team collaboration.", icon: Briefcase },
  { title: 'Private Office', description: "Find your ideal workspace home within a corporate ecosystem designed for comfort, featuring flexible office sizing to scale your business seamlessly and a premium first-floor cafe that serves as the ultimate backdrop for casual meetings and afternoon relaxation.", icon: Briefcase },
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