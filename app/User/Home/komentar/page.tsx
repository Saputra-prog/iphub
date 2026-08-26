"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface CommentItem {
  id: number | string;
  name: string;
  rating: number;
  comment: string;
  profileImage?: string;
}

export default function Home() {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [current, setCurrent] = useState(0);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/testimonialModel`);
        if (res.data?.success && res.data.data.length > 0) {
          setComments(res.data.data);
        }
      } catch (err) {
        console.error("Gagal mengambil data testimonial:", err);
      }
    };

    if (API_URL) {
      fetchComments();
    }
  }, [API_URL]);

  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return "/bg-1.png";
    if (imagePath.startsWith("http")) return imagePath;
    
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    return `${API_URL}${cleanPath}`;
  };

  const handlePrevious = () => {
    if (comments.length === 0) return;
    setCurrent((prev) => (prev - 1 + comments.length) % comments.length);
  };

  const handleNext = () => {
    if (comments.length === 0) return;
    setCurrent((prev) => (prev + 1) % comments.length);
  };

  const renderStars = (rating: number) => {
    return "★".repeat(Math.min(Math.max(rating, 1), 5));
  };

  if (comments.length === 0) {
    return null;
  }

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
            {/* Card Left */}
            <div className="hidden md:grid h-56 w-full grid-rows-[auto_1fr_auto] overflow-hidden rounded-xl border border-gray-300 bg-white p-5 shadow-md">
              <div className="text-sm tracking-wide text-yellow-400">
                {renderStars(leftComment.rating)}
              </div>
              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-gray-600">
                "{leftComment.comment}"
              </p>
              <div className="grid grid-cols-[40px_1fr] items-center gap-2">
                <img
                  src={getImageUrl(leftComment.profileImage)}
                  alt={leftComment.name}
                  className="h-10 w-10 aspect-square rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/bg-1.png";
                  }}
                />
                <p className="truncate text-xs font-semibold text-gray-800">
                  {leftComment.name}
                </p>
              </div>
            </div>

            {/* Card Center */}
            <div className="grid h-56 w-full grid-rows-[auto_1fr_auto] overflow-hidden rounded-xl border border-gray-300 bg-white p-5 shadow-md">
              <div className="text-sm tracking-wide text-yellow-400">
                {renderStars(centerComment.rating)}
              </div>
              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-gray-600">
                "{centerComment.comment}"
              </p>
              <div className="grid grid-cols-[40px_1fr] items-center gap-2">
                <img
                  src={getImageUrl(centerComment.profileImage)}
                  alt={centerComment.name}
                  className="h-10 w-10 aspect-square rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/bg-1.png";
                  }}
                />
                <p className="truncate text-xs font-semibold text-gray-800">
                  {centerComment.name}
                </p>
              </div>
            </div>

            {/* Card Right */}
            <div className="hidden md:grid h-56 w-full grid-rows-[auto_1fr_auto] overflow-hidden rounded-xl border border-gray-300 bg-white p-5 shadow-md">
              <div className="text-sm tracking-wide text-yellow-400">
                {renderStars(rightComment.rating)}
              </div>
              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-gray-600">
                "{rightComment.comment}"
              </p>
              <div className="grid grid-cols-[40px_1fr] items-center gap-2">
                <img
                  src={getImageUrl(rightComment.profileImage)}
                  alt={rightComment.name}
                  className="h-10 w-10 aspect-square rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/bg-1.png";
                  }}
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