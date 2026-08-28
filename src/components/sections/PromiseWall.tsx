import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

type PromiseNote = {
  id: string
  textBn: string
  textEn: string
  color: string
  angle: number
  radius: number
  rotation: number
  pinned?: boolean
}

const DEFAULT_PROMISES: PromiseNote[] = [
  { id: '1', textBn: 'ঝগড়া হলেও কথা বন্ধ করব না। ❤️', textEn: "Won't stop talking even after a fight. ❤️", color: 'bg-yellow-100', angle: 0, radius: 160, rotation: -10, pinned: true },
  { id: '2', textBn: 'শেষ মিষ্টিটা ভাগ করে খাব। 😌', textEn: 'Will share the last sweet. 😌', color: 'bg-pink-100', angle: 45, radius: 220, rotation: 15, pinned: false },
  { id: '3', textBn: 'দূরে থাকলেও খোঁজ নেব।', textEn: 'Will check on you even from afar.', color: 'bg-blue-100', angle: 90, radius: 140, rotation: -5, pinned: true },
  { id: '4', textBn: 'কখনও কখনও তোকে জ্বালাব। 😂', textEn: 'Will annoy you sometimes. 😂', color: 'bg-orange-100', angle: 135, radius: 250, rotation: 12, pinned: false },
  { id: '5', textBn: 'খারাপ দিনে পাশে থাকব।', textEn: 'Will stand by you on bad days.', color: 'bg-green-100', angle: 180, radius: 180, rotation: -15, pinned: true },
  { id: '6', textBn: 'পুরনো গল্পগুলো ভুলব না।', textEn: "Won't forget the old stories.", color: 'bg-purple-100', angle: 225, radius: 210, rotation: 8, pinned: false },
  { id: '7', textBn: 'একসঙ্গে হাসার কারণ খুঁজে নেব।', textEn: 'Will find reasons to laugh together.', color: 'bg-red-100', angle: 270, radius: 150, rotation: -20, pinned: true },
  { id: '8', textBn: 'সবসময় ভাই-বোন থাকব।', textEn: 'Will always be siblings.', color: 'bg-teal-100', angle: 315, radius: 240, rotation: 5, pinned: false },
]

export default function PromiseWall() {
  const { t, language } = useLanguage()
  const [promises, setPromises] = useState<PromiseNote[]>([])
  const [newPromise, setNewPromise] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  useEffect(() => {
    // Only load custom promises, keep defaults always
    const saved = localStorage.getItem('rakhi_custom_promises')
    let custom: PromiseNote[] = []
    if (saved) {
      custom = JSON.parse(saved)
    }
    setPromises([...DEFAULT_PROMISES, ...custom])
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPromise.trim()) return

    setIsSubmitting(true)

    const colors = ['bg-yellow-100', 'bg-pink-100', 'bg-blue-100', 'bg-orange-100', 'bg-green-100']
    const newNote: PromiseNote = {
      id: Date.now().toString(),
      textBn: newPromise,
      textEn: newPromise,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * 360,
      radius: 120 + Math.random() * 80,
      rotation: (Math.random() - 0.5) * 40,
      pinned: false
    }

    setTimeout(() => {
      const updated = [...promises, newNote]
      setPromises(updated)
      
      const saved = localStorage.getItem('rakhi_custom_promises')
      const custom = saved ? JSON.parse(saved) : []
      localStorage.setItem('rakhi_custom_promises', JSON.stringify([...custom, newNote]))
      
      setNewPromise('')
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <section ref={ref} className="relative min-h-[140vh] bg-[#fbfdf7] overflow-hidden flex flex-col items-center py-20">
      
      {/* Environmental details: Hanging threads and flowers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 w-full h-[30vh] bg-gradient-to-b from-marigold/10 to-transparent"></div>
        {/* Hanging Marigold Garland 1 */}
        <div className="absolute top-0 left-[10%] w-2 h-[40vh] border-l-2 border-dashed border-orange-300 animate-sway">
          <div className="absolute bottom-0 w-6 h-6 bg-orange-500 rounded-full shadow-sm -ml-[13px]"></div>
          <div className="absolute bottom-[10vh] w-6 h-6 bg-yellow-400 rounded-full shadow-sm -ml-[13px]"></div>
        </div>
        {/* Hanging Thread 2 */}
        <div className="absolute top-0 right-[15%] w-[2px] h-[60vh] bg-crimson/30 animate-sway" style={{ animationDelay: '1s' }}>
          <div className="absolute bottom-0 w-4 h-4 bg-saffron rounded-full shadow-sm -ml-[7px]"></div>
        </div>
        
        {/* Garden Grass Foreground */}
        <div className="absolute bottom-0 w-full h-[15vh] bg-emerald-900/10 border-t-2 border-emerald-800/20 rounded-t-[50%]"></div>
        
        {/* Ambient Floating Dust/Petals */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute w-2 h-2 bg-pink-300/40 rounded-full animate-float" 
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s` 
              }} 
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
        
        <h2 className="font-bengali text-4xl md:text-5xl text-emerald-800 font-bold mb-16 drop-shadow-sm text-center">
          {t('কিছু প্রতিশ্রুতি', 'Some Promises')}
        </h2>

        {/* Floating Promises Orbit */}
        <div className="relative w-full h-[600px] flex items-center justify-center">
          
          {/* Center Glowing Thread / Core */}
          <motion.div 
            className="absolute w-24 h-24 bg-gradient-to-r from-saffron to-emerald-400 rounded-full blur-xl opacity-60"
            animate={{ scale: [1, 1.2, 1], rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute w-12 h-12 bg-white rounded-full shadow-[0_0_30px_#fcd34d] flex items-center justify-center border-4 border-emerald-500 z-10">
            <span className="text-xl">🤝</span>
          </div>

          {/* Render the orbiting promises */}
          <div className="absolute w-full h-full animate-[spin_80s_linear_infinite]">
            <AnimatePresence>
              {isInView && promises.map((note, idx) => (
                <motion.div
                  key={note.id}
                  className="absolute left-1/2 top-1/2"
                  style={{ 
                    x: Math.cos((note.angle * Math.PI) / 180) * note.radius,
                    y: Math.sin((note.angle * Math.PI) / 180) * note.radius,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.5, delay: idx * 0.1 }}
                >
                  <div 
                    className={`w-32 h-32 md:w-40 md:h-40 ${note.color} p-4 shadow-lg flex items-center justify-center text-center animate-[spin_80s_linear_infinite_reverse] border border-black/5`}
                    style={{ rotate: `${note.rotation}deg` }}
                  >
                    {/* Tape/Pin detail */}
                    {note.pinned ? (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-400 rounded-full shadow-sm"></div>
                    ) : (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-white/50 backdrop-blur-sm shadow-sm rotate-3"></div>
                    )}
                    <p className="font-bengali text-sm md:text-base font-bold text-gray-800 handwritten leading-snug">
                      {language === 'bn' ? note.textBn : note.textEn}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* New Submission Animation Sequence */}
          <AnimatePresence>
            {isSubmitting && (
              <motion.div 
                className="absolute z-50 w-48 h-48 bg-white p-4 shadow-2xl flex items-center justify-center text-center border-2 border-emerald-400"
                initial={{ scale: 1, y: 150, opacity: 1 }}
                animate={{ scale: 0.2, y: 0, opacity: 0, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <p className="font-bengali text-sm font-medium text-gray-800 handwritten">
                  {newPromise}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Optional Input Area */}
        <div className="w-full max-w-md mt-16 z-20">
          <div className="text-center mb-4">
            <p className="font-bengali text-emerald-800/60 font-medium">
              {t("চাইলে নিজের প্রতিশ্রুতিও যোগ করতে পারো", "You can add your own promise if you want")}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={newPromise}
              onChange={(e) => setNewPromise(e.target.value)}
              placeholder={t("তোমার প্রতিশ্রুতি…", "Your promise...")}
              className="w-full px-6 py-4 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-emerald-100 font-bengali text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-gray-400 text-center"
              maxLength={40}
              disabled={isSubmitting}
            />
            <AnimatePresence>
              {newPromise.trim() && (
                <motion.button
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full py-3 bg-emerald-600 text-white rounded-full font-bengali font-bold text-lg shadow-md disabled:opacity-50"
                >
                  {t('যুক্ত করো', 'Add Promise')}
                </motion.button>
              )}
            </AnimatePresence>
          </form>
        </div>

      </div>
    </section>
  )
}
