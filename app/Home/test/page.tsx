// "use client";

// import React, { useEffect, useState } from "react";

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";

// import Image from "next/image";

// function Testimonial() {
//   const [api, setApi] = useState();
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     if (!api) return;

//     const update = () => {
//       setCurrent(api.selectedScrollSnap());
//     };

//     update();

//     api.on("select", update);

//     const interval = setInterval(() => {
//       api.scrollNext();
//     }, 2500);

//     return () => {
//       clearInterval(interval);
//       api.off("select", update);
//     };
//   }, [api]);

//   return (
//     <div
//       className="relative left-1/2 w-screen -translate-x-1/2 bg-cover bg-center bg-no-repeat py-16"
//       style={{
//         backgroundImage: "url('/image/background-testimoni.png')",
//       }}
//     >
//       {/* Judul */}
//       <div className="mx-auto grid w-full max-w-6xl px-6 text-center">

//         <h2 className="text-3xl font-bold">
//           <span className="text-[#d4a35f]">
//             Testimoni
//           </span>{" "}
//           Klien Kami
//         </h2>

//         <p className="mt-3 text-gray-600">
//           Testimoni dari klien yang telah menggunakan layanan kami
//           sebagai wujud profesionalisme dan kualitas kerja.
//         </p>

//       </div>


//       {/* carousel */}
//       <div className="mx-auto mt-10 grid w-full max-w-4xl px-4">

//         <Carousel
//           setApi={setApi}
//           opts={{
//             loop: true,
//             align: "start",
//           }}
//           className="w-full"
//         >

//           <CarouselContent className="-ml-4">

//             {/* Testimonial 1*/}
//             <CarouselItem className="grid basis-full pl-4 md:basis-1/2">

//               <div className="relative grid overflow-hidden rounded-xl border bg-white p-6 shadow-md">

//                 {/* Rating */}
//                 <div className="text-xl tracking-wide text-yellow-400">
//                   ★★★★★
//                 </div>


//                 {/* Isi Testimoni */}
//                 <p className="mt-4 text-sm leading-relaxed text-gray-600">
//                   "Proses penggunaan jasa kami berjalan sangat
//                   lancar dan transparan. Tim sangat responsif
//                   dan memberikan pelayanan terbaik."
//                 </p>


//                 {/* Profile */}
//                 <div className="relative mt-6 grid grid-cols-[50px_1fr] items-center gap-3">

//                   {/* Background tanda kutip */}
//                   <div
//                     className="pointer-events-none absolute -bottom-8 right-0 h-32 w-32 bg-contain bg-bottom bg-no-repeat opacity-40"
//                     style={{
//                       backgroundImage:
//                         "url('/image/person.png')",
//                     }}
//                   />

//                   {/* Foto */}
//                   <Image
//                     className="relative z-10 rounded-full object-cover"
//                     src="/image/person1.jpeg"
//                     alt="Zahratul Jannah Afnur"
//                     width={50}
//                     height={50}
//                   />

//                   {/* Informasi */}
//                   <div className="relative z-10">
//                     <p className="text-sm font-semibold">
//                       Zahratul Jannah Afnur
//                     </p>

//                     <p className="text-xs text-gray-500">
//                       CEO PT. Woman Empowerment Indonesia
//                     </p>
//                   </div>

//                 </div>

//               </div>

//             </CarouselItem>


//             {/* Testimonial 2*/}
//             <CarouselItem className="grid basis-full pl-4 md:basis-1/2">

//               <div className="relative grid overflow-hidden rounded-xl border bg-white p-6 shadow-md">

//                 {/* Rating */}
//                 <div className="text-xl tracking-wide text-yellow-400">
//                   ★★★★★
//                 </div>


//                 {/* Isi Testimoni */}
//                 <p className="mt-4 text-sm leading-relaxed text-gray-600">
//                   "Pelayanan cepat, tepat, dan sangat membantu.
//                   Kami merasa sangat terbantu dengan layanan
//                   yang diberikan."
//                 </p>


//                 {/* Profile */}
//                 <div className="relative mt-6 grid grid-cols-[50px_1fr] items-center gap-3">

//                   {/* Background tanda kutip */}
//                   <div
//                     className="pointer-events-none absolute -bottom-8 right-0 h-32 w-32 bg-contain bg-bottom bg-no-repeat opacity-40"
//                     style={{
//                       backgroundImage:
//                         "url('/image/person.png')",
//                     }}
//                   />

//                   {/* Foto */}
//                   <Image
//                     className="relative z-10 rounded-full object-cover"
//                     src="/image/person2.jpeg"
//                     alt="Danendra Saputra"
//                     width={50}
//                     height={50}
//                   />

//                   {/* Informasi */}
//                   <div className="relative z-10">
//                     <p className="text-sm font-semibold">
//                       Danendra Saputra
//                     </p>

//                     <p className="text-xs text-gray-500">
//                       CEO PT. Synapse Teknologi Digital
//                     </p>
//                   </div>

//                 </div>

//               </div>

//             </CarouselItem>


//             {/* Testimonial 3*/}
//             <CarouselItem className="grid basis-full pl-4 md:basis-1/2">

//               <div className="relative grid overflow-hidden rounded-xl border bg-white p-6 shadow-md">

