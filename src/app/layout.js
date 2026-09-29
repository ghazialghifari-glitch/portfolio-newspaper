'use client'
import { useState } from 'react'
import { Playfair_Display, UnifrakturMaguntia, Frank_Ruhl_Libre, Lato } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Globe } from 'lucide-react'
import './globals.css'
import MagnifyingGlass from '@/components/MagnifyingGlass' // IMPORT KOMPONEN BARU

// Setup Font
const unifraktur = UnifrakturMaguntia({ weight: '400', subsets: ['latin'], variable: '--font-unifraktur' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const frank = Frank_Ruhl_Libre({ subsets: ['latin'], variable: '--font-frank' })
const lato = Lato({ weight: ['400', '700', '900'], subsets: ['latin'], variable: '--font-lato' })

export default function RootLayout({ children }) {
  const [lang, setLang] = useState('en')
  const pathname = usePathname()

  const content = {
    en: {
      date: "Tuesday, February 3, 2026",
      edition: "VOL. IV — NO. 1",
      nav: [
        { name: "Front Page", path: "/" },
        { name: "Works", path: "/works" },
        { name: "Profile", path: "/profile" },
        { name: "Classifieds", path: "/contact" }
      ],
      weather: "Bandung: Rainy, 24°C",
      status: "STATUS: AVAILABLE",
      footer: "© 2026 The Creative Chronicle. Built with Next.js."
    },
    id: {
      date: "Selasa, 3 Februari 2026",
      edition: "EDISI VOL. IV — NO. 1",
      nav: [
        { name: "Halaman Depan", path: "/" },
        { name: "Karya", path: "/works" },
        { name: "Profil", path: "/profile" },
        { name: "Kontak", path: "/contact" }
      ],
      weather: "Bandung: Hujan, 24°C",
      status: "STATUS: TERSEDIA",
      footer: "© 2026 The Creative Chronicle. Dibuat dengan Next.js."
    }
  }
  
  const t = content[lang]

  return (
    <html lang={lang}>
      <body className={`${unifraktur.variable} ${playfair.variable} ${frank.variable} ${lato.variable} font-body min-h-screen flex flex-col max-w-[1400px] mx-auto border-x border-gray-300 shadow-2xl bg-paper text-ink`}>
        
        {/* TEMPEL KACA PEMBESAR DI SINI */}
        <MagnifyingGlass />

        <header className="p-4 md:p-8 text-center relative z-20 bg-paper">
          <div className="flex justify-between items-center text-[0.65rem] font-sans font-black tracking-widest border-b-2 border-black pb-2 mb-4 uppercase">
             <div className="flex gap-4">
                <span>{t.weather}</span>
                <span className="hidden md:inline text-accent">{t.status}</span>
             </div>
             <button 
               onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
               className="flex items-center gap-2 hover:text-accent transition-colors"
             >
               <Globe size={14} />
               {lang === 'en' ? 'ID' : 'EN'}
             </button>
          </div>

          <Link href="/">
            <h1 className="font-masthead text-6xl md:text-9xl leading-none mb-2 hover:scale-105 transition-transform duration-500 cursor-pointer">
              The Creative Chronicle
            </h1>
          </Link>

          <div className="border-t-4 double border-black border-b border-black py-2 flex justify-between items-center font-sans text-xs font-bold uppercase tracking-widest mt-4">
            <span>{t.edition}</span>
            <span>{t.date}</span>
            <span>Est. 2024</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 md:gap-12 mt-4 border-b border-black pb-4">
            {t.nav.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={`font-sans font-black text-sm uppercase tracking-wider hover:text-accent hover:underline decoration-2 underline-offset-4 transition-all ${pathname === item.path ? 'text-accent underline' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </header>

        <main className="flex-grow relative p-4 md:p-8">
           {children.props 
              ? React.cloneElement(children, { lang: lang }) 
              : <PageWrapper lang={lang}>{children}</PageWrapper>
            }
        </main>

        <footer className="border-t-4 border-black p-8 text-center font-sans text-xs font-bold bg-[#1a1a1a] text-[#F4F1EA]">
          <p>{t.footer}</p>
        </footer>
      </body>
    </html>
  )
}

import React from 'react'
function PageWrapper({ children, lang }) {
  return React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { lang });
    }
    return child;
  });
}