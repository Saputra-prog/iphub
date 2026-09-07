"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLanguage } from '../../../components/LanguageContext';

interface BisnisData {
  title_id?: string;
  title_en?: string;
  content_id?: string;
  content_en?: string;
  bgImage?: string;
}

function BusinessPlanning() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
  const { lang } = useLanguage();

  const [data, setData] = useState<BisnisData>({
    title_id: "Perencanaan Bisnis Anda",
    title_en: "Your Business Planning",
    content_id:
      "Temukan rencana yang tepat untuk bisnis Anda. Hubungi kami dan kami juga dapat membantu Anda menyesuaikan rencana Anda untuk layanan dan harga terbaik untuk perusahaan Anda.",
    content_en:
      "Find the right plan for your business. Contact us and we can also help you customize your plan to get the best services and pricing for your company.",
    bgImage: "/bg-p.jpeg",
  });

  useEffect(() => {
    axios
      .get<BisnisData>(`${API_URL}/api/bisnis`)
      .then((res) => {
        if (res.data) {
          setData({
            title_id: res.data.title_id || "Perencanaan Bisnis Anda",
            title_en: res.data.title_en || "Your Business Planning",
            content_id:
              res.data.content_id ||
              "Temukan rencana yang tepat untuk bisnis Anda. Hubungi kami dan kami juga dapat membantu Anda menyesuaikan rencana Anda untuk layanan dan harga terbaik untuk perusahaan Anda.",
            content_en:
              res.data.content_en ||
              "Find the right plan for your business. Contact us and we can also help you customize your plan to get the best services and pricing for your company.",
            bgImage: res.data.bgImage
              ? `${API_URL}${res.data.bgImage}`
              : "/bg-p.jpeg",
          });
        }
      })
      .catch((err) => {
        console.error("Gagal mengambil data bisnis:", err);
      });
  }, [API_URL]);

  const title = lang === "ID" ? data.title_id : data.title_en;
  const content = lang === "ID" ? data.content_id : data.content_en;

  return (
    <div
      className="relative left-1/2 w-screen -translate-x-1/2 my-8 md:my-16 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/bg-iphub.png')",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="px-6 sm:px-10 md:px-12 lg:px-20 py-10 md:py-16 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#222]">
            {title}
          </h2>

          <p className="mt-4 md:mt-5 text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0 whitespace-pre-line">
            {content}
          </p>
        </div>

        <div className="px-6 sm:px-10 md:px-0 md:pr-12 lg:pr-20 pb-10 md:py-10">
          <img
            src={data.bgImage}
            alt={title || "Business Planning"}
            className="w-full h-auto object-cover rounded-lg shadow-lg mx-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessPlanning;