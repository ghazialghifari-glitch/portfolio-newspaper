'use client'

export default function Contact({ lang = 'en' }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
       <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="font-masthead text-5xl mb-4">
             {lang === 'en' ? 'Classifieds' : 'Iklan Baris'}
          </h2>
          <p className="font-body italic text-gray-600 mb-8">
             {lang === 'en' 
                ? "Looking for a developer who cares about details? Contact me via the channels below." 
                : "Mencari pengembang yang peduli pada detail? Hubungi saya melalui saluran di bawah ini."}
          </p>
          
          <div className="space-y-4 font-sans font-black uppercase tracking-widest text-sm">
             <a href="mailto:ghazi.al-ghifari@binus.ac.id" className="block border-2 border-black p-3 hover:bg-black hover:text-white transition-all">
                Email: ghazi.al-ghifari@binus.ac.id
             </a>
             <a href="https://www.linkedin.com/in/ghazial-ghifari/" target="_blank" className="block border-2 border-black p-3 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all">
                LinkedIn Profile
             </a>
             <a href="https://github.com" target="_blank" className="block border-2 border-black p-3 hover:bg-[#333] hover:text-white hover:border-[#333] transition-all">
                GitHub Repository
             </a>
          </div>
       </div>
    </div>
  )
}