'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Save, Upload, Home, Image as ImageIcon } from 'lucide-react';

interface HeroData {
  id?: number;
  title: string;
  content: string;
  bgImage: string;
}

export default function AdminHomePage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [bgImageFile, setBgImageFile] = useState<File | null>(null);
  const [currentBg, setCurrentBg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingFetch, setLoadingFetch] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);

  useEffect(() => {
    axios
      .get<HeroData>(`${API_URL}/api/hero`)
      .then((res) => {
        setTitle(res.data.title || '');
        setContent(res.data.content || '');
        if (res.data.bgImage) {
          const fullImg = res.data.bgImage.startsWith('http')
            ? res.data.bgImage
            : `${API_URL}${res.data.bgImage}`;
          setCurrentBg(fullImg);
        }
      })
      .catch((err) => {
        console.error('Gagal mengambil data:', err);
        setStatusMessage({ text: 'Gagal memuat data dari server.', isError: true });
      })
      .finally(() => {
        setLoadingFetch(false);
      });
  }, [API_URL]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBgImageFile(file);
      setCurrentBg(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (bgImageFile) {
      formData.append('bgImage', bgImageFile);
    }

    try {
      await axios.put(`${API_URL}/api/hero`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setStatusMessage({ text: 'Perubahan berhasil disimpan!', isError: false });
    } catch (err) {
      console.error('Gagal menyimpan data:', err);
      setStatusMessage({ text: 'Gagal menyimpan perubahan ke server.', isError: true });
    } finally {
      setLoading(false);
    }
  };

  if (loadingFetch) {
    return <div className="p-8 text-center text-gray-500">Memuat data hero...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Home className="text-amber-500" /> Halaman Utama
        </h1>
        <p className="text-gray-500 text-sm">
          Kelola teks judul, deskripsi, dan gambar latar belakang utama untuk tampilan awal website.
        </p>
      </div>
      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-sm font-medium transition-all ${
            statusMessage.isError
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}
        >
          {statusMessage.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Judul Halaman
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul halaman..."
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all text-sm text-gray-800"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Isi / Deskripsi Teks
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Masukkan deskripsi..."
            rows={5}
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all text-sm text-gray-800"
          />
        </div>
        <div className="space-y-3 pt-2">
          <label className="block text-sm font-semibold text-gray-700">
            Gambar Background
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer border border-gray-200 rounded-xl"
            />
          </div>
          {currentBg && (
            <div className="mt-4 space-y-2">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <ImageIcon size={14} /> Preview Background Saat Ini:
              </span>
              <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-video max-h-72">
                <img
                  src={currentBg}
                  alt="Background Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-medium px-6 py-2.5 rounded-xl transition-all shadow-sm disabled:opacity-50 cursor-pointer"
          >
            <Save size={18} />
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
}