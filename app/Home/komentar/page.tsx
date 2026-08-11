"use client";

import { useState } from "react";
import Image from "next/image";

const comments = [
  {
    image: "/bg-1.png",
    name: "Naila Murni Cahyani",
    position: "CEO PT. Woman Empowerment Indonesia",
    text: "Proses penggunaan jasa kami berjalan sangat lancar dan transparan. Tim sangat responsif dan memberikan pelayanan terbaik.",
  },
  {
    image: "/bg-1.png",
    name: "Danendra Saputra",
    position: "CEO PT. Synapse Teknologi Digital",
    text: "Pelayanan cepat, tepat, dan sangat membantu. Kami merasa sangat terbantu dengan layanan yang diberikan.",
  },
  {
    image: "/bg-1.png",
    name: " Zahratul Jannah Afnur",
    position: "CEO, PT. Komputer Indonesia",
    text: "Kami sangat puas dengan hasil pekerjaan yang diberikan. Prosesnya mudah dan komunikasinya sangat baik.",
  },
  {
    image: "/bg-1.png",
    name: "Arpi",
    position: "CEO PT. Peralatan Gaming",
    text: "Profesional, ramah, dan sangat membantu dalam menyelesaikan kebutuhan bisnis kami.",
  },
  {
    image: "/bg-1.png",
    name: "Bina Muhammad",
    position: "CEO PT. Desain Kreatif Indonesia",
    text: "Pengalaman yang sangat baik. Pelayanan profesional dan hasil yang diberikan sesuai dengan kebutuhan kami.",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  const handlePrevious = () => {
    setCurrent((prev) => (prev - 1 + comments.length) % comments.length);
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
    <main>
      <section
        className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-cover bg-center bg-no-repeat py-16"
        style={{ backgroundImage: "url('/image/background-testimoni.png')" }}
      >
        <div className="mx-auto grid w-full max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold">
            <span className="text-[#d4a35f]">Komentar</span>{" "}
            <span className="text-black">Klien Kami</span>
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            Komentar dari klien yang telah menggunakan layanan kami sebagai
            wujud profesionalisme dan kualitas kerja.
          </p>
        </div>
        <div className="relative mx-auto mt-10 grid w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-3 px-8">
          <button
            type="button"
            onClick={handlePrevious}
            aria-label="Komentar sebelumnya"
            className="grid h-9 w-9 place-items-center rounded-full border border-[#e88900] bg-white text-xl leading-none text-[#e88900] shadow-sm transition duration-200 hover:scale-110 hover:bg-[#e88900] hover:text-white"
          >
            ‹
          </button>
          <div className="grid w-full grid-cols-3 items-center gap-4">
            <div className="grid h-56 w-full grid-rows-[auto_1fr_auto] overflow-hidden rounded-xl border border-gray-300 bg-white p-5 shadow-md">
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
                  className="rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-gray-800">
                    {leftComment.name}
                  </p>
                  <p className="truncate text-[10px] text-gray-500">
                    {leftComment.position}
                  </p>
                </div>
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
                  className="rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-gray-800">
                    {centerComment.name}
                  </p>
                  <p className="truncate text-[10px] text-gray-500">
                    {centerComment.position}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid h-56 w-full grid-rows-[auto_1fr_auto] overflow-hidden rounded-xl border border-gray-300 bg-white p-5 shadow-md">
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
                  className="rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-gray-800">
                    {rightComment.name}
                  </p>
                  <p className="truncate text-[10px] text-gray-500">
                    {rightComment.position}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Komentar selanjutnya"
            className="grid h-9 w-9 place-items-center rounded-full border border-[#e88900] bg-white text-xl leading-none text-[#e88900] shadow-sm transition duration-200 hover:scale-110 hover:bg-[#e88900] hover:text-white"
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
      </section>
    </main>
  );
}