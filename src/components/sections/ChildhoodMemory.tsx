import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { useSecret } from '../../context/SecretContext'
import SiblingA from '../characters/SiblingA'
import SiblingB from '../characters/SiblingB'

type DiscoveredObject = 'remote' | 'notebook' | 'chocolate' | 'photo' | null

export default function ChildhoodMemory() {
  const { t } = useLanguage()
  const { discoverSecret, hasDiscovered } = useSecret()
  const [activeObject, setActiveObject] = useState<DiscoveredObject>(null)
  
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  const handleDiscover = (obj: DiscoveredObject) => {
    setActiveObject(obj)
    if (obj === 'chocolate') {
      discoverSecret('chocolate') // 1 of 4 secrets
    }
  }

  return (
    <section ref={ref} className="relative min-h-[120vh] bg-[#fbfdf7] flex flex-col items-center justify-center overflow-hidden py-20">
      
      {/* 
        ENVIRONMENT: Childhood Bedroom
        A rich visual scene containing bed, desk, books, and scattered toys. 
      */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Wall Color / Wallpaper */}
        <div className="absolute top-0 w-full h-2/3 bg-blue-50/50"></div>
        {/* Floor Line */}
        <div className="absolute bottom-0 w-full h-1/3 bg-warm-brown/5 border-t-2 border-warm-brown/10"></div>
        
        {/* Window with sunlight */}
        <div className="absolute top-10 left-[10%] w-32 h-40 bg-white/40 border-4 border-white shadow-sm flex overflow-hidden opacity-60">
          <div className="w-1/2 h-full border-r-2 border-white/50"></div>
          {/* Sunlight beams */}
          <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-br from-yellow-200/40 to-transparent transform -skew-x-12 translate-x-10 translate-y-10"></div>
        </div>

        {/* The Bed */}
        <div className="absolute bottom-[25%] right-[10%] w-64 h-32 bg-amber-800/10 rounded-lg border-2 border-amber-900/20 flex flex-col justify-end p-2 opacity-80">
          <div className="w-full h-12 bg-blue-200/50 rounded-md"></div>
          {/* Pillow */}
          <div className="absolute top-2 left-4 w-16 h-8 bg-white/80 rounded-full shadow-sm"></div>
        </div>

        {/* The Desk */}
        <div className="absolute bottom-[25%] left-[10%] w-48 h-32 flex flex-col items-center justify-end opacity-80">
          {/* Desk Top */}
          <div className="w-full h-4 bg-amber-700/80 rounded-sm"></div>
          {/* Desk Legs */}
          <div className="flex justify-between w-40">
            <div className="w-2 h-20 bg-amber-800/80"></div>
            <div className="w-2 h-20 bg-amber-800/80"></div>
          </div>
          {/* Stack of books on desk */}
          <div className="absolute bottom-24 left-4 w-12 h-3 bg-red-400 rounded-sm"></div>
          <div className="absolute bottom-27 left-5 w-10 h-3 bg-green-400 rounded-sm transform rotate-2"></div>
        </div>

        {/* Scattered Toy (Car) */}
        <div className="absolute bottom-[20%] left-1/3 w-8 h-4 bg-red-500 rounded-t-md opacity-70 shadow-soft-ground">
          <div className="absolute -bottom-1 left-1 w-2 h-2 bg-gray-800 rounded-full"></div>
          <div className="absolute -bottom-1 right-1 w-2 h-2 bg-gray-800 rounded-full"></div>
        </div>

        {/* Ambient Dust Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute w-1 h-1 bg-yellow-100 rounded-full animate-dust" 
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s` 
              }} 
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 h-[80vh] flex flex-col justify-center items-center">
        
        <h2 className="absolute top-20 text-center font-bengali text-4xl text-warm-brown font-bold w-full">
          {t('সেই দিনগুলো…', 'Those days...')}
        </h2>

        {/* Interactive Objects Area */}
        <div className="relative w-full h-[300px] mt-32 flex justify-center items-center">
          
          {/* The Remote */}
          <motion.div 
            className="absolute left-[20%] top-10 cursor-pointer group"
            whileHover={{ scale: 1.1, rotate: -5 }}
            onClick={() => handleDiscover('remote')}
          >
            <div className="w-10 h-24 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center p-2 relative">
              <div className="w-4 h-2 bg-red-500 rounded-sm mb-2"></div>
              <div className="grid grid-cols-2 gap-1 w-full">
                {Array.from({ length: 8 }).map((_, i) => <div key={i} className="w-2 h-2 bg-gray-600 rounded-full"></div>)}
              </div>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xl opacity-0 group-hover:opacity-100 transition-opacity">📺</span>
            </div>
          </motion.div>

          {/* The Notebook */}
          <motion.div 
            className="absolute left-[40%] bottom-10 cursor-pointer group"
            whileHover={{ scale: 1.1, rotate: 5 }}
            onClick={() => handleDiscover('notebook')}
          >
            <div className="w-20 h-24 bg-orange-100 rounded-sm shadow-md border-l-8 border-red-500 relative flex flex-col justify-around p-2">
              <div className="w-full h-[1px] bg-blue-300"></div>
              <div className="w-full h-[1px] bg-blue-300"></div>
              <div className="w-full h-[1px] bg-blue-300"></div>
              {/* Doodles */}
              <div className="absolute top-2 right-2 text-xs opacity-50">#</div>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xl opacity-0 group-hover:opacity-100 transition-opacity">📖</span>
            </div>
          </motion.div>

          {/* The Old Photo Frame */}
          <motion.div 
            className="absolute right-[40%] top-20 cursor-pointer group z-20"
            whileHover={{ scale: 1.1 }}
            onClick={() => handleDiscover('photo')}
          >
            <div className="w-24 h-20 bg-[#8b5a2b] p-2 rounded-sm shadow-lg border border-black/20 flex flex-col items-center relative">
              <div className="w-full h-full bg-[#fdfbf7] flex items-end justify-center relative overflow-hidden">
                {/* Silhouette children */}
                <div className="w-6 h-10 bg-warm-brown/30 rounded-t-full absolute bottom-0 left-2"></div>
                <div className="w-5 h-8 bg-warm-brown/30 rounded-t-full absolute bottom-0 right-2"></div>
                {/* Sun/Ball */}
                <div className="w-4 h-4 bg-saffron/40 rounded-full absolute top-2 right-2"></div>
              </div>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xl opacity-0 group-hover:opacity-100 transition-opacity">🖼️</span>
            </div>
          </motion.div>

          {/* The Hidden Chocolate (Secret) */}
          <motion.div 
            className="absolute right-[20%] bottom-20 cursor-pointer group"
            whileHover={{ scale: 1.1, rotate: 10 }}
            animate={!hasDiscovered('chocolate') ? { y: [0, -5, 0] } : {}}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            onClick={() => handleDiscover('chocolate')}
          >
            <div className="relative">
              {/* Chocolate Wrapper */}
              <div className="w-16 h-8 bg-purple-600 rounded-sm shadow-soft-ground transform -skew-x-12 relative flex items-center justify-center border border-purple-800">
                <div className="w-12 h-2 bg-yellow-400"></div>
              </div>
              {hasDiscovered('chocolate') && (
                <div className="absolute -top-4 -right-4 text-xs font-bold text-saffron bg-white px-2 py-1 rounded-full shadow-sm animate-bounce">
                  Secret Found!
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Reaction Area (Characters & Dialogue) */}
        <div className="relative w-full h-[200px] mt-10 flex items-end justify-center border-b-2 border-warm-brown/10 pb-4">
          
          <AnimatePresence mode="wait">
            {activeObject && (
              <motion.div 
                key={activeObject}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="flex items-end gap-12 w-full justify-center"
              >
                
                {/* Sibling A */}
                <div className="relative">
                  <SiblingA 
                    state={
                      activeObject === 'remote' ? 'angry' : 
                      activeObject === 'chocolate' ? 'celebrate' : 
                      activeObject === 'photo' ? 'idle' : 'idle'
                    } 
                    facing="right" 
                  />
                  {activeObject === 'remote' && <DialogueBubble text={t("রিমোটটা দে!", "Give me the remote!")} />}
                  {activeObject === 'chocolate' && <DialogueBubble text={t("ধরা পড়েছিস! 😂", "Caught you! 😂")} />}
                  {activeObject === 'notebook' && <DialogueBubble text={t("আমার খাতা! 😤", "My notebook! 😤")} />}
                </div>

                {/* Sibling B */}
                <div className="relative">
                  <SiblingB 
                    state={
                      activeObject === 'remote' ? 'laugh' : 
                      activeObject === 'chocolate' ? 'surprised' : 
                      activeObject === 'photo' ? 'idle' : 'angry'
                    } 
                    facing="left" 
                  />
                  {activeObject === 'remote' && <DialogueBubble text={t("না! আমি কার্টুন দেখব!", "No! I'll watch cartoons!")} right />}
                  {activeObject === 'chocolate' && <DialogueBubble text={t("আমি খাইনি! 🤥", "I didn't eat it! 🤥")} right />}
                  {activeObject === 'notebook' && <DialogueBubble text={t("তোর খাতায় ছবি এঁকেছি! 🎨", "I drew in your notebook! 🎨")} right />}
                </div>

              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Photo Frame Full Screen Animation overlay */}
          <AnimatePresence>
            {activeObject === 'photo' && (
              <motion.div 
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveObject(null)}
              >
                <motion.div 
                  className="bg-[#fdfbf7] p-4 pb-12 rounded-sm shadow-2xl relative"
                  initial={{ scale: 0.5, y: 100 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-[300px] h-[300px] border border-warm-brown/20 bg-amber-50 flex items-end justify-center pb-4 relative overflow-hidden">
                    <div className="w-16 h-24 bg-warm-brown/80 rounded-t-full absolute bottom-0 left-16"></div>
                    <div className="w-12 h-20 bg-warm-brown/80 rounded-t-full absolute bottom-0 right-16"></div>
                    <div className="w-10 h-10 bg-saffron rounded-full absolute top-8 right-10"></div>
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-bengali text-warm-brown handwritten text-2xl whitespace-nowrap font-bold">
                    {t('তখনও আমরা এমনই ছিলাম। ❤️', 'We were like this back then too. ❤️')}
                  </div>
                </motion.div>
                
                <div className="absolute top-10 right-10 text-white font-sans text-sm tracking-widest cursor-pointer">
                  {t('Click anywhere to close', 'Click anywhere to close')} ✕
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!activeObject && isInView && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-10 w-full text-center text-xs font-bold text-warm-brown/50 uppercase tracking-widest pointer-events-none"
            >
              {t('Click on the objects', 'Click on the objects')}
            </motion.div>
          )}

        </div>

      </div>
    </section>
  )
}

function DialogueBubble({ text, right = false }: { text: string, right?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0, originX: right ? 0 : 1, originY: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`absolute -top-16 ${right ? '-right-10 rounded-bl-sm' : '-left-10 rounded-br-sm'} bg-white px-4 py-2 rounded-2xl shadow-md border border-warm-brown/10 z-20 whitespace-nowrap`}
    >
      <p className="font-bengali font-bold text-sm text-warm-brown">{text}</p>
    </motion.div>
  )
}
