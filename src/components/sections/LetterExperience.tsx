import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

const PREWRITTEN_LETTER_BN = `তোকে হয়তো সবসময় বলা হয় না,
কিন্তু তুই আমার জীবনের এমন একজন,
যার সঙ্গে ঝগড়া করেও আবার কথা বলতে ইচ্ছে করে।

ছোটবেলায় কত ঝগড়া করেছি,
কত জিনিস নিয়ে লড়াই করেছি,
কতবার ভেবেছি আর কথা বলব না…

তারপর পাঁচ মিনিট পরেই আবার একসঙ্গে বসে হাসতাম।

আজ আমরা হয়তো আগের মতো একসঙ্গে থাকি না,
কিন্তু দূরত্বটা আমাদের গল্পটা বদলাতে পারেনি।

এই রাখিটা শুধু একটা সুতো নয়।
এটা আমাদের সেই সব দিনের কথা,
যেগুলো কখনও পুরোনো হয় না।

ভালো থাকিস।
আর হ্যাঁ… আমাকে বেশি জ্বালাস না। 😂❤️`

const PREWRITTEN_LETTER_EN = `Maybe I don't say this often,
but you are the one person in my life,
who I want to talk to even after a fight.

We fought so much in our childhood,
fought over so many silly things,
thought so many times we'd never speak again...

And then 5 minutes later we'd be laughing together.

Today we might not live together like before,
but distance hasn't changed our story.

This Rakhi is not just a thread.
It's a memory of all those days,
that never get old.

Take care.
And yes... don't annoy me too much. 😂❤️`

