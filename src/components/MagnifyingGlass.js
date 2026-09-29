'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function MagnifyingGlass() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    // Deteksi elemen yang bisa di-klik untuk efek hover cursor
    const handleMouseOver = (e) => {
       if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
         setIsHovering(true)
       } else {
         setIsHovering(false)
       }
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 w-32 h-32 border-2 border-black rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center mix-blend-difference bg-white/10 backdrop-blur-[1px]"
      animate={{
        x: mousePosition.x - 64,
        y: mousePosition.y - 64,
        scale: isHovering ? 1.5 : 1,
        borderColor: isHovering ? '#fff' : '#000' // Inverted color logic due to mix-blend
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {/* Garis silang di tengah lensa (opsional) */}
      <div className="w-1 h-1 bg-black rounded-full opacity-50"/>
    </motion.div>
  )
}