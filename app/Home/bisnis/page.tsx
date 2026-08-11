"use client";

import React from "react";

function BusinessPlanning() {
  return (
    <div
      className="relative left-1/2 w-screen -translate-x-1/2 my-16 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/bg-p1.jpeg')",
      }}
    >
      <div className="grid grid-cols-2">
        <div className="px-20 py-16 self-center">
          <h2 className="text-4xl font-bold">
            <span className="text-[#d4a35f]">
              Perencanaan
            </span>{" "}
            <span className="text-[#222]">
              Bisnis Anda
            </span>
          </h2>
          <p className="mt-5 text-gray-600 leading-relaxed">
            Temukan rencana yang tepat untuk bisnis Anda.
            Hubungi kami dan kami juga dapat membantu Anda
            menyesuaikan rencana Anda untuk layanan dan harga
            terbaik untuk perusahaan Anda.
          </p>
        </div>
        <div className="pr-20 py-10">
          <img
            src="/bg-p.jpeg"
            alt="Business Planning"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessPlanning;