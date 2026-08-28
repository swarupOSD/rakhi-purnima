import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

export default function NightSky() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(0)
  
  // y will go from 0 (bottom) to containerHeight (top)
  const y = useMotionValue(0)
  const [dragProgress, setDragProgress] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight)
      // Set initial y to bottom
      y.set(containerRef.current.offsetHeight - 200)
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [y])

  useEffect(() => {
    return y.onChange((latest) => {
      if (containerHeight === 0) return
      // Inverse logic: smaller y means dragged higher up
      const progress = 1 - Math.min(Math.max(latest / (containerHeight - 200), 0), 1)
      setDragProgress(progress)
    })
  }, [y, containerHeight])

  // Map drag progress to background colors (Sunset -> Midnight Blue)
  const backgroundColor = useTransform(
    y,
    [containerHeight - 200, (containerHeight - 200) * 0.75, (containerHeight - 200) * 0.5, (containerHeight - 200) * 0.25, 0],
    ["#fb923c", "#f472b6", "#a855f7", "#4338ca", "#0f172a"]
  )

  // Map drag progress to star opacity
  const starOpacity = useTransform(y, [(containerHeight - 200) * 0.5, 0], [0, 1])
  
  // Constellation lines opacity
  const lineOpacity = useTransform(y, [(containerHeight - 200) * 0.2, 0], [0, 1])

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-[150vh] w-full flex flex-col items-center overflow-hidden"
      style={{ backgroundColor }}
    >
      
      {/* The Stars Background */}
      <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: starOpacity }}>
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`
            }}
          />
        ))}
      </motion.div>

      {/* The Constellation Area */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] z-10 pointer-events-none">
        
        {/* Constellation Nodes (Rakhi shape) */}
        <motion.div style={{ opacity: lineOpacity }} className="relative w-full h-full">
          
          <AnimatePresence>
            {dragProgress > 0.9 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                {/* The Golden Rakhi Reveal */}
                <div className="absolute w-[200px] h-[4px] bg-gradient-to-r from-crimson via-saffron to-crimson shadow-warm-glow"></div>
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full border-4 border-white shadow-[0_0_40px_#f59e0b] flex items-center justify-center">
                  <div className="w-10 h-10 bg-crimson rounded-full flex items-center justify-center shadow-inner">
                    <span className="text-white text-xl">⭐</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SVG Lines */}
          <motion.svg 
            className="absolute inset-0 w-full h-full" 
            viewBox="0 0 300 300"
            animate={{ opacity: dragProgress > 0.9 ? 0 : 1 }}
          >
            <line x1="50" y1="150" x2="100" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4" />
            <line x1="100" y1="150" x2="150" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4" />
            <line x1="100" y1="150" x2="150" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4" />
            <line x1="150" y1="100" x2="200" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4" />
            <line x1="150" y1="200" x2="200" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4" />
            <line x1="200" y1="150" x2="250" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4" />
            <circle cx="150" cy="150" r="30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4" />
          </motion.svg>
          
          {/* Nodes */}
          <motion.div animate={{ opacity: dragProgress > 0.9 ? 0 : 1 }}>
            <div className="absolute top-[148px] left-[48px] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#fff]"></div>
            <div className="absolute top-[148px] left-[98px] w-2 h-2 bg-saffron rounded-full shadow-[0_0_10px_#f59e0b]"></div>
            <div className="absolute top-[98px] left-[148px] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#fff]"></div>
            <div className="absolute top-[198px] left-[148px] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#fff]"></div>
            <div className="absolute top-[148px] left-[198px] w-2 h-2 bg-saffron rounded-full shadow-[0_0_10px_#f59e0b]"></div>
            <div className="absolute top-[148px] left-[248px] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#fff]"></div>
            <div className="absolute top-[145px] left-[145px] w-3 h-3 bg-crimson rounded-full shadow-[0_0_15px_#e03c31] animate-pulse"></div>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 h-full flex flex-col items-center">
        
        {/* Text */}
        <div className="absolute top-20 text-center w-full">
          <AnimatePresence>
            {dragProgress > 0.8 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white drop-shadow-md"
              >
                <h3 className="font-bengali text-3xl md:text-4xl font-medium mb-2">
                  {t('আকাশ যত বড়ই হোক…', 'No matter how big the sky...')}
                </h3>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="font-bengali text-4xl md:text-5xl text-saffron font-bold"
                >
                  {t('সুতোটা ঠিকই পথ খুঁজে নেয়।', 'The thread finds its way.')}
                </motion.h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Draggable Thread Node */}
        <motion.div
          drag="y"
          dragConstraints={containerRef}
          dragElastic={0}
          dragMomentum={false}
          style={{ y }}
          className="absolute left-1/2 -translate-x-1/2 w-24 h-24 flex flex-col items-center justify-start cursor-grab active:cursor-grabbing z-30 group touch-none"
        >
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full border-2 border-saffron flex items-center justify-center shadow-[0_0_15px_#f59e0b]">
            <div className="w-3 h-3 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full animate-pulse"></div>
          </div>
          {/* Thread trailing downwards */}
          <div className="w-[2px] h-[100vh] bg-gradient-to-b from-saffron to-transparent"></div>
          
          {dragProgress < 0.1 && (
            <div className="absolute top-10 whitespace-nowrap text-xs font-bold text-white/50 uppercase tracking-widest pointer-events-none">
              ↑ {t('Pull Up', 'Pull Up')}
            </div>
          )}
        </motion.div>

      </div>
    </motion.section>
  )
}
