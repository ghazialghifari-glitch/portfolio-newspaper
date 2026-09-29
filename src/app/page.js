'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Code, Eraser, EyeOff, Download, FileText } from 'lucide-react'

// --- 1. PRELOADER ---
const Preloader = () => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] bg-[#111] flex items-center justify-center text-[#F4F1EA]"
    >
      <div className="text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-sans text-xs font-bold uppercase tracking-[0.5em] mb-4">Volume IV</motion.p>
        <motion.h1 initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }} className="font-masthead text-6xl md:text-9xl">Printing...</motion.h1>
        <div className="w-64 h-1 bg-gray-800 mx-auto mt-8 overflow-hidden rounded-full">
          <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.5, ease: "easeInOut" }} className="h-full bg-[#F4F1EA]" />
        </div>
      </div>
    </motion.div>
  )
}

// --- 2. PAPER TEXTURE ---
const PaperTexture = () => (
  <div className="fixed inset-0 pointer-events-none z-[50] opacity-10 mix-blend-multiply"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  />
)

// --- 3. REDACTION PEN ---
const RedactionPen = () => {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctx.lineCap = 'square'
      ctx.lineJoin = 'bevel'
      ctx.strokeStyle = '#111111'
      ctx.lineWidth = 24
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  const startDrawing = ({ nativeEvent }) => {
    if(!isActive) return
    const { offsetX, offsetY } = nativeEvent
    const ctx = canvasRef.current.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || !isActive) return
    const { offsetX, offsetY } = nativeEvent
    const ctx = canvasRef.current.getContext('2d')
    ctx.lineTo(offsetX, offsetY)
    ctx.stroke()
  }

  const stopDrawing = () => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.closePath()
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <>
      <canvas ref={canvasRef} className={`fixed inset-0 z-[40] ${isActive ? 'cursor-text pointer-events-auto' : 'pointer-events-none'}`} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} />
      <div className="fixed bottom-8 right-8 z-[60] flex gap-2">
         <button onClick={() => { setIsActive(!isActive); }} className={`p-3 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform font-bold text-xs uppercase flex items-center gap-2 border-2 border-black ${isActive ? 'bg-black text-white' : 'bg-white text-black'}`}>
           <EyeOff size={16} /> {isActive ? 'SENSORING...' : 'REDACT'}
         </button>
         {isActive && (
            <button onClick={clearCanvas} className="bg-red-600 text-white p-3 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform border-2 border-black">
              <Eraser size={16} />
            </button>
         )}
      </div>
    </>
  )
}

// --- 4. APPROVAL STAMP ---
const ApprovalStamp = () => {
  const [stamped, setStamped] = useState(false)
  const handleStamp = () => {
    if (!stamped) {
      if (navigator.vibrate) navigator.vibrate(200);
      setStamped(true)
    }
  }
  return (
    <div className="relative text-center p-2">
      <button onClick={handleStamp} className={`w-full font-sans text-[0.6rem] font-bold uppercase border-2 border-dashed border-gray-400 px-2 py-4 hover:bg-gray-100 transition-colors text-gray-500 ${stamped ? 'opacity-0' : 'opacity-100'}`}>
        [ Click to Stamp Approval ]
      </button>
      {stamped && (
        <motion.div initial={{ scale: 2, opacity: 0, rotate: -20 }} animate={{ scale: 1, opacity: 1, rotate: -12 }} transition={{ type: "spring", stiffness: 300, damping: 15 }} className="absolute top-0 left-1/2 -translate-x-1/2 border-4 border-red-700 text-red-700 px-4 py-1 z-20 pointer-events-none mix-blend-multiply bg-red-100/50 backdrop-blur-[1px]">
          <h2 className="font-headline text-2xl font-black uppercase tracking-widest leading-none">HIRED</h2>
          <p className="font-sans text-[0.5rem] font-bold uppercase text-center border-t border-red-700 mt-1 pt-1">Verified</p>
        </motion.div>
      )}
    </div>
  )
}

// --- 5. DRAGGABLE WIDGET WRAPPER ---
const DraggableWidget = ({ children, className }) => (
  <motion.div drag dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }} whileDrag={{ scale: 1.1, rotate: 2, zIndex: 50, boxShadow: "10px 10px 0px rgba(0,0,0,0.2)" }} className={`cursor-grab active:cursor-grabbing bg-white relative z-10 ${className}`}>
    {children}
  </motion.div>
)

