'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

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
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);

  useEffect(() => {
    axios
      .get<HeroData>(`${API_URL}/api/hero`)
      .then((res) => {
        setTitle(res.data.title || '');
        setContent(res.data.content || '');
        if (res.data.bgImage) {
          setCurrentBg(`${API_URL}${res.data.bgImage}`);
        }
      })
      .catch((err) => {
        console.error('Gagal mengambil data:', err);
        setStatusMessage({ text: 'Gagal memuat data dari server.', isError: true });
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

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '24px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
        Admin Panel - Kelola Hero Section Halaman Utama
      </h1>

      {statusMessage && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '6px',
            marginBottom: '20px',
            backgroundColor: statusMessage.isError ? '#f8d7da' : '#d4edda',
            color: statusMessage.isError ? '#721c24' : '#155724',
            border: `1px solid ${statusMessage.isError ? '#f5c6cb' : '#c3e6cb'}`,
          }}
        >
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#444' }}>
            Judul Halaman:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul..."
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '15px',
              outline: 'none',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#444' }}>
            Isi / Deskripsi Teks:
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Masukkan teks deskripsi..."
            rows={5}
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '15px',
              outline: 'none',
              resize: 'vertical',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#444' }}>
            Gambar Background:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'block', marginBottom: '10px' }}
          />

          {currentBg && (
            <div style={{ marginTop: '10px' }}>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '6px' }}>Preview Background Saat Ini:</p>
              <img
                src={currentBg}
                alt="Background Preview"
                style={{
                  width: '100%',
                  maxHeight: '240px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '14px',
            backgroundColor: loading ? '#cccccc' : '#ff9900',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
          }}
        >
          {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </form>
    </div>
  );
}