import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { useSecret } from '../../context/SecretContext'

export default function TheSecret() {
  const { t } = useLanguage()
  const { discoveredCount, totalSecrets } = useSecret()

  const allFound = discoveredCount === totalSecrets
  const progress = discoveredCount

  return (
    <section className="relative min-h-screen bg-[#0f172a] flex flex-col items-center justify-center py-20 overflow-hidden">
      
      {/* Background (Dark resolving to Golden Light) */}
      <AnimatePresence>
        {allFound && (
          <motion.div 
            className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#fcd34d_0%,_#f59e0b_50%,_#b45309_100%)]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
        
        {!allFound ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }}
            className="text-white/30 font-sans"
          >
            {/* Visual Indicator of Secrets Found */}
            <div className="flex gap-4 justify-center mb-8">
              {Array.from({ length: totalSecrets }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-4 h-4 rounded-full border-2 ${
                    i < progress 
                      ? 'bg-saffron border-saffron shadow-[0_0_10px_#f59e0b]' 
                      : 'border-white/20'
                  }`}
                />
              ))}
            </div>
            
            <p className="font-bengali text-xl text-white/40 tracking-widest uppercase">
              {t('কিছু স্মৃতি এখনও লুকোনো আছে…', 'Some memories are still hidden...')}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 2 }}
            className="flex flex-col items-center"
          >
            {/* Illustrated Hidden Memory */}
            <div className="w-64 h-64 md:w-80 md:h-80 bg-white/20 backdrop-blur-md rounded-[40px] shadow-2xl border-4 border-white/50 flex flex-col items-center justify-center p-8 mb-12 transform -rotate-3">
              <div className="relative w-full h-full border-2 border-white/30 rounded-[20px] flex items-end justify-center pb-4">
                {/* Silhouette of two children sitting together */}
                <svg viewBox="0 0 100 100" className="w-32 h-32 opacity-80" fill="white">
                  <path d="M 40 50 C 30 50 20 60 20 80 L 80 80 C 80 60 70 50 60 50 Z" />
                  <circle cx="35" cy="40" r="10" />
                  <circle cx="65" cy="40" r="10" />
                </svg>
              </div>
            </div>

            <h2 className="font-bengali text-4xl md:text-5xl text-warm-brown font-bold mb-4 drop-shadow-md">
              {t('সবচেয়ে সুন্দর স্মৃতিগুলো কখনও হারায় না।', 'The most beautiful memories are never lost.')}
            </h2>
            <h3 className="font-bengali text-2xl md:text-3xl text-warm-brown/80 font-medium">
              {t('শুধু একটু লুকিয়ে থাকে। ❤️', 'They just stay a little hidden. ❤️')}
            </h3>
          </motion.div>
        )}

      </div>
    </section>
  )
}
