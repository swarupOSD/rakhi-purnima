import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import SiblingA from '../characters/SiblingA'
import SiblingB from '../characters/SiblingB'

export default function Finale() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0%" })
  const [sequence, setSequence] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const timers = [
      setTimeout(() => setSequence(1), 2000), // sunrise
      setTimeout(() => setSequence(2), 4000), // text 1
      setTimeout(() => setSequence(3), 6000), // text 2
      setTimeout(() => setSequence(4), 8000), // text 3
      setTimeout(() => setSequence(5), 10000), // text 4 (The bond)
      setTimeout(() => setSequence(6), 12000), // Rakhi Purnima
      setTimeout(() => setSequence(7), 15000), // Joke & Restart
    ]
    return () => timers.forEach(clearTimeout)
  }, [isInView])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => window.location.reload(), 1000)
  }

  return (
    <section ref={ref} className="relative min-h-[150vh] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background (Midnight -> Sunrise) */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ backgroundColor: "#0f172a" }} // midnight
        animate={
          sequence >= 1 
            ? { backgroundColor: ["#0f172a", "#4c1d95", "#be185d", "#ea580c", "#fcd34d", "#fdfbf7"] } 
            : {}
        }
        transition={{ duration: 10, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: "easeInOut" }}
      />
      
      {/* Sunrise Glow */}
      <motion.div 
        className="absolute bottom-0 w-[150vw] h-[100vh] bg-[radial-gradient(ellipse_at_bottom,_#fde047_0%,_transparent_70%)] z-0"
        initial={{ opacity: 0, scale: 0.5, y: 200 }}
        animate={sequence >= 1 ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 8, ease: "easeOut" }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center justify-center min-h-screen pt-20">
        
        {/* The Text Sequence */}
        <div className="flex flex-col items-center text-center h-[300px] justify-center">
          <AnimatePresence mode="wait">
            
            {sequence === 2 && (
              <motion.h2 key="t1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="font-bengali text-4xl md:text-6xl text-white font-bold drop-shadow-md">
                {t('আলাদা জীবন।', 'Separate lives.')}
              </motion.h2>
            )}

            {sequence === 3 && (
              <motion.h2 key="t2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="font-bengali text-4xl md:text-6xl text-white font-bold drop-shadow-md">
                {t('আলাদা শহর।', 'Separate cities.')}
              </motion.h2>
            )}

            {sequence === 4 && (
              <motion.h2 key="t3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="font-bengali text-4xl md:text-6xl text-white font-bold drop-shadow-md">
                {t('আলাদা স্বপ্ন।', 'Separate dreams.')}
              </motion.h2>
            )}

            {sequence >= 5 && sequence < 7 && (
              <motion.div key="t4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                <h2 className="font-bengali text-5xl md:text-7xl text-warm-brown font-bold mb-4">{t('একটা বন্ধন।', 'One bond.')}</h2>
                <h2 className="font-bengali text-5xl md:text-7xl text-warm-brown font-bold mb-4">{t('একটা সুতো।', 'One thread.')}</h2>
                <h2 className="font-bengali text-6xl md:text-8xl text-crimson font-bold">{t('চিরকাল।', 'Forever.')}</h2>
              </motion.div>
            )}

            {sequence >= 7 && (
              <motion.div key="t5" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-warm-brown">
                <h1 className="font-bengali text-6xl md:text-8xl font-bold text-crimson mb-8">
                  {t('শুভ রাখী পূর্ণিমা', 'Happy Rakhi Purnima')} <span className="text-saffron">❤️</span>
                </h1>
                
                <div className="flex gap-4 items-end justify-center my-8">
                  <SiblingA state="celebrate" facing="right" />
                  <motion.div 
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full border-4 border-white shadow-xl flex items-center justify-center mb-10 mx-2"
                  >
                    <div className="text-2xl drop-shadow-md">⭐</div>
                  </motion.div>
                  <SiblingB state="celebrate" facing="left" />
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="bg-white/80 px-8 py-4 rounded-full shadow-lg border border-saffron mb-12"
                >
                  <p className="font-bengali text-xl md:text-2xl font-bold">
                    {t('এবার যাও… ভাই/বোনটাকে একটু জ্বালাও। 😌😂', 'Now go... annoy your sibling a little. 😌😂')}
                  </p>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToTop}
                  className="font-bengali text-lg text-warm-brown/60 hover:text-warm-brown flex items-center gap-2 font-bold tracking-widest"
                >
                  {t('আবার শুরু করো', 'Start again')} <span>↻</span>
                </motion.button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
