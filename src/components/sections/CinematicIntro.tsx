import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import SiblingA from '../characters/SiblingA'
import SiblingB from '../characters/SiblingB'

export default function CinematicIntro() {
  const { t } = useLanguage()
  const [step, setStep] = useState(0)

  useEffect(() => {
    // Sequence timing
    const timers = [
      setTimeout(() => setStep(1), 2000), // Sibling A enters
      setTimeout(() => setStep(2), 3500), // Sibling B enters
      setTimeout(() => setStep(3), 6000), // "Wait..."
      setTimeout(() => setStep(4), 8000), // "Let's begin"
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section className="relative min-h-[120vh] bg-[#fdfbf7] flex flex-col items-center overflow-hidden">
      
      {/* 
        ENVIRONMENT: Morning Festive Room 
        Warm sunlight, curtains, window, rangoli on the floor.
      */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Morning Sunlight Gradient */}
        <div className="absolute top-0 w-full h-[50vh] bg-gradient-to-b from-yellow-100/50 to-transparent"></div>
        
        {/* Window & Curtains */}
        <div className="absolute top-10 right-[15%] w-48 h-64 border-8 border-warm-brown/20 bg-white/40 shadow-sm flex overflow-hidden opacity-80">
          <div className="w-1/2 h-full border-r-4 border-warm-brown/20"></div>
          {/* Sunbeams */}
          <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-br from-yellow-200/40 to-transparent transform -skew-x-12 translate-x-10 translate-y-10"></div>
        </div>
        {/* Left Curtain */}
        <div className="absolute top-0 right-[15%] w-16 h-72 bg-saffron/40 shadow-soft-ground rounded-br-full origin-top transform -skew-x-6 opacity-80 animate-sway"></div>
        {/* Right Curtain */}
        <div className="absolute top-0 right-[15%] translate-x-32 w-16 h-72 bg-saffron/40 shadow-soft-ground rounded-bl-full origin-top transform skew-x-6 opacity-80 animate-sway" style={{ animationDelay: '2s' }}></div>

        {/* Floor Line */}
        <div className="absolute bottom-0 w-full h-[35vh] bg-warm-brown/5 border-t border-warm-brown/10"></div>
        
        {/* Rangoli on the floor */}
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-64 h-16 bg-[radial-gradient(ellipse,_#f59e0b_0%,_transparent_70%)] opacity-30 transform rotate-x-60 shadow-soft-ground"></div>
        <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-32 h-8 bg-crimson rounded-[100%] opacity-20"></div>

        {/* Ambient Dust Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
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

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-32 h-[80vh] flex flex-col items-center">
        
        {/* Scene Area (Characters) */}
        <div className="relative w-full h-[400px] flex items-end justify-center">
          
          <div className="flex w-full max-w-3xl justify-between px-10 relative">
            
            {/* Sibling A */}
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={step >= 1 ? { x: 0, opacity: 1 } : {}}
              transition={{ type: "spring", bounce: 0.4, duration: 1.5 }}
              className="relative"
            >
              <SiblingA state={step >= 4 ? 'laugh' : step >= 1 ? 'idle' : 'run'} facing="right" />
              
              <AnimatePresence>
                {step === 3 && (
                  <DialogueBubble text={t("কী রে? তৈরি?", "Hey! Ready?")} delay={0} />
                )}
                {step >= 4 && (
                  <DialogueBubble text={t("সবসময়! 😂", "Always! 😂")} delay={0} />
                )}
              </AnimatePresence>
            </motion.div>

            {/* Sibling B */}
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              animate={step >= 2 ? { x: 0, opacity: 1 } : {}}
              transition={{ type: "spring", bounce: 0.4, duration: 1.5 }}
              className="relative"
            >
              <SiblingB state={step >= 4 ? 'celebrate' : step >= 2 ? 'idle' : 'run'} facing="left" />
              
              <AnimatePresence>
                {step === 3 && (
                  <DialogueBubble text={t("দাঁড়া, আসছি!", "Wait, I'm coming!")} right delay={0.5} />
                )}
                {step >= 4 && (
                  <DialogueBubble text={t("চল! 🏃‍♀️", "Let's go! 🏃‍♀️")} right delay={0.5} />
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>

        {/* Global Thread Start Indicator */}
        <motion.div 
          className="absolute bottom-10 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={step >= 4 ? { opacity: 1 } : { opacity: 0 }}
        >
          <div className="w-1 h-32 bg-gradient-to-b from-transparent to-crimson"></div>
          <div className="w-4 h-4 bg-saffron rounded-full shadow-[0_0_15px_#e03c31] animate-pulse -mt-2 border-2 border-white"></div>
          <span className="mt-4 font-sans text-xs font-bold text-crimson uppercase tracking-widest animate-bounce">
            {t('Scroll Down', 'Scroll Down')}
          </span>
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
      className={`absolute -top-16 ${right ? '-right-10 rounded-bl-sm' : '-left-10 rounded-br-sm'} bg-white px-4 py-2 rounded-2xl shadow-xl border border-warm-brown/10 z-20 whitespace-nowrap`}
    >
      <p className="font-bengali font-bold text-sm text-warm-brown">{text}</p>
    </motion.div>
  )
}
