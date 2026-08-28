import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import SiblingA from '../characters/SiblingA'
import SiblingB from '../characters/SiblingB'

export default function TheRakhiMoment() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-20%" })
  const [sequence, setSequence] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const timers = [
      setTimeout(() => setSequence(1), 1000), // Sibling B picks up Rakhi
      setTimeout(() => setSequence(2), 2500), // Rakhi thread moves toward wrist
      setTimeout(() => setSequence(3), 4000), // Wrist is extended
      setTimeout(() => setSequence(4), 5500), // Thread wraps around wrist
      setTimeout(() => setSequence(5), 7000), // Knot forms
      setTimeout(() => setSequence(6), 8000), // Centerpiece settles
      setTimeout(() => setSequence(7), 9000), // Sibling smiles
      setTimeout(() => setSequence(8), 10000), // Petals fall
      setTimeout(() => setSequence(9), 11000), // Small golden celebration burst
      setTimeout(() => setSequence(10), 12500), // "হয়ে গেল। ❤️" / Sweet box moment
    ]
    return () => timers.forEach(clearTimeout)
  }, [isInView])

  return (
    <section ref={containerRef} className="relative min-h-[140vh] bg-cream flex flex-col items-center justify-center overflow-hidden py-20">
      
      {/* Festive Background Glows & Environment */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#fcd34d_0%,_transparent_60%)] opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#e03c31_0%,_transparent_40%)] opacity-10"></div>
        
        {/* Curtains / Festive Drapes */}
        <div className="absolute top-0 left-0 w-1/3 h-64 bg-vermillion/80 rounded-br-full shadow-2xl transform origin-top -skew-x-12 opacity-80 border-r-8 border-saffron/50"></div>
        <div className="absolute top-0 right-0 w-1/3 h-64 bg-vermillion/80 rounded-bl-full shadow-2xl transform origin-top skew-x-12 opacity-80 border-l-8 border-saffron/50"></div>

        {/* Diya Lamps in background */}
        <div className="absolute top-1/3 left-[15%]">
          <div className="w-8 h-4 bg-orange-700 rounded-b-full"></div>
          <motion.div 
            className="w-3 h-4 bg-gradient-to-t from-yellow-300 to-orange-500 rounded-full mx-auto -mt-4"
            animate={{ scaleY: [1, 1.2, 0.9, 1.1], opacity: [0.8, 1, 0.7, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{ transformOrigin: "bottom" }}
          ></motion.div>
        </div>
        <div className="absolute top-1/3 right-[15%]">
          <div className="w-8 h-4 bg-orange-700 rounded-b-full"></div>
          <motion.div 
            className="w-3 h-4 bg-gradient-to-t from-yellow-300 to-orange-500 rounded-full mx-auto -mt-4"
            animate={{ scaleY: [1, 1.3, 0.8, 1.1], opacity: [0.9, 1, 0.6, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            style={{ transformOrigin: "bottom" }}
          ></motion.div>
        </div>
        
        {/* Environmental Dimming when Rakhi is picked up */}
        <motion.div 
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: sequence >= 2 && sequence < 9 ? 0.3 : 0 }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center mt-32">
        
        {/* Characters & The Act of Tying - with subtle camera zoom */}
        <motion.div 
          className="relative w-full h-[400px] flex items-end justify-center mb-16"
          animate={sequence >= 4 && sequence < 9 ? { scale: 1.1, y: 50 } : { scale: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          
          <SiblingA state={sequence >= 7 ? 'laugh' : sequence >= 3 ? 'sit' : 'idle'} facing="right" />
          
          {/* Central Thali & Hands Interaction */}
          <div className="relative w-64 h-32 mx-4 flex flex-col items-center justify-end z-20">
            
            {/* Thali on floor */}
            <motion.div 
              className="w-48 h-16 bg-gradient-to-br from-yellow-200 to-yellow-600 rounded-[100%] shadow-xl border-2 border-saffron flex items-center justify-center relative mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
            >
              {/* Kumkum & Rice */}
              <div className="absolute left-6 top-6 w-5 h-5 bg-red-700 rounded-full shadow-inner flex items-center justify-center">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              <div className="absolute right-8 top-4 w-6 h-5 bg-white/90 rounded-full shadow-inner flex flex-wrap gap-[1px] p-[2px]">
                <div className="w-1 h-2 bg-white rounded-full"></div><div className="w-1 h-2 bg-white rounded-full"></div>
              </div>
              
              {/* Sweets (Laddoo) */}
              <div className="absolute right-4 bottom-4 w-6 h-6 bg-orange-400 rounded-full shadow-md"></div>
              <div className="absolute right-8 bottom-2 w-6 h-6 bg-orange-400 rounded-full shadow-md"></div>

              {/* The physical Rakhi on Thali (disappears when lifted) */}
              <AnimatePresence>
                {sequence < 1 && (
                  <motion.div 
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 flex items-center justify-center"
                  >
                    <div className="w-full h-[2px] bg-crimson absolute"></div>
                    <div className="w-6 h-6 bg-saffron rounded-full z-10 border-2 border-white shadow-sm"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* The Tying Interaction (Zoomed in logically using scale) */}
            <motion.div 
              className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-full h-full flex items-center justify-center pointer-events-none"
              animate={sequence >= 2 && sequence < 9 ? { scale: 1.5, y: -20 } : { scale: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              {/* A's Wrist extending (Sequence 3+) */}
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={sequence >= 3 ? { x: -20, opacity: 1 } : {}}
                className="w-24 h-8 bg-[#f59e0b] rounded-r-full transform rotate-12 origin-left absolute left-0 shadow-lg border-b border-orange-600"
              ></motion.div>
              
              {/* B's Hands holding Rakhi (Sequence 2+) */}
              <motion.div 
                initial={{ x: 100, opacity: 0, y: 50 }}
                animate={sequence >= 2 ? { x: 20, opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
                className="w-20 h-8 bg-[#dc2626] rounded-l-full transform -rotate-12 origin-right absolute right-0 flex items-center shadow-lg border-b border-red-800"
              >
                {/* Hand holding Rakhi */}
                <div className="absolute -left-4 w-8 h-8 bg-[#fed7aa] rounded-full shadow-sm"></div>
                
                {/* The Rakhi being tied */}
                <motion.div 
                  className="absolute -left-16 top-0 w-24 h-24 flex items-center justify-center"
                  initial={{ rotate: -90, scale: 0.8 }}
                  animate={sequence >= 4 ? { rotate: 270, scale: 1 } : {}}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                  {/* Thread wrapping */}
                  <motion.svg viewBox="0 0 100 100" className="w-full h-full absolute">
                    <motion.circle
                      cx="50" cy="50" r="40"
                      fill="none" stroke="var(--color-crimson)" strokeWidth="4"
                      initial={{ pathLength: 0 }}
                      animate={sequence >= 4 ? { pathLength: 1 } : {}}
                      transition={{ duration: 1 }}
                    />
                  </motion.svg>
                  
                  {/* Centerpiece settling (Sequence 6) */}
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full z-10 border-2 border-white shadow-lg"
                    initial={{ scale: 0 }}
                    animate={sequence >= 6 ? { scale: 1 } : {}}
                    transition={{ type: "spring", bounce: 0.6 }}
                  >
                    {/* Knot (Sequence 5) */}
                    <motion.div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-crimson rounded-full"
                      initial={{ scale: 0 }}
                      animate={sequence >= 5 ? { scale: 1 } : {}}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

          </div>

          <SiblingB state={sequence >= 7 ? 'laugh' : sequence >= 2 ? 'tieRakhi' : 'sit'} facing="left" />
        </motion.div>

        {/* Falling Petals (Sequence 8+) */}
        <AnimatePresence>
          {sequence >= 8 && (
            <div className="absolute inset-0 pointer-events-none z-30">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={`petal-${i}`}
                  initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 0, rotate: 0 }}
                  animate={{ y: window.innerHeight, opacity: [1, 1, 0], rotate: 360 }}
                  transition={{ duration: 3 + Math.random() * 2, ease: "linear" }}
                  className="absolute w-4 h-6 bg-saffron rounded-full opacity-80"
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Golden Celebration Burst (Sequence 9) */}
        <AnimatePresence>
          {sequence === 9 && (
            <motion.div 
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 20, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-yellow-300 rounded-full z-10 blur-xl pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Sweet Box Moment & Dialogue (Sequence 10+) */}
        <AnimatePresence>
          {sequence >= 10 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-32 left-1/2 -translate-x-1/2 z-40 bg-white px-6 py-3 rounded-full shadow-xl border border-warm-brown/10 flex items-center gap-4 whitespace-nowrap"
            >
              <div className="flex flex-col items-center">
                <span className="font-bengali font-bold text-warm-brown text-sm">একটা মিষ্টি?</span>
              </div>
              <div className="w-px h-8 bg-warm-brown/20"></div>
              <div className="flex flex-col items-center">
                <span className="font-bengali font-bold text-crimson text-sm">দুটো দে। 😌</span>
              </div>
              <div className="w-px h-8 bg-warm-brown/20"></div>
              <div className="flex flex-col items-center">
                <span className="font-bengali font-bold text-warm-brown text-sm">লোভী! 😂</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text Sequence */}
        <div className="h-32 flex flex-col items-center justify-center text-center z-40 mt-10">
          <AnimatePresence mode="wait">
            {sequence >= 10 ? (
              <motion.div 
                key="final-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center"
              >
                <h3 className="font-bengali text-4xl md:text-5xl text-warm-brown font-bold mb-2">
                  {t('হয়ে গেল। ❤️', 'Done. ❤️')}
                </h3>
              </motion.div>
            ) : sequence >= 7 ? (
              <motion.div 
                key="mid-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center"
              >
                <h3 className="font-bengali text-3xl md:text-4xl text-warm-brown font-medium mb-2">
                  {t('এই ছোট্ট সুতোটা…', 'This little thread...')}
                </h3>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="font-bengali text-4xl md:text-5xl text-crimson font-bold"
                >
                  {t('কত বড় একটা সম্পর্ক বেঁধে রাখে। ❤️', 'Ties such a big relationship together. ❤️')}
                </motion.h2>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
