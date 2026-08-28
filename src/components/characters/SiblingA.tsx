import { motion } from 'framer-motion'

export type CharacterState = 'idle' | 'walk' | 'run' | 'wave' | 'laugh' | 'angry' | 'surprised' | 'tieRakhi' | 'giveGift' | 'receiveGift' | 'celebrate' | 'sit' | 'peek'

interface Props {
  state?: CharacterState
  className?: string
  facing?: 'left' | 'right'
}

export default function SiblingA({ state = 'idle', className = '', facing = 'right' }: Props) {
  
  // Animation variants based on state
  const bodyVariants: any = {
    idle: { y: [0, -2, 0], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } },
    walk: { y: [0, -4, 0], rotate: [-2, 2, -2], transition: { repeat: Infinity, duration: 0.8, ease: "easeInOut" } },
    run: { y: [0, -8, 0], rotate: [5, 10, 5], transition: { repeat: Infinity, duration: 0.4, ease: "easeInOut" } },
    laugh: { y: [0, -4, 0], transition: { repeat: Infinity, duration: 0.3, ease: "easeInOut" } },
    celebrate: { y: -10, transition: { type: "spring" } },
    angry: { rotate: 5, x: [-2, 2, -2, 0], transition: { duration: 0.2 } },
    sit: { y: 15, scaleY: 0.9 },
    wave: { y: 0 },
    tieRakhi: { rotate: 5 },
    giveGift: { x: 5 },
    receiveGift: { x: -5 },
    surprised: { y: -10, scale: 1.05 },
    peek: { rotate: 15, x: 20 }
  }

  const armLeftVariants: any = {
    idle: { rotate: 0 },
    wave: { rotate: [-20, 20, -20], transition: { repeat: Infinity, duration: 0.5 } },
    celebrate: { rotate: -150, y: -10 },
    angry: { rotate: -30 },
    run: { rotate: [-40, 40, -40], transition: { repeat: Infinity, duration: 0.4 } },
    tieRakhi: { rotate: -60, x: 10, y: -5 },
    giveGift: { rotate: -40, x: 10 },
    sit: { rotate: -20 },
    default: { rotate: 0 }
  }

  const armRightVariants: any = {
    idle: { rotate: 0 },
    wave: { rotate: 0 },
    celebrate: { rotate: 150, y: -10 },
    angry: { rotate: 30 },
    run: { rotate: [40, -40, 40], transition: { repeat: Infinity, duration: 0.4 } },
    tieRakhi: { rotate: -50, x: 5, y: -10 },
    receiveGift: { rotate: -40 },
    sit: { rotate: 20 },
    default: { rotate: 0 }
  }

  const headVariants: any = {
    idle: { rotate: [0, 2, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } },
    laugh: { rotate: [-5, 5, -5], transition: { repeat: Infinity, duration: 0.4 } },
    surprised: { y: -5 },
    angry: { rotate: 5 },
    default: { rotate: 0 }
  }

  return (
    <motion.div 
      className={`relative inline-block ${className}`}
      style={{ transform: facing === 'left' ? 'scaleX(-1)' : 'scaleX(1)' }}
    >
      <motion.svg 
        viewBox="0 0 100 200" 
        className="w-16 h-32 md:w-24 md:h-48 drop-shadow-md"
        variants={bodyVariants}
        animate={state}
        initial="idle"
      >
        {/* Shadow */}
        <ellipse cx="50" cy="190" rx="30" ry="5" fill="rgba(0,0,0,0.1)" />
        
        {/* Legs */}
        <motion.rect x="35" y="120" width="10" height="70" rx="5" fill="#1e3a8a" />
        <motion.rect x="55" y="120" width="10" height="70" rx="5" fill="#1e3a8a" />
        
        {/* Left Arm (Behind Body) */}
        <motion.g variants={armLeftVariants} animate={state} style={{ transformOrigin: '40px 70px' }}>
          <rect x="30" y="65" width="10" height="60" rx="5" fill="#d97706" />
          <circle cx="35" cy="125" r="5" fill="#fcd34d" />
        </motion.g>

        {/* Body/Kurta (Saffron/Orange) */}
        <path d="M 30,60 Q 50,50 70,60 L 75,130 Q 50,140 25,130 Z" fill="#f59e0b" />
        {/* Scarf / Detail */}
        <path d="M 40,60 L 45,120 L 55,120 L 60,60 Z" fill="#d97706" opacity="0.3" />

        {/* Head & Neck */}
        <rect x="45" y="45" width="10" height="15" fill="#fcd34d" />
        <motion.g variants={headVariants} animate={state} style={{ transformOrigin: '50px 30px' }}>
          <circle cx="50" cy="30" r="20" fill="#fcd34d" />
          {/* Hair */}
          <path d="M 30,30 Q 50,0 70,30 Q 50,15 30,30 Z" fill="#451a03" />
          <circle cx="50" cy="10" r="15" fill="#451a03" />
          
          {/* Face (Simple expressions) */}
          {state === 'angry' ? (
            <>
              <line x1="38" y1="25" x2="45" y2="28" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
              <line x1="62" y1="25" x2="55" y2="28" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
              <circle cx="42" cy="30" r="2" fill="#451a03" />
              <circle cx="58" cy="30" r="2" fill="#451a03" />
            </>
          ) : state === 'surprised' ? (
            <>
              <circle cx="42" cy="28" r="3" fill="#451a03" />
              <circle cx="58" cy="28" r="3" fill="#451a03" />
              <circle cx="50" cy="38" r="4" fill="#451a03" />
            </>
          ) : state === 'laugh' ? (
            <>
              <path d="M 38,28 Q 42,25 45,28" fill="none" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
              <path d="M 55,28 Q 58,25 62,28" fill="none" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
              <path d="M 45,36 Q 50,42 55,36" fill="none" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="42" cy="28" r="2" fill="#451a03" />
              <circle cx="58" cy="28" r="2" fill="#451a03" />
              <path d="M 46,36 Q 50,38 54,36" fill="none" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" />
            </>
          )}
        </motion.g>

        {/* Right Arm (In front of Body) */}
        <motion.g variants={armRightVariants} animate={state} style={{ transformOrigin: '60px 70px' }}>
          <rect x="60" y="65" width="10" height="60" rx="5" fill="#f59e0b" />
          <circle cx="65" cy="125" r="5" fill="#fcd34d" />
        </motion.g>
        
      </motion.svg>
    </motion.div>
  )
}
