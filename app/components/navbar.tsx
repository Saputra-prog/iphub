import Link from 'next/link';
import Image from 'next/image';

function Navbar() {
  return (
    <div className="absolute top-0 left-0 right-0 w-full z-50 flex items-center px-4 py-1 bg-transparent">
      <div className="rounded-lg px-4 ml-[5%]">
        <Link href="/">
          <Image src="/Logo3.png" width={180} height={180} alt="LOGO" priority />
        </Link>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-6 text-white text-sm font-medium whitespace-nowrap">
        <a href="#home" className="hover:opacity-80 transition-opacity">
          Tentang kami
        </a>
        <a href="#desk" className="hover:opacity-80 transition-opacity">
          Layanan Dan Perencanaan
        </a>
        <a href="#lokasi" className="hover:opacity-80 transition-opacity">
          Lokasi
        </a>
        <a href="#berita" className="hover:opacity-80 transition-opacity">
          Berita
        </a>
        <a href="#footer" className="hover:opacity-80 transition-opacity">
          Hubungi Kami
        </a>
      </div>
    </div>
  );
}

export default Navbar;