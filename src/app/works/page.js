'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Archive } from 'lucide-react'

// --- 1. DATABASE PROYEK (Kliping) ---
const projects = [
  {
    id: 'VOL.1',
    title: 'Nicotine Detection System (IoT)',
    category: 'Hardware / C++',
    date: 'Late 2025',
    desc: 'Purwarupa sistem deteksi nikotin real-time. Menjembatani logika perangkat keras dengan pemrosesan data sensor mentah menjadi antarmuka yang mudah dibaca.',
    img: '/images/Cisco.png', // Ganti dengan gambar IoT
    featured: true,
  },
  {
    id: 'VOL.2',
    title: 'Mobile Psychology Diagnostics',
    category: 'React Native / Expo Go',
    date: 'Feb 2026',
    desc: 'Membangun antarmuka aplikasi mobile heuristik untuk mengedukasi dan mencegah bahaya self-diagnosis di kalangan anak muda. Dikembangkan melalui riset lintas disiplin.',
    img: '/images/GreenApp.png', 
    featured: false,
  },
  {
    id: 'VOL.3',
    title: 'Enterprise Network Topology',
    category: 'Cisco / OSPF / ACL',
    date: 'Dec 2025',
    desc: 'Simulasi jaringan berskala enterprise yang mengamankan lalu lintas data. Diuji coba secara ketat dengan integrasi routing dan konfigurasi 4 terminal aktif (PC0, PC1, PC2, PC3).',
    img: '/images/Cisco.png',
    featured: false,
  },
  {
    id: 'VOL.4',
    title: 'Heuristic Mobile Redesign',
    category: 'UX Research',
    date: 'Feb 2026',
    desc: 'Laporan komprehensif: "Optimizing User Journey on Mobile Reservation Applications". Menerapkan prinsip heuristik UI/UX yang ketat untuk mengurangi friksi pengguna dan cart abandonment.',
    img: '/images/Vindes.png', 
    featured: true,
  },
  {
    id: 'VOL.5',
    title: 'Paper-Based Portal UX Analysis',
    category: 'System Analysis',
    date: 'Feb 2026',
    desc: 'Studi membongkar alur kerja portal akademik manual (sistem berbasis kertas fisik). Mengusulkan perombakan arsitektur informasi untuk mempercepat journey pengguna tanpa bergantung pada website.',
    img: '/images/Vindes.png', 
    featured: false,
  },
  {
    id: 'VOL.6',
    title: 'Los Santos RolePlay Mods',
    category: 'Game Dev / 3D',
    date: 'Jan 2026',
    desc: 'Memanipulasi aset dalam game untuk server GTA V RolePlay. Menciptakan karakter kustom, desain kendaraan, dan tekstur skin yang memodifikasi imersi pemain secara drastis.',
    img: '/images/Vindes.png', 
    featured: false,
  }
]

// --- 2. KOMPONEN KARTU KLIPING ---
const ClippingCard = ({ project, index }) => {
  // Membuat rotasi acak agar terlihat seperti ditempel manual (-2 deg sampai 2 deg)
  const randomRotation = index % 2 === 0 ? 'rotate-1' : '-rotate-1'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative bg-white border-4 border-black p-4 flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 ${randomRotation} hover:rotate-0 hover:z-10 ${project.featured ? 'md:col-span-2' : 'col-span-1'}`}
    >
      {/* Selotip (Visual Tape) */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/60 backdrop-blur-sm border border-gray-300 shadow-sm rotate-2 z-20"></div>

      <div className="border-b-4 border-black pb-2 mb-4 flex justify-between items-end">
         <span className="font-sans text-[0.6rem] font-black uppercase tracking-widest text-gray-500">
           {project.category}
         </span>
         <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5">
           {project.id}
         </span>
      </div>

      <div className={`relative w-full ${project.featured ? 'h-64 md:h-80' : 'h-48'} border-2 border-black mb-4 overflow-hidden bg-gray-200`}>
         <Image 
           src={project.img} 
           alt={project.title} 
           fill 
           className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
         />
         <div className="absolute inset-0 bg-yellow-900/10 mix-blend-multiply pointer-events-none"></div>
      </div>

      <h2 className="font-headline text-3xl font-black leading-none mb-3 group-hover:text-accent transition-colors">
        {project.title}
      </h2>
      
      <p className="font-body text-sm leading-relaxed text-gray-700 text-justify mb-6 flex-grow">
        {project.desc}
      </p>

      <div className="border-t-2 border-dashed border-gray-400 pt-3 mt-auto flex justify-between items-center">
         <span className="font-sans text-xs uppercase font-bold text-gray-500">
           Log Date: {project.date}
         </span>
         <Link href="#" className="flex items-center gap-1 font-sans text-xs font-black uppercase hover:text-accent transition-colors">
           Read Article <ArrowUpRight size={14} />
         </Link>
      </div>
    </motion.div>
  )
}

// --- 3. HALAMAN UTAMA ARSIP ---
export default function WorksArchive() {
  return (
    <main className="min-h-screen bg-[#F4F1EA] text-[#111] pb-32 px-4 md:px-8 max-w-[1400px] mx-auto">
      
      {/* --- HEADER --- */}
      <div className="mb-12 border-b-8 border-double border-black pb-8">
        <div className="flex items-center gap-3 mb-4">
           <Archive size={24} className="text-gray-500" />
           <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
             Declassified Portfolio
           </span>
        </div>
        <h1 className="font-masthead text-6xl md:text-[8rem] uppercase tracking-tighter leading-none mb-6">
          The Archives.
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-body text-sm text-justify max-w-4xl">
           <p className="first-letter:text-5xl first-letter:float-left first-letter:font-masthead first-letter:mr-2">
             A complete collection of digital clippings, research papers, and technical logs. This database catalogs the evolution from rigid algorithms to fluid user experiences.
           </p>
           <p className="md:border-l-2 border-black md:pl-4">
             Each clipping represents a problem solved, ranging from complex <strong>Cisco routing topologies</strong> to heuristic interface redesigns and hardware integrations. Proceed to browse the documentation.
           </p>
        </div>
      </div>

      {/* --- GRID KLIPING KORAN --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mt-16">
        {projects.map((project, index) => (
          <ClippingCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* --- FOOTER BANNER --- */}
      <div className="mt-32 pt-8 border-t-4 border-black flex flex-col md:flex-row justify-between items-center gap-4 font-sans text-xs font-bold uppercase tracking-widest text-gray-500">
         <span>End of Records</span>
         <span className="opacity-50 text-[0.5rem] tracking-[0.5em]">/// CLASSIFIED 2026 ///</span>
         <Link href="/" className="hover:text-black hover:underline underline-offset-4 flex items-center gap-2">
            Return to Front Page <ArrowUpRight size={14} />
         </Link>
      </div>

    </main>
  )
}