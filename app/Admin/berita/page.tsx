'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface BeritaItem {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string;
}

export default function AdminBeritaPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

  const [beritaList, setBeritaList] = useState<BeritaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '/placeholder.png';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
    const cleanBase = API_URL.replace(/\/$/, '');
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${cleanBase}${cleanPath}`;
  };

  const fetchBerita = async () => {
    setLoading(true);
    try {
      const response = await axios.get<BeritaItem[]>(`${API_URL}/api/berita`);
      setBeritaList(response.data || []);
    } catch (err) {
      console.error('Gagal mengambil data berita:', err);
      setStatusMessage({ text: 'Gagal memuat data berita dari server.', isError: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, [API_URL]);

  const handleOpenAddModal = () => {
    setEditingId(null);
    setTitle('');
    setDate('');
    setContent('');
    setImageFile(null);
    setPreviewImage('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: BeritaItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDate(item.date);
    setContent(item.content);
    setImageFile(null);
    setPreviewImage(getImageUrl(item.image));
    setIsModalOpen(true);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('content', content);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/berita/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setStatusMessage({ text: 'Berita berhasil diperbarui!', isError: false });
      } else {
        await axios.post(`${API_URL}/api/berita`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setStatusMessage({ text: 'Berita berhasil ditambahkan!', isError: false });
      }

      setIsModalOpen(false);
      fetchBerita();
    } catch (err) {
      console.error('Gagal menyimpan berita:', err);
      setStatusMessage({ text: 'Gagal menyimpan data berita.', isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) return;

    try {
      await axios.delete(`${API_URL}/api/berita/${id}`);
      setStatusMessage({ text: 'Berita berhasil dihapus!', isError: false });
      fetchBerita();
    } catch (err) {
      console.error('Gagal menghapus berita:', err);
      setStatusMessage({ text: 'Gagal menghapus berita.', isError: true });
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 md:px-8 pb-24 font-sans">
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-zinc-800">
        Admin Panel - Kelola Berita & Kegiatan
      </h1>

      {statusMessage && (
        <div
          className={`p-4 rounded-lg mb-6 border ${
            statusMessage.isError
              ? 'bg-red-50 text-red-700 border-red-200'
              : 'bg-green-50 text-green-700 border-green-200'
          }`}
        >
          {statusMessage.text}
        </div>
      )}
      {loading ? (
        <p className="text-zinc-500">Memuat data berita...</p>
      ) : beritaList.length === 0 ? (
        <p className="text-zinc-500">
          Belum ada berita. Klik tombol Tambah di kanan bawah untuk membuat berita baru.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {beritaList.map((item) => (
            <div
              key={item.id}
              className="border border-zinc-200 rounded-xl overflow-hidden bg-white flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="w-full h-44 bg-zinc-100 overflow-hidden">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs font-bold text-amber-500 block mb-1">
                    {item.date}
                  </span>
                  <h3 className="text-sm md:text-base font-bold text-zinc-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3">
                    {item.content}
                  </p>
                </div>
              </div>
              <div className="p-3 border-t border-zinc-100 flex gap-2 bg-zinc-50">
                <button
                  onClick={() => handleOpenEditModal(item)}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded transition-colors cursor-pointer"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={handleOpenAddModal}
        className="fixed bottom-8 right-8 px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm md:text-base rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer z-50 flex items-center gap-2"
      >
        + Tambah Berita
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <h2 className="text-lg font-bold mb-4 text-zinc-800">
              {editingId ? 'Edit Berita' : 'Tambah Berita Baru'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Judul Berita:
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Masukkan judul berita..."
                  className="w-full p-2.5 text-sm rounded-md border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Tanggal (misal: 10 SEP 2025):
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  placeholder="Contoh: 10 SEP 2025"
                  className="w-full p-2.5 text-sm rounded-md border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Deskripsi / Isi Berita:
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  required
                  placeholder="Masukkan konten..."
                  className="w-full p-2.5 text-sm rounded-md border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Gambar Berita:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer"
                />
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-36 object-cover mt-3 rounded-md border border-zinc-200"
                  />
                )}
              </div>
              <div className="flex gap-2 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-md border border-zinc-300 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-md bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}