export default function LetterExperience() {
  const { t, language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-20%" })
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [customLetter, setCustomLetter] = useState('')

  const displayLetter = isEditing ? customLetter : (customLetter || (language === 'bn' ? PREWRITTEN_LETTER_BN : PREWRITTEN_LETTER_EN))

  useEffect(() => {
    const saved = localStorage.getItem('rakhi_custom_letter')
    if (saved) setCustomLetter(saved)
  }, [])

  const handleSave = () => {
    localStorage.setItem('rakhi_custom_letter', customLetter)
    setIsEditing(false)
  }

  // Auto-open after entering view
  useEffect(() => {
    if (isInView && !isOpen) {
      const timer = setTimeout(() => setIsOpen(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [isInView, isOpen])

  return (
    <section ref={ref} className="relative min-h-[140vh] bg-[#fdfbf7] flex flex-col items-center py-32 overflow-hidden">
      
      {/* Environmental details: Desk + Flowers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-40"></div>
        
        {/* Subtle wooden desk feel at the bottom */}
        <div className="absolute bottom-0 w-full h-[30vh] bg-gradient-to-t from-orange-900/10 to-transparent blur-xl"></div>
        
        {/* Decorative dried flower on desk */}
        <div className="absolute bottom-20 right-20 w-32 h-40 opacity-40 transform rotate-12">
          <svg viewBox="0 0 100 100" fill="none" stroke="#8b4513" strokeWidth="1">
            <path d="M50 100 Q40 50 50 0 M50 80 Q20 70 30 50 M50 60 Q80 50 70 30 M50 40 Q20 30 40 10 M50 20 Q80 10 60 0" />
            <circle cx="50" cy="0" r="3" fill="#8b4513" />
            <circle cx="30" cy="50" r="2" fill="#8b4513" />
            <circle cx="70" cy="30" r="2" fill="#8b4513" />
          </svg>
        </div>
      </div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center">
        
        <h2 className="font-bengali text-4xl text-warm-brown font-bold mb-16 drop-shadow-sm text-center">
          {t('একটা চিঠি', 'A Letter')}
        </h2>

        {/* The Envelope / Paper Area */}
        <div className="relative w-full max-w-lg min-h-[600px] flex items-start justify-center">
          
          <AnimatePresence mode="wait">
            {!isOpen && (
              <motion.div 
                key="closed-envelope"
                className="relative w-80 h-52 mt-32 bg-[#e8d5c4] shadow-2xl border border-warm-brown/20 cursor-pointer rounded-sm transform -rotate-2"
                whileHover={{ scale: 1.05, rotate: 0 }}
                onClick={() => setIsOpen(true)}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
              >
                {/* Envelope Flap (Closed) */}
                <div className="absolute top-0 w-0 h-0 border-l-[160px] border-r-[160px] border-t-[100px] border-l-transparent border-r-transparent border-t-[#dfc9b5] drop-shadow-sm z-10"></div>
                
                {/* Red Thread Accent & Wax Seal */}
                <div className="absolute top-1/2 left-0 w-full h-[3px] bg-crimson shadow-sm z-20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-red-700 rounded-full shadow-md z-30 flex items-center justify-center border border-red-900/50">
                  <span className="text-white text-xs opacity-80">❤️</span>
                </div>

                <div className="absolute -bottom-12 w-full text-center text-xs font-bold text-warm-brown/50 uppercase tracking-widest pointer-events-none animate-pulse">
                  {t('Click to open', 'Click to open')}
                </div>
              </motion.div>
            )}

            {isOpen && (
              <motion.div 
                key="open-letter"
                className="w-full relative z-20 flex flex-col items-center"
                initial={{ y: 50, opacity: 0, rotateX: 90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                style={{ transformOrigin: "bottom" }}
              >
                {/* The Paper */}
                <div className="w-full bg-[#fffdf8] shadow-2xl p-8 md:p-12 border border-warm-brown/10 relative overflow-hidden flex flex-col rounded-sm">
                  {/* Subtle red margin line */}
                  <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-red-400/30"></div>
                  
                  {isEditing ? (
                    <textarea
                      value={customLetter}
                      onChange={(e) => setCustomLetter(e.target.value)}
                      placeholder={t("কিছু লিখতে চাইলে লেখো...", "Write something if you want...")}
                      className="w-full min-h-[400px] bg-transparent resize-none focus:outline-none font-bengali text-xl md:text-2xl leading-loose text-warm-brown/90 handwritten pl-6 md:pl-8"
                      style={{ backgroundImage: 'linear-gradient(transparent, transparent 38px, rgba(139, 69, 19, 0.1) 38px, rgba(139, 69, 19, 0.1) 39px, transparent 39px)', backgroundSize: '100% 39px', lineHeight: '39px' }}
                    />
                  ) : (
                    <div 
                      className="w-full min-h-[400px] font-bengali text-xl md:text-2xl leading-loose text-warm-brown/90 handwritten pl-6 md:pl-8 whitespace-pre-wrap"
                      style={{ backgroundImage: 'linear-gradient(transparent, transparent 38px, rgba(139, 69, 19, 0.1) 38px, rgba(139, 69, 19, 0.1) 39px, transparent 39px)', backgroundSize: '100% 39px', lineHeight: '39px' }}
                    >
                      {/* We use framer motion to stagger the text appearance */}
                      {displayLetter.split('\n').map((line, i) => (
                        <motion.span 
                          key={i} 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          transition={{ delay: 0.5 + (i * 0.2) }}
                          className="block min-h-[39px]"
                        >
                          {line}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-8 flex gap-4">
                  {isEditing ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSave}
                      className="px-6 py-2 bg-warm-brown text-white rounded-full font-bengali shadow-md"
                    >
                      {t("সেভ করো", "Save")}
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2 bg-transparent text-warm-brown border border-warm-brown/20 rounded-full font-bengali text-sm shadow-sm"
                    >
                      {t("নিজের কথাও লিখবে?", "Add your own words?")}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Final Text (Appears after reading) */}
        <div className="h-32 mt-12 flex flex-col items-center justify-center">
          <AnimatePresence>
            {isOpen && !isEditing && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4 }}
                className="text-center"
              >
                <h3 className="font-bengali text-2xl md:text-3xl text-warm-brown font-medium mb-1">
                  {t('কিছু কথা বলা হয় না।', 'Some words are never spoken.')}
                </h3>
                <h3 className="font-bengali text-2xl md:text-3xl text-crimson font-bold">
                  {t('তবু থেকে যায়।', 'Yet they remain.')}
                </h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
