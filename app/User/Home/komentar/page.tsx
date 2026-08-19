"use client";

import { useState } from "react";
import Image from "next/image";

const comments = [
  {
    image: "/bg-1.png",
    name: "Alwi AlRasyi",
    text: "Mungkin saya menemukan salah satu Virtual office yang unik. Karena dari luar seperti sebuah coffee shop tapi waktu masuk kedalam, tempat ini ternyata memiliki fasilitas VO. Kelebihan virtual office ditempat ini dapat membantu segala proses perizinan seperti pendirian PT, lisensi bisnis dan konsultan pajak.",
  },
  {
    image: "/bg-1.png",
    name: "Aulia Rizki",
    text: "Virtual office di pusat kota jakarta yang tidak kena rute ganjil genap dan mudah di akses oleh transportasi publik seperti commuter dan transjakarta. Ada cafe dan meeting room untuk pertemuan dengan klien.",
  },
  {
    image: "/bg-1.png",
    name: "Zacky Hutama",
    text: "Great place to work, with a cafe on the ground floor. Also, the first time I got here, I'm visiting the Mozilla Community Space Jakarta. Have a great time here, definitely come back here any time soon!",
  },
  {
    image: "/bg-1.png",
    name: "Agus Rochmanto",
    text: "Sekilas terlihat hanya 1 lantai ternyata setelah masuk ada perkantoran yg nyaman dan cukup mewah sampai 4 lantai. Bersyukur kita bs dapat tempat disana..strategis simple dan representatif.",
  },
  {
    image: "/bg-1.png",
    name: "Chloe Elizabetha",
    text: "Worth it banget sih pelayanan nya, proses administrasinya juga cepat dan gak ribet, Pegawainya profesional, ramah jadi helping banget buat ngurus surat² maupun urusan legalitas. Lokasinya jg strategis jadi ngasih image yang bagus untuk bisnis saya, harganya pun worth it lah dengan fasilitas dan kualitas pelayanan yang disuguhin. Intinya recommended bgt buat pengusaha yang butuh domisili kantor yang terpercaya, mantap.",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  const handlePrevious = () => {
    setCurrent(
      (prev) => (prev - 1 + comments.length) % comments.length
    );
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % comments.length);
  };

  const leftIndex = (current - 1 + comments.length) % comments.length;
  const centerIndex = current;
  const rightIndex = (current + 1) % comments.length;

  const leftComment = comments[leftIndex];
  const centerComment = comments[centerIndex];
  const rightComment = comments[rightIndex];

  return (
    <div>
      <div
        className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-cover bg-center bg-no-repeat py-12 md:py-16"
        style={{
          backgroundImage: "url('/bg-iphub.png')",
        }}
      >
        <div className="mx-auto grid w-full max-w-6xl px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            <span className="text-[#d4a35f]">Komentar</span>{" "}
            <span className="text-black">Klien Kami</span>
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto">
            Komentar dari klien yang telah menggunakan layanan kami sebagai
            wujud profesionalisme dan kualitas kerja.
          </p>
        </div>

        <div className="relative mx-auto mt-8 sm:mt-10 flex w-full max-w-6xl items-center justify-between gap-2 sm:gap-4 px-4 sm:px-8">
          <button
            type="button"
            onClick={handlePrevious}
            aria-label="Komentar sebelumnya"
            className="z-10 grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-full border border-[#e88900] bg-white text-lg sm:text-xl leading-none text-[#e88900] shadow-sm transition duration-200 hover:scale-110 hover:bg-[#e88900] hover:text-white"
          >
            ‹
          </button>

          <div className="grid w-full grid-cols-1 md:grid-cols-3 items-center gap-4">
            <div className="hidden md:grid h-56 w-full grid-rows-[auto_1fr_auto] overflow-hidden rounded-xl border border-gray-300 bg-white p-5 shadow-md">
              <div className="text-sm tracking-wide text-yellow-400">
                ★★★★★
              </div>
              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-gray-600">
                "{leftComment.text}"
              </p>
              <div className="grid grid-cols-[40px_1fr] items-center gap-2">
                <Image
                  src={leftComment.image}
                  alt={leftComment.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 aspect-square rounded-full object-cover"
                />
                <p className="truncate text-xs font-semibold text-gray-800">
                  {leftComment.name}
                </p>
              </div>
            </div>

            <div className="grid h-56 w-full grid-rows-[auto_1fr_auto] overflow-hidden rounded-xl border border-gray-300 bg-white p-5 shadow-md">
              <div className="text-sm tracking-wide text-yellow-400">
                ★★★★★
              </div>
              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-gray-600">
                "{centerComment.text}"
              </p>
              <div className="grid grid-cols-[40px_1fr] items-center gap-2">
                <Image
                  src={centerComment.image}
                  alt={centerComment.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 aspect-square rounded-full object-cover"
                />
                <p className="truncate text-xs font-semibold text-gray-800">
                  {centerComment.name}
                </p>
              </div>
            </div>

            <div className="hidden md:grid h-56 w-full grid-rows-[auto_1fr_auto] overflow-hidden rounded-xl border border-gray-300 bg-white p-5 shadow-md">
              <div className="text-sm tracking-wide text-yellow-400">
                ★★★★★
              </div>
              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-gray-600">
                "{rightComment.text}"
              </p>
              <div className="grid grid-cols-[40px_1fr] items-center gap-2">
                <Image
                  src={rightComment.image}
                  alt={rightComment.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 aspect-square rounded-full object-cover"
                />
                <p className="truncate text-xs font-semibold text-gray-800">
                  {rightComment.name}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Komentar selanjutnya"
            className="z-10 grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-full border border-[#e88900] bg-white text-lg sm:text-xl leading-none text-[#e88900] shadow-sm transition duration-200 hover:scale-110 hover:bg-[#e88900] hover:text-white"
          >
            ›
          </button>
        </div>

        <div className="mt-5 grid place-items-center">
          <div className="grid grid-flow-col items-center gap-1.5">
            {comments.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Komentar ${index + 1}`}
                className={
                  current === index
                    ? "h-1.5 w-5 rounded-full bg-[#e88900] transition-all duration-300"
                    : "h-1.5 w-1.5 rounded-full bg-[#f6d98e] transition-all duration-300"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}