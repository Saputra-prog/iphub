"use client";

import React from "react";

function BusinessPlanning() {
  return (
    <div
      className="relative left-1/2 w-screen -translate-x-1/2 my-8 md:my-16 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/bg-iphub.png')",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="px-6 sm:px-10 md:px-12 lg:px-20 py-10 md:py-16 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            <span className="text-[#d4a35f]">
              Perencanaan
            </span>{" "}
            <span className="text-[#222]">
              Bisnis Anda
            </span>
          </h2>
          <p className="mt-4 md:mt-5 text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0">
            Temukan rencana yang tepat untuk bisnis Anda.
            Hubungi kami dan kami juga dapat membantu Anda
            menyesuaikan rencana Anda untuk layanan dan harga
            terbaik untuk perusahaan Anda.
          </p>
        </div>
        <div className="px-6 sm:px-10 md:px-0 md:pr-12 lg:pr-20 pb-10 md:py-10">
          <img
            src="/bg-p.jpeg"
            alt="Business Planning"
            className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-lg mx-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessPlanning;