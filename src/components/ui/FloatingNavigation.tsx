import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function FloatingNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { name: 'Intro', id: 'intro' },
    { name: 'Journey', id: 'journey' },
    { name: 'Childhood', id: 'childhood' },
    { name: 'Make a Rakhi', id: 'customizer' },
    { name: 'Letter', id: 'letter' },
    { name: 'Promises', id: 'promises' },
  ]

  const scrollToSection = (id: string) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-sm md:text-base font-serif tracking-widest pointer-events-auto text-ivory/80 hover:text-ivory transition-colors cursor-pointer"
          onClick={() => scrollToSection('intro')}
        >
          RAKHI '26
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          onClick={() => setIsOpen(!isOpen)}
          className="pointer-events-auto w-12 h-12 rounded-full border border-ivory/20 flex items-center justify-center bg-midnight-light/50 backdrop-blur-md hover:border-ivory/50 transition-all z-50"
        >
          {isOpen ? <X className="w-5 h-5 text-ivory" /> : <Menu className="w-5 h-5 text-ivory" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-24 right-6 md:right-10 pointer-events-auto flex flex-col gap-4 text-right"
          >
            {links.map((link, i) => (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollToSection(link.id)}
                className="font-serif text-xl md:text-2xl text-ivory/70 hover:text-ivory hover:text-glow transition-all"
              >
                {link.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
