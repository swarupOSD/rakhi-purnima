import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

export default function FestivalHUD() {
  const { language, setLanguage } = useLanguage()

  return (
    <motion.div 
      className="fixed top-4 right-4 z-[60] flex items-center gap-4 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-warm-brown/10"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="flex items-center gap-2">
        <button
          onClick={() => setLanguage('bn')}
          className={`font-bengali text-sm font-bold transition-colors ${
            language === 'bn' ? 'text-crimson' : 'text-warm-brown/40 hover:text-warm-brown'
          }`}
        >
          বাংলা
        </button>
        <span className="text-warm-brown/30">|</span>
        <button
          onClick={() => setLanguage('en')}
          className={`font-sans text-sm font-bold transition-colors ${
            language === 'en' ? 'text-crimson' : 'text-warm-brown/40 hover:text-warm-brown'
          }`}
        >
          ENG
        </button>
      </div>
    </motion.div>
  )
}
