import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import SiblingA from '../characters/SiblingA'
import SiblingB from '../characters/SiblingB'

export default function DistanceInteraction() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const x = useMotionValue(0)
  const [dragProgress, setDragProgress] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    return x.onChange((latest) => {
      if (containerWidth === 0) return
      setDragProgress(Math.min(Math.max(latest / (containerWidth - 100), 0), 1))
    })
  }, [x, containerWidth])

  // Map progress to visual states
  const scale = useTransform(x, [0, containerWidth - 100], [1, 0.4])
  
  // Background gradient transitioning from home (day) -> train (dusk) -> city (night)
  const bgGradient = useTransform(
    x,
    [0, (containerWidth - 100) * 0.5, containerWidth - 100],
    [
      "linear-gradient(to bottom, #fdfbf7, #fdfbf7)", 
      "linear-gradient(to bottom, #fb923c, #f472b6)", 
      "linear-gradient(to bottom, #1e1b4b, #312e81)"
    ]
  )

  const textColor = dragProgress > 0.6 ? 'text-white' : 'text-warm-brown'

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-[120vh] w-full overflow-hidden flex flex-col items-center justify-center py-20"
      style={{ background: bgGradient }}
    >
      
      {/* Dynamic Expanding Environment */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-end overflow-hidden">
        
        {/* The Home (Left Side - Day) */}
        <motion.div 
          className="absolute left-10 bottom-[10%] w-48 h-48 bg-white/40 border-t-8 border-l-8 border-white/60 rounded-tl-3xl shadow-xl flex flex-col justify-end p-4"
          style={{ scale, transformOrigin: 'bottom left', opacity: useTransform(x, [0, (containerWidth - 100) * 0.5], [1, 0.2]) }}
        >
          <div className="w-16 h-20 bg-amber-900/20 absolute top-8 left-8 rounded-t-full border-4 border-white/50"></div>
          <div className="w-8 h-12 bg-white/50 rounded-sm"></div>
        </motion.div>

        {/* The Distance (Train / Trees / Road - Dusk) */}
        <motion.div 
          className="absolute left-1/3 bottom-[10%] flex items-end"
          style={{ opacity: useTransform(x, [0, (containerWidth - 100) * 0.2, (containerWidth - 100) * 0.8, containerWidth - 100], [0, 1, 1, 0]) }}
        >
          {/* Train */}
          <div className="w-40 h-16 bg-gray-800/60 rounded-t-lg flex gap-2 p-2 items-center">
            <div className="w-6 h-8 bg-yellow-200/40 rounded-sm"></div>
            <div className="w-6 h-8 bg-yellow-200/40 rounded-sm"></div>
            <div className="w-6 h-8 bg-yellow-200/40 rounded-sm"></div>
          </div>
          <div className="w-16 h-12 bg-gray-700/60 rounded-tr-3xl ml-2"></div>
        </motion.div>
        
        {/* Road line */}
        <motion.div 
          className="absolute left-0 bottom-[5%] w-full h-1 border-t-2 border-dashed border-white/20"
          style={{ opacity: dragProgress }}
        />

        {/* The Distant City (Right Side - Night) */}
        <motion.div 
          className="absolute right-10 bottom-[10%] flex gap-2 items-end"
          style={{ scale, transformOrigin: 'bottom right', opacity: dragProgress }}
        >
          <div className="w-16 h-48 bg-[#1e293b] rounded-t-lg shadow-2xl relative overflow-hidden border-t-2 border-l-2 border-white/10">
            <div className="absolute top-4 left-4 w-3 h-3 bg-yellow-300/80 shadow-[0_0_10px_#fde047]"></div>
            <div className="absolute top-12 left-8 w-3 h-3 bg-yellow-300/80 shadow-[0_0_10px_#fde047]"></div>
            <div className="absolute top-24 left-4 w-3 h-3 bg-yellow-300/80 shadow-[0_0_10px_#fde047]"></div>
          </div>
          <div className="w-20 h-64 bg-[#0f172a] rounded-t-lg shadow-2xl relative overflow-hidden border-t-2 border-r-2 border-white/10">
            <div className="absolute top-10 right-4 w-4 h-4 bg-white/80 shadow-[0_0_15px_#fff]"></div>
            <div className="absolute top-32 right-8 w-4 h-4 bg-white/80 shadow-[0_0_15px_#fff]"></div>
          </div>
          <div className="w-12 h-32 bg-[#334155] rounded-t-lg shadow-2xl relative border-t-2 border-r-2 border-white/10">
            <div className="absolute top-8 left-4 w-2 h-2 bg-yellow-300/60"></div>
          </div>
        </motion.div>

      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 h-[60vh] flex flex-col justify-center">
        
        {/* Text */}
        <div className={`absolute top-0 w-full text-center font-bengali ${textColor} transition-colors duration-500`}>
          <motion.h3 
            className="text-4xl md:text-5xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: dragProgress > 0.8 ? 1 : 0, y: dragProgress > 0.8 ? 0 : -20 }}
            transition={{ duration: 0.5 }}
          >
            {t('দূরত্ব বাড়ে।', 'Distance grows.')}
          </motion.h3>
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-crimson drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: dragProgress >= 0.95 ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.5 }} // Pause before revealing "Not the bond"
          >
            {t('সম্পর্ক নয়। ❤️', 'Not the bond. ❤️')}
          </motion.h2>
        </div>

        {/* The physical distance interaction */}
        <div className="relative w-full h-[200px] flex items-end border-b-2 border-white/10 pb-4 mt-20">
          
          {/* Static Sibling A */}
          <motion.div style={{ scale, transformOrigin: 'bottom left' }} className="relative z-20 w-16 md:w-24">
            <SiblingA state={dragProgress > 0.95 ? 'wave' : 'idle'} facing="right" />
          </motion.div>

          {/* Stretchy Thread */}
          <div className="absolute bottom-8 left-16 right-0 h-1 z-10">
            <motion.div 
              className="h-full bg-gradient-to-r from-crimson to-saffron rounded-full origin-left"
              style={{ width: x, opacity: useTransform(x, [0, containerWidth - 100], [1, 0.5]) }}
            />
          </div>

          {/* Draggable Sibling B */}
          <motion.div
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0}
            dragMomentum={false}
            style={{ x, scale, transformOrigin: 'bottom right' }}
            className="absolute bottom-4 z-20 cursor-grab active:cursor-grabbing left-16 touch-none"
          >
            <div className="relative w-16 md:w-24">
              <SiblingB state={dragProgress > 0.95 ? 'wave' : 'walk'} facing="left" />
            </div>
            {dragProgress < 0.1 && (
              <div className="absolute -bottom-8 left-0 w-full text-center text-xs font-bold text-warm-brown/50 uppercase tracking-widest pointer-events-none">
                {t('Drag', 'Drag')} →
              </div>
            )}
          </motion.div>

        </div>

      </div>
    </motion.section>
  )
}
