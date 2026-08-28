import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SiblingB from '../characters/SiblingB'

export default function SurpriseSystem() {
  const [activeSurprise, setActiveSurprise] = useState<number | null>(null)

  useEffect(() => {
    // Random surprise generator
    const interval = setInterval(() => {
      // 10% chance to trigger a surprise every 20 seconds
      if (Math.random() < 0.1) {
        const surpriseId = Math.floor(Math.random() * 3)
        setActiveSurprise(surpriseId)
        
        // Clear surprise after 4 seconds
        setTimeout(() => setActiveSurprise(null), 4000)
      }
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[70] overflow-hidden">
      <AnimatePresence>
        {activeSurprise === 0 && (
          <motion.div
            key="s0"
            initial={{ x: -100, rotate: -45 }}
            animate={{ x: window.innerWidth + 100, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "linear" }}
            className="absolute top-1/3 left-0 w-8 h-8"
          >
            {/* A chocolate rolls across the screen */}
            <div className="w-8 h-4 bg-gradient-to-r from-saffron to-marigold rounded-sm transform skew-x-12"></div>
          </motion.div>
        )}

        {activeSurprise === 1 && (
          <motion.div
            key="s1"
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="absolute bottom-0 right-10"
          >
            {/* Sibling peeking from the bottom */}
            <div className="relative">
              <SiblingB state="peek" facing="left" />
              <div className="absolute -top-8 -left-16 bg-white px-3 py-1 rounded-full shadow-md text-xs font-bengali font-bold text-warm-brown">
                উঁকি! 👀
              </div>
            </div>
          </motion.div>
        )}

        {activeSurprise === 2 && (
          <motion.div
            key="s2"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: window.innerHeight, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, ease: "linear" }}
            className="absolute top-0 left-1/4"
          >
            {/* A marigold petal falls slowly */}
            <div className="w-4 h-6 bg-saffron rounded-full opacity-60 mix-blend-multiply rotate-[15deg]"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
