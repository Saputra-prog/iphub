"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface BisnisData {
  title?: string;
  content?: string;
  bgImage?: string;
}

function BusinessPlanning() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  const [data, setData] = useState<BisnisData>({
    title: "Perencanaan Bisnis Anda",
    content:
      "Temukan rencana yang tepat untuk bisnis Anda. Hubungi kami dan kami juga dapat membantu Anda menyesuaikan rencana Anda untuk layanan dan harga terbaik untuk perusahaan Anda.",
    bgImage: "/bg-p.jpeg",
  });

  useEffect(() => {
    axios
      .get<BisnisData>(`${API_URL}/api/bisnis`)
      .then((res) => {
        if (res.data) {
          setData({
            title: res.data.title || "Perencanaan Bisnis Anda",
            content:
              res.data.content ||
              "Temukan rencana yang tepat untuk bisnis Anda. Hubungi kami dan kami juga dapat membantu Anda menyesuaikan rencana Anda untuk layanan dan harga terbaik untuk perusahaan Anda.",
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
            {data.title}
          </h2>
          <p className="mt-4 md:mt-5 text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0 whitespace-pre-line">
            {data.content}
          </p>
        </div>
        <div className="px-6 sm:px-10 md:px-0 md:pr-12 lg:pr-20 pb-10 md:py-10">
          <img
            src={data.bgImage}
            alt={data.title || "Business Planning"}
            className="w-full h-auto object-cover rounded-lg shadow-lg mx-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessPlanning;

// pusing