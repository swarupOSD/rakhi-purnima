import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

export default function RakhiCustomizer() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-20%" })
  
  const [showCustomizer, setShowCustomizer] = useState(false)
  const [activeMaterial, setActiveMaterial] = useState<string | null>(null)
  const [customParts, setCustomParts] = useState({ thread: false, bead: false, charm: false })

  const handleSelect = (part: 'thread' | 'bead' | 'charm') => {
    setActiveMaterial(part)
    setTimeout(() => {
      setCustomParts(prev => ({ ...prev, [part]: true }))
      setActiveMaterial(null)
    }, 500)
  }

  return (
    <section ref={ref} className="relative min-h-[140vh] bg-[#f4ece1] overflow-hidden flex flex-col items-center py-32">
      
      {/* Background Craft Table Texture */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20 mix-blend-multiply"></div>
      
      {/* Environmental details */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-24 h-24 bg-white/40 rounded-full blur-2xl"></div>
        <div className="absolute top-20 right-10 w-16 h-16 bg-white/40 rounded-full blur-xl"></div>
        {/* Scissors silhouette */}
        <div className="absolute top-32 right-32 opacity-20 transform rotate-45">
          <svg width="40" height="60" viewBox="0 0 40 60" fill="none" stroke="#5d4037" strokeWidth="2">
            <circle cx="15" cy="45" r="8" />
            <circle cx="30" cy="50" r="6" />
            <line x1="18" y1="38" x2="35" y2="10" />
            <line x1="26" y1="45" x2="5" y2="10" />
            <circle cx="21" cy="33" r="2" fill="#5d4037" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
        
        <h2 className="font-bengali text-4xl md:text-5xl text-warm-brown font-bold mb-4 drop-shadow-sm text-center">
          {t('হাতে বানানো রাখি', 'Handmade Rakhi')}
        </h2>
        <p className="font-bengali text-xl text-warm-brown/70 mb-16 text-center">
          {t('স্নেহের সুতো দিয়ে বোনা।', 'Woven with threads of affection.')}
        </p>

        {/* The Craft Table Workspace */}
        <div className="relative w-full max-w-3xl aspect-[4/3] md:aspect-video bg-[#fffaf0] rounded-3xl shadow-2xl border-4 border-warm-brown/10 p-8 flex flex-col md:flex-row overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!showCustomizer ? (
              <motion.div 
                key="completed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex flex-col items-center justify-center relative"
              >
                {/* A Beautiful Pre-made Rakhi Display */}
                <div className="relative w-full h-48 flex items-center justify-center">
                  {/* Glow */}
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-40 h-40 bg-gradient-to-r from-saffron to-crimson rounded-full blur-2xl"
                  />
                  
                  {/* The Physical Thread */}
                  <div className="absolute w-[120%] h-[4px] bg-gradient-to-r from-crimson via-saffron to-crimson shadow-[0_2px_4px_rgba(0,0,0,0.2)]"></div>
                  
                  {/* The Centerpiece */}
                  <div className="absolute z-10 w-24 h-24 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full shadow-xl border-4 border-white flex items-center justify-center">
                    <div className="absolute inset-2 border-2 border-dashed border-red-500 rounded-full animate-[spin_20s_linear_infinite]"></div>
                    <div className="w-12 h-12 bg-crimson rounded-full shadow-inner flex items-center justify-center">
                      <span className="text-white font-bengali font-bold text-2xl drop-shadow-md">ভাই</span>
                    </div>
                  </div>
                  
                  {/* Beads */}
                  <div className="absolute z-10 left-[35%] w-6 h-6 bg-emerald-500 rounded-full border-2 border-white shadow-md"></div>
                  <div className="absolute z-10 right-[35%] w-6 h-6 bg-sky-500 rounded-full border-2 border-white shadow-md"></div>
                  <div className="absolute z-10 left-[25%] w-4 h-4 bg-saffron rounded-full border border-white shadow-sm"></div>
                  <div className="absolute z-10 right-[25%] w-4 h-4 bg-saffron rounded-full border border-white shadow-sm"></div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCustomizer(true)}
                  className="mt-12 px-6 py-2 bg-transparent text-warm-brown/60 hover:text-warm-brown border border-warm-brown/20 hover:border-warm-brown/40 rounded-full font-bengali text-sm shadow-sm transition-colors"
                >
                  {t("চাইলে নিজের মতো সাজাও →", "Customize if you want →")}
                </motion.button>
              </motion.div>
            ) : (
              <motion.div 
                key="customizer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full flex flex-col md:flex-row"
              >
                {/* Materials Tray */}
                <div className="w-full md:w-1/3 flex flex-row md:flex-col justify-around items-center border-b md:border-b-0 md:border-r border-warm-brown/20 pb-4 md:pb-0 md:pr-4 z-20">
                  
                  <motion.div 
                    className={`w-16 h-16 flex items-center justify-center cursor-pointer ${customParts.thread ? 'opacity-30' : 'hover:scale-110'}`}
                    onClick={() => !customParts.thread && handleSelect('thread')}
                    whileHover={!customParts.thread ? { rotate: 10 } : {}}
                  >
                    <div className="w-8 h-12 bg-orange-800 rounded-sm relative shadow-md">
                      <div className="w-10 h-8 bg-blue-600 absolute top-2 -left-1"></div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className={`w-16 h-16 bg-amber-100 rounded-lg shadow-inner border border-amber-200 flex flex-wrap items-center justify-center p-2 gap-1 cursor-pointer ${customParts.bead ? 'opacity-30' : 'hover:scale-110'}`}
                    onClick={() => !customParts.bead && handleSelect('bead')}
                  >
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                  </motion.div>

                  <motion.div 
                    className={`w-16 h-16 bg-amber-50 rounded-full shadow-md border border-amber-200 flex items-center justify-center cursor-pointer ${customParts.charm ? 'opacity-30' : 'hover:scale-110'}`}
                    onClick={() => !customParts.charm && handleSelect('charm')}
                  >
                    <div className="text-2xl drop-shadow-sm">🌸</div>
                  </motion.div>
                </div>

                {/* Assembly Area */}
                <div className="w-full md:w-2/3 h-full flex flex-col items-center justify-center relative pt-10 md:pt-0">
                  <div className="relative w-full h-40 flex items-center justify-center">
                    <AnimatePresence>
                      {customParts.thread && (
                        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className="absolute w-3/4 h-[4px] bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm" />
                      )}
                      {customParts.bead && (
                        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute flex gap-12 z-10">
                          <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white shadow-sm"></div>
                          <div className="w-6 h-6 bg-pink-500 rounded-full border-2 border-white shadow-sm"></div>
                        </motion.div>
                      )}
                      {customParts.charm && (
                        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} className="absolute z-20 w-20 h-20 bg-white rounded-full shadow-lg border-2 border-pink-200 flex items-center justify-center">
                          <div className="text-4xl drop-shadow-md">🌸</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowCustomizer(false)
                      setCustomParts({ thread: false, bead: false, charm: false })
                    }}
                    className="mt-12 text-sm text-warm-brown/50 hover:text-warm-brown underline font-sans"
                  >
                    {t("ফিরে যাও", "Go back")}
                  </motion.button>
                </div>

                {/* Flying material animation */}
                <AnimatePresence>
                  {activeMaterial && (
                    <motion.div 
                      className="absolute w-8 h-8 z-40 bg-white rounded-full shadow-lg border border-warm-brown/10 flex items-center justify-center"
                      initial={{ x: 50, y: 50, scale: 1, opacity: 1 }}
                      animate={{ x: 250, y: 150, scale: 0, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, type: "spring" }}
                    >
                      ✨
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  )
}