// --- 6. OFFICIAL RESUME (PERBAIKAN OVERLAP) ---
const OfficialResume = () => (
  <a href="/CV_Nama_Kamu.pdf" target="_blank" rel="noopener noreferrer" className="block border-4 border-black p-4 text-left hover:bg-[#111] hover:text-[#F4F1EA] transition-all cursor-pointer group bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
    <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-3 group-hover:border-[#F4F1EA]">
      <span className="font-sans font-black uppercase text-[0.6rem] tracking-widest text-gray-500 group-hover:text-gray-300">Official Document</span>
      <FileText size={14} />
    </div>
    {/* Ukuran font diperkecil (text-2xl) agar tidak overlap ke samping */}
    <h3 className="font-headline text-1xl font-bold leading-tight mb-3 group-hover:text-white">Curriculum<br/>Vitae</h3>
    <div className="font-sans text-[0.6rem] uppercase flex items-center justify-between pt-1">
       <span className="bg-green-100 text-green-800 px-1.5 py-0.5 font-bold group-hover:bg-green-800 group-hover:text-green-100 border border-green-800">Status: Cleared</span>
       <span className="flex items-center gap-1 font-bold"><Download size={12}/> PDF</span>
    </div>
  </a>
)

// --- 7. CONTACT DIRECTORY (PENGGANTI KUPON GUNTING) ---
const ContactDirectory = () => (
  <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
    <h4 className="font-sans font-black uppercase text-[0.65rem] tracking-widest border-b-2 border-black pb-2 mb-3">Direct Line</h4>
    <ul className="space-y-3 font-mono text-xs font-bold">
      <li>
        <a href="mailto:emailmu@binus.ac.id" className="flex justify-between items-center hover:text-accent group">
          <span>EMAIL</span> <span className="opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
        </a>
      </li>
      <li className="border-t border-dashed border-gray-300 pt-2">
        <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center hover:text-accent group">
          <span>LINKEDIN</span> <span className="opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
        </a>
      </li>
      <li className="border-t border-dashed border-gray-300 pt-2">
        <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center hover:text-accent group">
          <span>GITHUB</span> <span className="opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
        </a>
      </li>
    </ul>
  </div>
)

// --- 8. HORIZONTAL SCROLL ---
const HorizontalScrollSection = () => {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: targetRef })
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"])

  const projects = [
    { title: "Network Security", cat: "Cisco / OSPF", img: "/images/Cisco.png", id: "01" },
    { title: "EcoHealth App", cat: "Mobile Dev", img: "/images/GreenApp.png", id: "02" },
    { title: "Vindes Merch", cat: "UI/UX Design", img: "/images/Vindes.png", id: "03" },
    { title: "IoT Sensors", cat: "Hardware", img: "/images/Cisco.png", id: "04" },
  ]

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#111] text-[#F4F1EA]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-16 pl-16 md:pl-32">
          <div className="flex flex-col justify-center min-w-[400px]">
            <h2 className="font-masthead text-8xl mb-4">Selected <br/> Works</h2>
            <p className="font-sans text-xs uppercase tracking-widest opacity-70">
              Scroll Down to Explore &rarr;
            </p>
          </div>
          {projects.map((project, i) => (
            <div key={i} className="group relative h-[50vh] w-[40vh] md:w-[60vh] flex-shrink-0 border-2 border-[#333] hover:border-[#F4F1EA] transition-colors bg-[#222]">
              <Image src={project.img} alt={project.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 p-6 bg-black/80 w-full backdrop-blur-sm">
                <span className="font-sans text-[0.6rem] font-bold uppercase text-accent mb-1 block">{project.id} // {project.cat}</span>
                <h3 className="font-headline text-3xl font-bold">{project.title}</h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// --- 9. REVEAL ANIMATION ---
const Reveal = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.5, delay, ease: "easeOut" }}>
    {children}
  </motion.div>
)

// --- HALAMAN UTAMA ---
export default function Home({ lang = 'en' }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <main className="relative min-h-screen">
      <Preloader />
      <PaperTexture />
      <RedactionPen />
      <motion.div className="fixed top-0 left-0 right-0 h-2 bg-accent z-[60] origin-left" style={{ scaleX }} />

      {/* ================= HERO GRID SECTION ================= */}
      <section className="relative pt-4 pb-8 px-4 md:px-8 max-w-[1400px] mx-auto z-10">
         
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 border-b-4 double border-black pb-8">
            
            {/* --- SIDEBAR KIRI --- */}
            <aside className="lg:col-span-2 hidden lg:flex flex-col gap-6 sticky top-24 h-fit border-r border-gray-400 pr-4">
              <Reveal delay={0.1}><OfficialResume /></Reveal>
              <Reveal delay={0.2}><ContactDirectory /></Reveal>
            </aside>

            {/* --- TENGAH --- */}
            <section className="lg:col-span-7 flex flex-col">
               <Reveal delay={0.1}>
                  <div className="flex items-center gap-2 mb-3">
                     <span className="bg-accent text-white px-2 py-0.5 text-[0.6rem] font-sans font-bold uppercase tracking-widest">Available For Internship</span>
                     <span className="text-[0.6rem] font-sans font-bold uppercase text-gray-500">Binus University • 5th Semester</span>
                  </div>
                  <h1 className="font-headline text-6xl md:text-[5.5rem] font-black leading-[0.85] mb-6 hover:text-accent transition-colors cursor-pointer tracking-tight text-justify">
                    LOGIC MEETS <span className="italic font-serif font-light text-gray-500">AESTHETICS.</span>
                  </h1>
               </Reveal>

               <Reveal delay={0.2}>
                  <div className="flex flex-col md:flex-row gap-6 mb-8 items-stretch">
                     <div className="relative w-full md:w-[60%] h-[350px] border-4 border-black group overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Image src="/images/PP1 (3).jpeg" alt="Profile" fill priority={true} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                     </div>
                     <div className="w-full md:w-[40%] flex flex-col justify-center font-sans text-sm leading-relaxed text-gray-800 border-t md:border-t-0 md:border-l border-gray-400 pt-4 md:pt-0 md:pl-6 text-justify">
                        <strong className="block text-black text-xl mb-3 border-b-2 border-black pb-2">Elevator Pitch</strong>
                        I am a Computer Science student specializing in <strong>Frontend Development & UI/UX</strong>. 
                        <br/><br/>
                        Currently seeking a software engineering internship to bridge the gap between robust engineering and tangible aesthetics. Proven track record in building interactive web apps using modern frameworks.
                     </div>
                  </div>
               </Reveal>

               <div className="columns-1 md:columns-2 gap-8 font-body text-[0.95rem] leading-relaxed text-justify mb-10">
                  <Reveal delay={0.3}>
                     <p className="first-letter:text-6xl first-letter:float-left first-letter:font-masthead first-letter:mr-2 first-letter:mt-[-8px]">
                        In a world saturated with sleek, soulless templates, my goal is to build digital experiences that breathe. This portfolio is a rebellion against flat design—built with clean, scalable code.
                     </p>
                     <p className="mt-4">
                        Using <strong>Next.js</strong> as the engine and <strong>Tailwind CSS</strong> as the paint, I transform complex backend logic and raw data into intuitive, engaging, and pixel-perfect user interfaces.
                     </p>
                  </Reveal>
               </div>

               <Reveal delay={0.4}>
                 <div className="border-t-4 border-black pt-4 mt-auto bg-gray-50 p-4">
                   <h3 className="font-sans font-black uppercase text-sm border-b-2 border-black pb-2 mb-4 flex justify-between items-end">
                     Top Featured Projects <Link href="/works" className="text-[0.6rem] text-gray-500 hover:text-accent">VIEW ALL &rarr;</Link>
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-body text-xs text-justify divide-y md:divide-y-0 md:divide-x border-gray-300">
                      <article className="md:pr-4 pt-4 md:pt-0">
                        <span className="bg-black text-white px-1.5 py-0.5 text-[0.5rem] uppercase font-sans font-bold">IoT / C++</span>
                        <h4 className="font-headline font-bold text-lg leading-tight my-2">Nicotine Detection System</h4>
                        <p className="text-gray-700 mb-3">Real-time hardware integration translating raw sensor data into readable dashboards.</p>
                        <Link href="/works" className="font-sans font-bold uppercase text-[0.6rem] border-b border-black hover:text-accent">View Case Study &rarr;</Link>
                      </article>
                      <article className="md:px-4 pt-4 md:pt-0">
                        <span className="bg-black text-white px-1.5 py-0.5 text-[0.5rem] uppercase font-sans font-bold">React Native</span>
                        <h4 className="font-headline font-bold text-lg leading-tight my-2">Psycho-Diagnostics App</h4>
                        <p className="text-gray-700 mb-3">A heuristic mobile app designed to educate and prevent dangerous youth self-diagnosis.</p>
                        <Link href="/works" className="font-sans font-bold uppercase text-[0.6rem] border-b border-black hover:text-accent">View Case Study &rarr;</Link>
                      </article>
                      <article className="md:pl-4 pt-4 md:pt-0">
                        <span className="bg-black text-white px-1.5 py-0.5 text-[0.5rem] uppercase font-sans font-bold">UX Research</span>
                        <h4 className="font-headline font-bold text-lg leading-tight my-2">Heuristic Redesign</h4>
                        <p className="text-gray-700 mb-3">Comprehensive study optimizing mobile reservation journeys to reduce user friction.</p>
                        <Link href="/works" className="font-sans font-bold uppercase text-[0.6rem] border-b border-black hover:text-accent">View Case Study &rarr;</Link>
                      </article>
                   </div>
                 </div>
               </Reveal>
            </section>

            {/* --- SIDEBAR KANAN --- */}
            <aside className="lg:col-span-3 space-y-6 pl-0 md:pl-4 border-t md:border-t-0 md:border-l border-gray-400 sticky top-24 h-fit pt-6 md:pt-0">
               <Reveal delay={0.2}>
                  <DraggableWidget className="border-4 double border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] bg-[#F4F1EA]">
                     <div className="absolute -top-3 -right-3 bg-red-600 text-white px-2 py-1 font-sans font-bold text-[0.6rem] uppercase rotate-6 animate-pulse">Official</div>
                     <h4 className="font-sans font-black uppercase text-sm border-b-2 border-black pb-2 mb-3">Editor's Approval</h4>
                     <p className="font-body text-xs mb-4 text-justify italic text-gray-700">
                       Has this candidate met the rigorous standards of modern web development? Stamp to verify authenticity.
                     </p>
                     <ApprovalStamp />
                  </DraggableWidget>
               </Reveal>

               <Reveal delay={0.3}>
                  <DraggableWidget className="border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                     <h4 className="font-sans font-black uppercase text-sm border-b-2 border-black pb-2 mb-3">Tech Stack Watch</h4>
                     <ul className="space-y-2 font-mono text-xs">
                        <li className="flex justify-between items-center"><span>NEXT.JS / REACT</span> <span className="text-green-600 font-bold">▲ +99%</span></li>
                        <li className="flex justify-between items-center"><span>TAILWIND CSS</span> <span className="text-green-600 font-bold">▲ +95%</span></li>
                        <li className="flex justify-between items-center"><span>UI/UX DESIGN</span> <span className="text-green-600 font-bold">▲ +90%</span></li>
                        <li className="flex justify-between items-center"><span>TYPESCRIPT</span> <span className="text-green-600 font-bold">▲ +85%</span></li>
                        <li className="flex justify-between items-center"><span>C++ / HARDWARE</span> <span className="text-gray-500 font-bold">▬ STABLE</span></li>
                     </ul>
                  </DraggableWidget>
               </Reveal>

               <Reveal delay={0.4}>
                  <div className="grid grid-cols-2 gap-2">
                     {['Frontend', 'Backend', 'IoT', 'Design'].map((item) => (
                        <DraggableWidget key={item} className="border border-black p-3 text-center hover:bg-black hover:text-white transition-colors cursor-crosshair">
                           <Code size={16} className="mx-auto mb-1"/>
                           <span className="font-sans font-bold text-[0.6rem] uppercase">{item}</span>
                        </DraggableWidget>
                     ))}
                  </div>
               </Reveal>
            </aside>
         </div>
      </section>

      {/* ================= SECTION 2: THE OP-ED (LEBIH PADAT) ================= */}
      <section className="relative px-4 md:px-8 max-w-[1400px] mx-auto z-10 pb-12 mt-12">
         <Reveal delay={0.1}>
            <div className="border-b-4 border-black pb-4 mb-8">
               <h2 className="font-masthead text-5xl md:text-7xl">The Editor's Desk</h2>
               <p className="font-sans text-xs font-bold uppercase tracking-widest text-gray-600">Opinion, Analysis, & Philosophy</p>
            </div>
         </Reveal>
         
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside className="md:col-span-1 border-b md:border-b-0 md:border-r border-gray-400 md:pr-8 pb-6 md:pb-0">
               <Reveal delay={0.2}>
                  <div className="w-full aspect-[3/4] bg-gray-300 relative mb-4 border-2 border-black overflow-hidden group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                     <Image src="/images/PP1 (4).jpeg" fill alt="Author" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <h4 className="font-headline font-bold text-2xl leading-none mb-2 mt-4">By The Creator</h4>
                  <p className="font-sans text-xs text-gray-600 italic border-b-2 border-black pb-2 mb-3">Lead Developer / Student</p>
                  <p className="font-body text-sm text-justify">
                    A 5th-semester Computer Science student at Binus University. Exploring the intersection of human psychology and digital interfaces.
                  </p>
               </Reveal>
            </aside>

            {/* Layout Teks Diubah Agar Lebih Dense dan Full */}
            <article className="md:col-span-3 font-body text-[0.95rem] leading-relaxed text-justify">
               <Reveal delay={0.3}>
                  <div className="columns-1 md:columns-2 gap-8 mb-6">
                     <p className="first-letter:text-7xl first-letter:float-left first-letter:font-masthead first-letter:mr-3 first-letter:mt-[-8px]">
                        To write code is easy. To write code that breathes is an entirely different discipline. When I set out to build this digital space, I was tired of the sterile, hospital-like cleanliness of modern web design. We are losing the texture of the web. The Internet used to be a place of quirks, of personal touches, and of slight imperfections that proved a human hand was involved. Today, everything is smoothed out by automated UI libraries. I chose to use <strong>Next.js</strong> not to build a faster sterile box, but to power a complex, messy, and beautiful digital newspaper.
                     </p>
                     <p className="mt-4 md:mt-0">
                        My recent studies in <strong>Research Methodology</strong> have heavily influenced this. Data shows that users do not just want speed; they crave engagement. Whether it is through a custom WebGL shader, or a simple draggable component, the goal is always to make the user stop, play, and remember. Bridging the gap between raw hardware capabilities and fluid user experiences is where true engineering shines.
                     </p>
                  </div>
                  
                  {/* Blockquote diletakkan penuh di bawah teks sebagai pengisi ruang visual */}
                  <blockquote className="border-y-4 border-black py-5 my-6 font-headline text-2xl text-center italic font-bold bg-[#eae8e0] shadow-sm">
                     "We are not just stacking divs. We are curating an experience. Every pixel must justify its existence."
                  </blockquote>
               </Reveal>
            </article>
         </div>
      </section>

      {/* === MARQUEE TEXT === */}
      <div className="bg-accent text-white py-4 overflow-hidden border-y-4 border-black rotate-1 scale-[1.02] z-10 relative shadow-xl mb-12">
        <motion.div animate={{ x: "-50%" }} transition={{ duration: 25, ease: "linear", repeat: Infinity }} className="flex whitespace-nowrap gap-12 font-masthead text-4xl md:text-5xl items-center">
          <span>SEEKING FRONTEND INTERNSHIP OPPORTUNITIES</span> <span className="text-sm">★</span>
          <span>AVAILABLE STARTING NEXT SEMESTER</span> <span className="text-sm">★</span>
          <span>PASSIONATE ABOUT UI/UX AND CLEAN CODE</span> <span className="text-sm">★</span>
          <span>SEEKING FRONTEND INTERNSHIP OPPORTUNITIES</span> <span className="text-sm">★</span>
        </motion.div>
      </div>

      {/* === HORIZONTAL SCROLL SECTION (Selected Works) === */}
      <HorizontalScrollSection />

      {/* === FOOTER === */}
      <footer className="relative bg-[#111] text-[#F4F1EA] py-32 px-4 overflow-hidden border-t-8 border-accent">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] mb-6 text-gray-400">Read the Full Stories in the</p>
          <Link href="/works" className="group inline-block">
            <h2 className="font-headline text-[10vw] leading-none font-black hover:text-accent transition-colors duration-300">
              ARCHIVES
            </h2>
            <div className="h-2 w-0 bg-accent group-hover:w-full transition-all duration-500 ease-out"></div>
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left border-t border-gray-800 pt-12 font-mono text-sm">
             <div>
                <h4 className="text-gray-500 mb-4">Socials</h4>
                <ul className="space-y-2">
                   <li><a href="https://linkedin.com/in/username" target="_blank" className="hover:text-accent">LinkedIn</a></li>
                   <li><a href="https://github.com/username" target="_blank" className="hover:text-accent">GitHub</a></li>
                </ul>
             </div>
             <div>
                <h4 className="text-gray-500 mb-4">Contact</h4>
                <p>emailmu@binus.ac.id</p>
                <p>Bandung, Indonesia</p>
             </div>
             <div className="md:text-right">
                <p className="text-gray-500">© 2026 The Creative Chronicle</p>
                <p>Built with Next.js & Tailwind</p>
             </div>
          </div>
        </div>
      </footer>
    </main>
  )
}