import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import SiblingA from '../characters/SiblingA'
import SiblingB from '../characters/SiblingB'

export default function GiftExchange() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  
  const [sequence, setSequence] = useState(0)

  // 0: hidden
  // 1: B asks "What's that?"
  // 2: A replies "Nothing"
  // 3: Gift is shaking, ready to click
  // 4: Opened
  // 5: Confetti & Reaction
  // 6: "Did you bring this for me?"
  // 7: "Yes." & Hug

  useEffect(() => {
    if (isInView && sequence === 0) {
      setTimeout(() => setSequence(1), 1000)
      setTimeout(() => setSequence(2), 3000)
      setTimeout(() => setSequence(3), 5000)
    }
  }, [isInView, sequence])

  const handleOpenGift = () => {
    if (sequence === 3) {
      setSequence(4)
      setTimeout(() => setSequence(5), 1000)
      setTimeout(() => setSequence(6), 3000)
      setTimeout(() => setSequence(7), 5000)
    }
  }

  return (
    <section ref={ref} className="relative min-h-[140vh] bg-[#fffaf0] flex flex-col items-center justify-center overflow-hidden py-32">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-marigold/10 to-transparent"></div>
        {/* Subtle hanging lights/decor */}
        <div className="absolute top-10 left-[20%] w-2 h-32 bg-warm-brown/10 rounded-full">
          <div className="absolute bottom-0 w-4 h-6 bg-saffron rounded-full -ml-1"></div>
        </div>
        <div className="absolute top-20 right-[20%] w-2 h-40 bg-warm-brown/10 rounded-full">
          <div className="absolute bottom-0 w-4 h-6 bg-crimson rounded-full -ml-1"></div>
        </div>
        
        {/* Festive bunting */}
        <div className="absolute top-0 left-0 w-full h-20 opacity-30">
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full" fill="none" stroke="#f59e0b" strokeWidth="2">
            <path d="M0,20 Q100,80 200,20 Q300,80 400,20 Q500,80 600,20 Q700,80 800,20 Q900,80 1000,20" />
            <path d="M0,40 Q100,100 200,40 Q300,100 400,40 Q500,100 600,40 Q700,100 800,40 Q900,100 1000,40" stroke="#e03c31"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 h-[80vh] flex flex-col justify-center">
        
        <h2 className="text-center font-bengali text-4xl text-warm-brown font-bold mb-16">
          {t('উপহার!', 'Gifts!')}
        </h2>

        {/* Scene Area (With subtle camera zoom effect) */}
        <motion.div 
          className="relative w-full h-[400px] flex items-end justify-center mb-10"
          animate={{ scale: sequence >= 4 ? 1.1 : 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          
          <div className="relative flex items-end gap-12 md:gap-32 w-full justify-center">
            
            {/* Sibling A (Giving) */}
            <motion.div 
              className="relative z-20"
              animate={sequence >= 7 ? { x: 40 } : { x: 0 }} // Move closer for hug
              transition={{ duration: 1 }}
            >
              <SiblingA state={sequence >= 7 ? 'celebrate' : sequence >= 4 ? 'laugh' : sequence >= 2 ? 'giveGift' : 'idle'} facing="right" />
              
              {/* Dialogue A */}
              <AnimatePresence>
                {sequence === 2 && (
                  <DialogueBubble text={t("কিছু না। 😏", "Nothing. 😏")} delay={0} right />
                )}
                {sequence === 7 && (
                  <DialogueBubble text={t("হ্যাঁ রে। ❤️", "Yes. ❤️")} delay={0} right />
                )}
              </AnimatePresence>
            </motion.div>

            {/* The Central Area (Gift) */}
            <div className="relative w-32 h-32 flex flex-col items-center justify-end z-30">
              
              <AnimatePresence>
                {sequence >= 2 && sequence < 4 && (
                  <motion.div
                    className="absolute bottom-0 cursor-pointer group"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={handleOpenGift}
                  >
                    {/* The Gift Box */}
                    <motion.div 
                      className="w-24 h-24 bg-emerald-500 rounded-md shadow-lg border-2 border-emerald-700 relative"
                      animate={sequence === 3 ? { rotate: [-2, 2, -2], y: [0, -5, 0] } : {}}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      {/* Ribbon */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-yellow-400"></div>
                      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-4 bg-yellow-400"></div>
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-6 bg-yellow-400 rounded-full border border-emerald-600"></div>
                    </motion.div>
                    
                    {sequence === 3 && (
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-warm-brown/50 tracking-widest uppercase">
                        {t("Click to open", "Click to open")}
                      </div>
                    )}
                  </motion.div>
                )}

                {sequence >= 4 && (
                  <motion.div
                    className="absolute bottom-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {/* Warm glow inside box */}
                    <motion.div 
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-20 bg-yellow-200 rounded-full blur-xl"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 2 }}
                      transition={{ duration: 1 }}
                    />

                    {/* Opened Box (Bottom) */}
                    <div className="w-24 h-16 bg-emerald-700 rounded-md shadow-inner absolute bottom-0 -left-12 border-2 border-emerald-900"></div>
                    
                    {/* Opened Box (Lid flying off) */}
                    <motion.div 
                      className="w-26 h-8 bg-emerald-500 absolute bottom-16 -left-16 rounded-sm border-b-2 border-emerald-800"
                      initial={{ y: 0, x: 0, rotate: 0 }}
                      animate={{ y: -60, x: -60, rotate: -45, opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    
                    {/* The Gift Item inside (e.g., Headphones) */}
                    <motion.div 
                      className="absolute bottom-4 -left-8"
                      initial={{ y: 20, scale: 0.5, opacity: 0 }}
                      animate={{ y: -40, scale: 1.5, opacity: 1 }}
                      transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
                    >
                      <div className="text-5xl drop-shadow-md">🎧</div>
                    </motion.div>

                    {/* Confetti Burst */}
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={`confetti-${i}`}
                        className={`absolute bottom-10 -left-6 w-3 h-3 ${['bg-red-500', 'bg-blue-500', 'bg-yellow-400', 'bg-green-500', 'bg-purple-500'][i % 5]}`}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{ 
                          x: (Math.random() - 0.5) * 300, 
                          y: (Math.random() - 1) * 300,
                          opacity: 0,
                          rotate: Math.random() * 360,
                          scale: 0.5
                        }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sibling B (Receiving) */}
            <motion.div 
              className="relative z-20"
              animate={sequence >= 7 ? { x: -40 } : { x: 0 }} // Move closer for hug
              transition={{ duration: 1 }}
            >
              <SiblingB state={sequence >= 7 ? 'celebrate' : sequence >= 5 ? 'surprised' : 'idle'} facing="left" />
              
              {/* Dialogue B */}
              <AnimatePresence>
                {sequence === 1 && (
                  <DialogueBubble text={t("ওটা কী?", "What is that?")} delay={0} />
                )}
                {sequence === 5 && (
                  <DialogueBubble text={t("সত্যি?! 😍", "Really?! 😍")} delay={0} />
                )}
                {sequence === 6 && (
                  <DialogueBubble text={t("তুই এটা আমার জন্য এনেছিস?", "You brought this for me?")} delay={0} />
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}

function DialogueBubble({ text, right = false, delay = 0 }: { text: string, right?: boolean, delay?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0, originX: right ? 0 : 1, originY: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ type: "spring", bounce: 0.5, delay }}
      className={`absolute -top-20 ${right ? '-right-24 rounded-bl-sm' : '-left-24 rounded-br-sm'} bg-white px-4 py-3 rounded-2xl shadow-xl border border-warm-brown/10 z-40 whitespace-nowrap text-center`}
    >
      <p className="font-bengali font-bold text-xl text-warm-brown">{text}</p>
    </motion.div>
  )
}