//                 {/* Rating */}
//                 <div className="text-xl tracking-wide text-yellow-400">
//                   ★★★★★
//                 </div>


//                 {/* Isi Testimoni */}
//                 <p className="mt-4 text-sm leading-relaxed text-gray-600">
//                   "Kami sangat puas dengan hasil pekerjaan
//                   yang diberikan. Prosesnya mudah dan
//                   komunikasinya sangat baik."
//                 </p>


//                 {/* Profile */}
//                 <div className="relative mt-6 grid grid-cols-[50px_1fr] items-center gap-3">

//                   <div
//                     className="pointer-events-none absolute -bottom-8 right-0 h-32 w-32 bg-contain bg-bottom bg-no-repeat opacity-40"
//                     style={{
//                       backgroundImage:
//                         "url('/image/person.png')",
//                     }}
//                   />

//                   {/* Foto */}
//                   <Image
//                     className="relative z-10 rounded-full object-cover"
//                     src="/image/person3.jpeg"
//                     alt="Bina Muhammad"
//                     width={50}
//                     height={50}
//                   />

//                   {/* Informasi */}
//                   <div className="relative z-10">
//                     <p className="text-sm font-semibold">
//                       Bina Muhammad
//                     </p>

//                     <p className="text-xs text-gray-500">
//                       CEO, PT. Komputer Indonesia
//                     </p>
//                   </div>

//                 </div>

//               </div>

//             </CarouselItem>


//             {/* Testimonial 4*/}
//             <CarouselItem className="grid basis-full pl-4 md:basis-1/2">

//               <div className="relative grid overflow-hidden rounded-xl border bg-white p-6 shadow-md">

//                 {/* Rating */}
//                 <div className="text-xl tracking-wide text-yellow-400">
//                   ★★★★★
//                 </div>


//                 {/* Isi Testimoni */}
//                 <p className="mt-4 text-sm leading-relaxed text-gray-600">
//                   "Profesional, ramah, dan sangat membantu
//                   dalam menyelesaikan kebutuhan bisnis kami."
//                 </p>


//                 {/* Profile */}
//                 <div className="relative mt-6 grid grid-cols-[50px_1fr] items-center gap-3">

//                   {/* Background tanda kutip */}
//                   <div
//                     className="pointer-events-none absolute -bottom-8 right-0 h-32 w-32 bg-contain bg-bottom bg-no-repeat opacity-40"
//                     style={{
//                       backgroundImage:
//                         "url('/image/person.png')",
//                     }}
//                   />

//                   {/* Foto */}
//                   <Image
//                     className="relative z-10 rounded-full object-cover"
//                     src="/image/person4.jpeg"
//                     alt="Arpi"
//                     width={50}
//                     height={50}
//                   />

//                   {/* Informasi */}
//                   <div className="relative z-10">
//                     <p className="text-sm font-semibold">
//                       Arpi
//                     </p>

//                     <p className="text-xs text-gray-500">
//                       CEO PT. Peralatan Gaming
//                     </p>
//                   </div>

//                 </div>

//               </div>

//             </CarouselItem>


//             {/* Testimonial 5*/}
//             <CarouselItem className="grid basis-full pl-4 md:basis-1/2">

//               <div className="relative grid overflow-hidden rounded-xl border bg-white p-6 shadow-md">

//                 {/* Rating */}
//                 <div className="text-xl tracking-wide text-yellow-400">
//                   ★★★★★
//                 </div>


//                 {/* Isi Testimoni */}
//                 <p className="mt-4 text-sm leading-relaxed text-gray-600">
//                   "Pengalaman yang sangat baik. Pelayanan
//                   profesional dan hasil yang diberikan
//                   sesuai dengan kebutuhan kami."
//                 </p>


//                 {/* Profile */}
//                 <div className="relative mt-6 grid grid-cols-[50px_1fr] items-center gap-3">

//                   {/* Background tanda kutip */}
//                   <div
//                     className="pointer-events-none absolute -bottom-8 right-0 h-32 w-32 bg-contain bg-bottom bg-no-repeat opacity-40"
//                     style={{
//                       backgroundImage:
//                         "url('/image/person.png')",
//                     }}
//                   />

//                   {/* Foto */}
//                   <Image
//                     className="relative z-10 rounded-full object-cover"
//                     src="/image/personke5.jpeg"
//                     alt="Naila Murni Cahyani"
//                     width={50}
//                     height={50}
//                   />

//                   {/* Informasi */}
//                   <div className="relative z-10">
//                     <p className="text-sm font-semibold">
//                       Naila Murni Cahyani
//                     </p>

//                     <p className="text-xs text-gray-500">
//                       CEO PT. Desain Kreatif Indonesia
//                     </p>
//                   </div>

//                 </div>

//               </div>

//             </CarouselItem>

//           </CarouselContent>

//         </Carousel>

//       </div>


//       {/* bulat bulatan yang dibawah*/}
//       <div className="mt-6 grid place-items-center">

//         <div className="grid grid-flow-col gap-2">

//           {[0, 1, 2, 3, 4].map((index) => (
//             <button
//               key={index}
//               onClick={() => api?.scrollTo(index)}
//               className={`h-2 w-2 rounded-full ${current === index
//                 ? "bg-yellow-500"
//                 : "bg-gray-300"
//                 }`}
//             />
//           ))}

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Testimonial;