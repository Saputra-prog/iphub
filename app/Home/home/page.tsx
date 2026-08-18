import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <Image
        src="/bg-1.png"
        alt="background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="relative z-10 w-full max-w-6xl mx-auto text-center md:text-left pt-16 md:pt-0">
        <div className="text-white max-w-3xl mx-auto md:mx-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
            Mulai Bisnis Kamu Bersama Kami!
          </h1>
          <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base text-zinc-200 leading-relaxed font-light">
            <p>
              IPHUB, Perusahaan Lokal dengan Pengalaman bertahun-tahun yang Hadir untuk Membantu Kamu Memulai Bisnis Kamu dan Mensupport Bisnis Kamu
            </p>
            <p>
              IPHUB adalah Perusahaan yang Terafiliasi dengan <strong className="font-bold text-white">REANDA BERNARDI</strong>, Kantor Akuntan Publik Terkemuka di Dunia
            </p>
            <p className="pt-1 sm:pt-2">
              Dapatkan penawaran menarik dari Kami
            </p>
          </div>
          <a
            href="https://wa.me/628118181466?text=Halo,%20saya%20ingin%20bertanya%20mengenai%20layanan%20IPHUB" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full sm:w-auto mt-6 sm:mt-8 bg-amber-500 hover:bg-amber-600 text-zinc-900 font-semibold px-6 py-3 rounded-lg text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer text-center"
          >
            Hubungi Kami Sekarang
          </a>
        </div>
      </div>
    </div>
  );
}