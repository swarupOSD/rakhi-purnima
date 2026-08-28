import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { useSecret } from '../../context/SecretContext'
import SiblingA from '../characters/SiblingA'
import SiblingB from '../characters/SiblingB'

export default function TheFight() {
  const { t } = useLanguage()
  const [resolved, setResolved] = useState(false)
  const [tugProgress, setTugProgress] = useState(50) // 0 to 100
  const [hasFallen, setHasFallen] = useState(false)
  const [isTruce, setIsTruce] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  
  const { discoverSecret, hasDiscovered } = useSecret()
  const secretId = 'fight_knot'

  // Logic: if someone pulls too hard (0 or 100), they both fall
  useEffect(() => {
    if (tugProgress <= 0 || tugProgress >= 100) {
      setHasFallen(true)
      setTimeout(() => setResolved(true), 2500)
    }
  }, [tugProgress])

  const handleDrag = (_e: any, info: any) => {
    if (hasFallen || isTruce) return
    const newProgress = Math.min(100, Math.max(0, tugProgress + info.delta.x * 0.2))
    setTugProgress(newProgress)
  }

  const handleSecretFound = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!hasDiscovered(secretId)) discoverSecret(secretId)
  }

  return (
    <section ref={containerRef} className="relative min-h-[120vh] w-full overflow-hidden flex items-center justify-center bg-[#fdfbf7]">
      
      {/* Background Split Screen */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{ 
          background: resolved 
            ? 'linear-gradient(90deg, #fdfbf7 0%, #fdfbf7 100%)' 
            : 'linear-gradient(90deg, #f9a03f 50%, #e03c31 50%)'
        }}
        transition={{ duration: 1.5 }}
      />

      {/* Environmental details: Living Room */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Wall & Floor */}
        <div className="absolute top-0 w-full h-2/3 bg-amber-50/50"></div>
        <div className="absolute bottom-0 w-full h-1/3 bg-warm-brown/5 border-t border-warm-brown/10"></div>
        
        {/* Sofa */}
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[80%] max-w-2xl h-32 bg-orange-800/80 rounded-t-3xl border-4 border-orange-900/40 shadow-xl flex items-end opacity-90">
          <div className="w-full h-16 bg-orange-700/80 rounded-t-2xl mx-2 shadow-inner"></div>
        </div>
        
        {/* Plant */}
        <div className="absolute bottom-[20%] right-[10%] w-16 h-32 flex flex-col items-center justify-end">
          <div className="w-12 h-16 bg-emerald-700 rounded-t-full shadow-lg"></div>
          <div className="w-8 h-8 bg-orange-800 rounded-b-md"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-20 min-h-[80vh] flex flex-col items-center justify-center">
        
        <AnimatePresence mode="wait">
          {!resolved ? (
            <motion.div 
              key="fight"
              className="flex flex-col w-full items-center justify-center h-full"
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="absolute top-10 font-bengali text-3xl md:text-5xl text-white font-bold drop-shadow-md text-center">
                {t('ভাই-বোনের ঝগড়া', 'Sibling Fights')}
              </h2>

              <motion.div 
                className="absolute w-full h-[400px] flex items-end justify-between max-w-4xl px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                
                {/* Sibling A (Pulling Left) */}
                <motion.div 
                  className="relative z-20"
                  animate={hasFallen ? { rotate: -90, x: -50, y: 50 } : { rotate: (tugProgress - 50) * -0.5, x: (tugProgress - 50) * 0.5 }}
                  transition={hasFallen ? { type: "spring", bounce: 0.5 } : { type: "tween", duration: 0.1 }}
                  style={{ transformOrigin: "bottom center" }}
                >
                  <SiblingA state={hasFallen ? 'surprised' : 'angry'} facing="right" />
                  <AnimatePresence>
                    {!hasFallen && tugProgress > 70 && (
                      <DialogueBubble text="দে বলছি! 😡" />
                    )}
                    {hasFallen && !isTruce && (
                      <DialogueBubble text="উফ!" />
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* The Object of Desire (Charger) */}
                <motion.div 
                  className="absolute left-1/2 bottom-20 -translate-x-1/2 z-30 flex flex-col items-center cursor-grab active:cursor-grabbing touch-none"
                  drag="x"
                  dragConstraints={{ left: -150, right: 150 }}
                  onDrag={handleDrag}
                  animate={hasFallen ? { y: 150, opacity: 0 } : { x: (tugProgress - 50) * 2 }}
                  transition={hasFallen ? { duration: 0.5 } : { type: "tween", duration: 0.1 }}
                >
                  <div className="w-16 h-12 bg-white rounded-lg shadow-lg border border-gray-200 flex items-center justify-center relative z-10">
                    <span className="text-2xl">🔌</span>
                  </div>
                  {/* Visual Wire Stretching */}
                  <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-[300px] -translate-x-1/2 h-[4px] bg-black/80 z-0"></div>
                  
                  {!hasFallen && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                      className="absolute -bottom-10 w-full text-center text-xs font-bold text-warm-brown/50 tracking-widest uppercase whitespace-nowrap"
                    >
                      {t('Pull Hard to Break Fight', 'Pull Hard to Break Fight')}
                    </motion.div>
                  )}
                </motion.div>

                {/* Sibling B (Pulling Right) */}
                <motion.div 
                  className="relative z-20"
                  animate={hasFallen ? { rotate: 90, x: 50, y: 50 } : { rotate: (50 - tugProgress) * -0.5, x: (tugProgress - 50) * 0.5 }}
                  transition={hasFallen ? { type: "spring", bounce: 0.5 } : { type: "tween", duration: 0.1 }}
                  style={{ transformOrigin: "bottom center" }}
                >
                  <SiblingB state={hasFallen ? 'surprised' : 'angry'} facing="left" />
                  <AnimatePresence>
                    {!hasFallen && tugProgress < 30 && (
                      <DialogueBubble text="আমার! 😤" right />
                    )}
                    {hasFallen && !isTruce && (
                      <DialogueBubble text="আহ!" right />
                    )}
                  </AnimatePresence>
                </motion.div>
                
              </motion.div>
              
              <p className="mt-20 font-sans font-bold text-white/80 tracking-widest text-sm text-center">
                {t('DRAG IT', 'DRAG IT')}
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key="resolved"
              className="flex flex-col items-center justify-center text-center h-full w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h3 className="font-bengali font-bold text-vermillion tracking-widest uppercase mb-12 text-2xl">
                {t('পাঁচ মিনিট পরে…', 'Five minutes later...')}
              </h3>
              
              <div className="flex gap-4 items-end justify-center mb-12 relative">
                <SiblingA state="sit" facing="right" />
                
                {/* Plate of Sweets */}
                <div className="w-24 h-6 bg-amber-700/20 rounded-[100%] absolute bottom-0 left-1/2 -translate-x-1/2">
                  <div className="absolute bottom-2 left-4 w-6 h-6 rounded-full bg-saffron shadow-sm"></div>
                  <div className="absolute bottom-1 left-10 w-6 h-6 rounded-full bg-white shadow-sm"></div>
                  <div className="absolute bottom-3 right-4 w-6 h-6 rounded-full bg-saffron shadow-sm"></div>
                </div>

                <SiblingB state="sit" facing="left" />
              </div>

              <h2 className="font-bengali text-3xl md:text-5xl text-warm-brown leading-relaxed font-bold">
                {t('ঝগড়া ৫ মিনিট।', 'Fight for 5 minutes.')}<br/>
                <span className="text-saffron mt-2 block">{t('বন্ধুত্ব ৫০ বছর। ❤️', 'Friendship for 50 years. ❤️')}</span>
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Secret */}
      {resolved && (
        <motion.div 
          className="absolute top-[20%] right-[10%] w-10 h-10 flex items-center justify-center cursor-pointer group z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={handleSecretFound}
        >
          <div className="w-4 h-4 bg-marigold rounded-full shadow-[0_0_10px_rgba(249,160,63,0.5)] opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all"></div>
        </motion.div>
      )}

    </section>
  )
}

function DialogueBubble({ text, right = false, delay = 0 }: { text: string, right?: boolean, delay?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0, originX: right ? 1 : 0, originY: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", bounce: 0.5, delay }}
      className={`absolute -top-16 ${right ? '-left-20 rounded-br-sm' : '-right-20 rounded-bl-sm'} bg-white px-4 py-2 rounded-2xl shadow-xl border border-warm-brown/10 z-20 whitespace-nowrap text-center`}
    >
      <p className="font-bengali font-bold text-lg text-warm-brown">{text}</p>
    </motion.div>
  )
}
