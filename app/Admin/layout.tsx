import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: "240px",
          backgroundColor: "#1e293b",
          color: "#fff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
          Admin Panel
        </h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link
            href="/Admin/home"
            style={{ color: "#fff", textDecoration: "none", padding: "8px 12px", borderRadius: "4px" }}
          >
            Home
          </Link>
          <Link
            href="/Admin/berita"
            style={{ color: "#fff", textDecoration: "none", padding: "8px 12px", borderRadius: "4px" }}
          >
            Berita
          </Link>
          <Link
            href="/Admin/bisnis"
            style={{ color: "#fff", textDecoration: "none", padding: "8px 12px", borderRadius: "4px" }}
          >
            Bisnis
          </Link>
          <Link
            href="/Admin/deskripsi"
            style={{ color: "#fff", textDecoration: "none", padding: "8px 12px", borderRadius: "4px" }}
          >
            Deskripsi
          </Link>
          <Link
            href="/Admin/komentar"
            style={{ color: "#fff", textDecoration: "none", padding: "8px 12px", borderRadius: "4px" }}
          >
            Komentar
          </Link>
          <Link
            href="/Admin/bannerPromo"
            style={{ color: "#fff", textDecoration: "none", padding: "8px 12px", borderRadius: "4px" }}
          >
            Banner
          </Link>
          <Link
            href="/Admin/location"
            style={{ color: "#fff", textDecoration: "none", padding: "8px 12px", borderRadius: "4px" }}
          >
            Lokasi
          </Link>
          <Link
            href="/Admin/ubah"
            style={{ color: "#fff", textDecoration: "none", padding: "8px 12px", borderRadius: "4px" }}
          >
            Ubah Password
          </Link>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: "30px", backgroundColor: "#f8fafc" }}>
        {children}
      </main>
    </div>
  );
}