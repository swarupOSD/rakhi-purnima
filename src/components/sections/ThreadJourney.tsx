import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import SiblingA from '../characters/SiblingA'
import SiblingB from '../characters/SiblingB'

export default function ThreadJourney() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const x = useMotionValue(0)
  
  // Interpolate background color based on drag position
  const backgroundColor = useTransform(
    x,
    [0, containerWidth * 0.33, containerWidth * 0.66, containerWidth],
    ["#7dd3fc", "#fcd34d", "#f472b6", "#fb923c"]
  )

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

  const [activeIndex, setActiveIndex] = useState(0)
  
  useEffect(() => {
    return x.onChange((latest) => {
      if (containerWidth === 0) return
      const progress = latest / containerWidth
      let newIndex = Math.round(progress * 3)
      if (newIndex < 0) newIndex = 0
      if (newIndex > 3) newIndex = 3
      setActiveIndex(newIndex)
    })
  }, [x, containerWidth])

  return (
    <motion.section 
      className="relative min-h-[140vh] w-full flex flex-col items-center justify-center overflow-hidden transition-colors duration-300"
      style={{ backgroundColor }}
    >
      
      {/* Dynamic Background Environment */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <AnimatePresence mode="wait">
          {activeIndex === 0 && (
            <motion.div key="bg0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
              <div className="absolute bottom-20 left-10 w-32 h-32 bg-white/20 rounded-t-full border-t-8 border-white/40"></div>
              <div className="absolute bottom-40 right-20 w-16 h-16 bg-white/30 transform rotate-12"></div>
            </motion.div>
          )}
          {activeIndex === 1 && (
            <motion.div key="bg1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
              <div className="absolute top-20 right-10 w-40 h-60 bg-white/20 border-l-8 border-white/40"></div>
              <div className="absolute bottom-30 left-20 w-64 h-8 bg-white/30 rounded-full"></div>
            </motion.div>
          )}
          {activeIndex === 2 && (
            <motion.div key="bg2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
              <div className="absolute top-40 left-10 w-20 h-40 bg-white/20 rounded-3xl border-4 border-white/40"></div>
              <div className="absolute bottom-40 right-10 w-24 h-48 bg-white/20 rounded-3xl border-4 border-white/40"></div>
            </motion.div>
          )}
          {activeIndex === 3 && (
            <motion.div key="bg3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
              <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 h-[80vh] flex flex-col justify-center">
        
        {/* Title */}
        <h2 className="absolute top-10 w-full text-center font-bengali text-4xl text-warm-brown/80 font-bold">
          {t('সময়ের বাক্স', 'The Box of Time')}
        </h2>

        {/* Scene Area (Characters) */}
        <div className="relative h-[300px] w-full flex items-end justify-center mb-10">
          <AnimatePresence mode="wait">
            
            {activeIndex === 0 && (
              <motion.div key="c0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex gap-4 items-end">
                <SiblingA state="run" facing="right" />
                <div className="w-8 h-8 bg-white/50 rounded-full mb-4 animate-bounce"></div>
                <SiblingB state="run" facing="left" />
              </motion.div>
            )}

            {activeIndex === 1 && (
              <motion.div key="c1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex gap-12 items-end">
                <SiblingA state="angry" facing="right" />
                <SiblingB state="angry" facing="left" />
              </motion.div>
            )}

            {activeIndex === 2 && (
              <motion.div key="c2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex gap-20 items-end">
                <SiblingA state="idle" facing="left" />
                <SiblingB state="idle" facing="right" />
              </motion.div>
            )}

            {activeIndex === 3 && (
              <motion.div key="c3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex gap-4 items-end">
                <SiblingA state="idle" facing="right" />
                <SiblingB state="wave" facing="left" />
              </motion.div>
            )}

          </AnimatePresence>

          {/* Morphing Object in the middle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <AnimatePresence mode="wait">
              {activeIndex === 0 && (
                <motion.div key="obj0" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }} className="text-6xl drop-shadow-lg">
                  🚗
                </motion.div>
              )}
              {activeIndex === 1 && (
                <motion.div key="obj1" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }} className="text-6xl drop-shadow-lg">
                  🎒
                </motion.div>
              )}
              {activeIndex === 2 && (
                <motion.div key="obj2" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }} className="text-6xl drop-shadow-lg">
                  📱
                </motion.div>
              )}
              {activeIndex === 3 && (
                <motion.div key="obj3" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }} className="text-6xl drop-shadow-lg">
                  🪢
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Memory Text */}
        <div className="h-32 mb-12 flex flex-col justify-end text-center">
          <AnimatePresence mode="wait">
            {activeIndex === 0 && (
              <motion.div key="t0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 className="font-sans font-bold text-warm-brown/60 tracking-widest uppercase mb-2">AGE 5</h3>
                <p className="font-bengali text-3xl md:text-5xl text-warm-brown font-bold">{t('তখন পৃথিবীটা এতটাই ছোট ছিল।', 'Then the world was so small.')}</p>
              </motion.div>
            )}
            {activeIndex === 1 && (
              <motion.div key="t1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 className="font-sans font-bold text-warm-brown/60 tracking-widest uppercase mb-2">AGE 10</h3>
                <p className="font-bengali text-3xl md:text-5xl text-warm-brown font-bold">{t('ঝগড়া ছিল বেশি।', 'Fights were more frequent.')}</p>
              </motion.div>
            )}
            {activeIndex === 2 && (
              <motion.div key="t2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 className="font-sans font-bold text-warm-brown/60 tracking-widest uppercase mb-2">AGE 15</h3>
                <p className="font-bengali text-3xl md:text-5xl text-warm-brown font-bold">{t('কথা কমেছিল…', 'Talks decreased...')}</p>
              </motion.div>
            )}
            {activeIndex === 3 && (
              <motion.div key="t3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 className="font-sans font-bold text-warm-brown/60 tracking-widest uppercase mb-2">TODAY</h3>
                <p className="font-bengali text-3xl md:text-5xl text-warm-brown font-bold">{t('কিন্তু বন্ধনটা?', 'But the bond?')}</p>
                <p className="font-bengali text-4xl md:text-6xl text-white font-bold mt-2">{t('সেটা একই আছে। ❤️', 'It remains the same. ❤️')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Timeline Track (The Memory Box) */}
        <div className="relative w-full h-24 bg-amber-900/10 rounded-xl border-b-8 border-r-8 border-amber-900/30 px-8 flex items-center shadow-inner overflow-hidden">
          
          {/* Wood Texture */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-30 mix-blend-multiply"></div>
          
          {/* Scratches/Doodles on the wood */}
          <div className="absolute top-2 left-[20%] text-xs text-amber-950/20 font-sans transform -rotate-12">"Do not open!"</div>
          <div className="absolute bottom-2 right-[30%] text-xs text-amber-950/20 font-sans transform rotate-6">1999</div>

          <div ref={containerRef} className="relative w-full h-[4px] bg-warm-brown/30 rounded-full z-10">
            
            {/* Draggable Thread Node */}
            <motion.div
              drag="x"
              dragConstraints={containerRef}
              dragElastic={0}
              dragMomentum={false}
              style={{ x }}
              className="absolute top-1/2 -translate-y-1/2 -ml-6 w-12 h-12 flex items-center justify-center cursor-grab active:cursor-grabbing z-20 group"
            >
              <div className="w-6 h-6 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1)] border-2 border-crimson flex items-center justify-center">
                <div className="w-2 h-2 bg-saffron rounded-full"></div>
              </div>
            </motion.div>
            
            {/* Filled glowing thread behind the node */}
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 left-0 h-[4px] bg-gradient-to-r from-crimson to-saffron rounded-full origin-left"
              style={{ width: x }}
            />
          </div>
        </div>

      </div>
    </motion.section>
  )
}
