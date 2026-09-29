'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Howl } from 'howler'
import { Play, Pause, Disc, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Profile({ lang = 'en' }) {
  
  // --- AUDIO LOGIC ---
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState(null) // State untuk error
  const soundRef = useRef(null)

  useEffect(() => {
    // Setup Audio Player
    soundRef.current = new Howl({
      src: ['/song.mp3'], // Pastikan file ini ada di folder public
      html5: true,
      volume: 0.5,
      onend: () => setIsPlaying(false),
      onloaderror: (id, err) => {
        console.error("Audio Error:", err)
        setError("File song.mp3 tidak ditemukan!")
      },
      onplayerror: (id, err) => {
        soundRef.current.once('unlock', () => {
          soundRef.current.play();
        });
      }
    })

    return () => {
      if (soundRef.current) soundRef.current.unload()
    }
  }, [])

  const togglePlay = () => {
    if (!soundRef.current) return
    
    if (isPlaying) {
      soundRef.current.pause()
    } else {
      soundRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  // --- KONTEN TEKS ---
  const t = {
    title: lang === 'en' ? "Editorial Profile" : "Profil Editorial",
    role: "Creative Technologist / IT Student",
    bio: lang === 'en' 
      ? "I am an IT student at Binus University with a passion for bridging the gap between logic and aesthetics. While my background is in strict programming (C++, Java, IoT), my heart lies in creative coding and interactive web experiences."
      : "Saya adalah mahasiswa IT di Universitas Binus dengan hasrat menjembatani logika dan estetika. Meskipun latar belakang saya adalah pemrograman murni (C++, Java, IoT), hati saya ada pada creative coding dan pengalaman web interaktif.",
    skills: ["Next.js & React", "IoT Logic (Arduino)", "Cisco Networking", "UI/UX Design", "Unity Game Dev"],
    edu: "Binus University (2024 - Present)"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8">
      
      {/* KIRI: FOTO & AUDIO */}
      <div className="md:col-span-5 space-y-8">
        <motion.div 
          initial={{ rotate: -2 }}
          whileHover={{ rotate: 0 }}
          className="relative h-[400px] border-[6px] border-white shadow-xl bg-gray-200"
        >
          {/* Pastikan foto ada di public/images/PP1 (4).jpeg */}
          <Image src="/images/PP1 (4).jpeg" alt="Me" fill className="object-cover" />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/30 backdrop-blur-sm rotate-2 shadow-sm"></div>
        </motion.div>

        {/* --- AUDIO PLAYER --- */}
        <div className="border-4 double border-black p-4 bg-[#eae8e0] relative overflow-hidden shadow-lg">
           <div className="flex items-center gap-4 relative z-10">
              
              <button 
                onClick={togglePlay} 
                className={`relative group ${error ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!!error}
              >
                 <motion.div 
                   animate={{ rotate: isPlaying ? 360 : 0 }}
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                   className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${error ? 'bg-red-200 border-red-500' : 'bg-black border-gray-600'}`}
                 >
                    {error ? <AlertCircle className="text-red-600" /> : <Disc className="text-gray-400" size={30} />}
                 </motion.div>
                 
                 {!error && (
                   <div className="absolute inset-0 flex items-center justify-center text-white">
                      {isPlaying ? <Pause size={20} fill="white"/> : <Play size={20} fill="white" className="ml-1"/>}
                   </div>
                 )}
              </button>

              <div>
                <div className="text-[0.6rem] font-sans font-black uppercase tracking-widest text-accent">
                  {error ? "ERROR DETECTED" : "Now Spinning"}
                </div>
                <div className="font-headline font-bold text-sm leading-tight">
                  {error ? error : "The Entire World Seems to Be Asking..."}
                </div>
                <div className="text-xs font-sans italic text-gray-600">
                  {error ? "Cek folder public" : "Sleep Party People"}
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* KANAN: TEXT PROFILE */}
      <div className="md:col-span-7">
        <h2 className="font-masthead text-6xl mb-2">{t.title}</h2>
        <h3 className="font-sans font-black uppercase text-sm tracking-widest border-b-2 border-black pb-4 mb-6">{t.role}</h3>
        
        <p className="font-body text-xl leading-relaxed mb-8 first-letter:text-5xl first-letter:font-masthead first-letter:float-left first-letter:mr-2">
          {t.bio}
        </p>

        <div className="grid grid-cols-2 gap-8">
           <div>
             <h4 className="font-sans font-bold uppercase text-xs border-b border-gray-400 mb-3">Skills Inventory</h4>
             <ul className="list-disc pl-4 font-body text-sm space-y-1">
               {t.skills.map(s => <li key={s}>{s}</li>)}
             </ul>
           </div>
           <div>
             <h4 className="font-sans font-bold uppercase text-xs border-b border-gray-400 mb-3">Education</h4>
             <p className="font-body text-sm font-bold">{t.edu}</p>
             <p className="font-body text-xs italic text-gray-600 mt-1">Computer Science</p>
           </div>
        </div>
      </div>

    </div>
  )
}