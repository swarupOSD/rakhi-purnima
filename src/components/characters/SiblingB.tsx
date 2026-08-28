import { motion } from 'framer-motion'
import type { CharacterState } from './SiblingA'

interface Props {
  state?: CharacterState
  className?: string
  facing?: 'left' | 'right'
}

export default function SiblingB({ state = 'idle', className = '', facing = 'left' }: Props) {
  
  // Animation variants based on state
  const bodyVariants: any = {
    idle: { y: [0, -2, 0], transition: { repeat: Infinity, duration: 2.2, ease: "easeInOut" } },
    walk: { y: [0, -4, 0], rotate: [-2, 2, -2], transition: { repeat: Infinity, duration: 0.8, ease: "easeInOut" } },
    run: { y: [0, -8, 0], rotate: [5, 10, 5], transition: { repeat: Infinity, duration: 0.4, ease: "easeInOut" } },
    laugh: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 0.35, ease: "easeInOut" } },
    celebrate: { y: -12, transition: { type: "spring" } },
    angry: { rotate: -5, x: [2, -2, 2, 0], transition: { duration: 0.2 } },
    sit: { y: 15, scaleY: 0.9 },
    wave: { y: 0 },
    tieRakhi: { x: -10 },
    giveGift: { x: -5 },
    receiveGift: { x: 5 },
    surprised: { y: -10, scale: 1.05 },
    peek: { rotate: -15, x: -20 }
  }

  const armLeftVariants: any = {
    idle: { rotate: 0 },
    wave: { rotate: [-20, 20, -20], transition: { repeat: Infinity, duration: 0.5 } },
    celebrate: { rotate: -150, y: -10 },
    angry: { rotate: -30 },
    run: { rotate: [-40, 40, -40], transition: { repeat: Infinity, duration: 0.4 } },
    tieRakhi: { rotate: 50, x: 10, y: -5 },
    giveGift: { rotate: 40, x: 10 },
    sit: { rotate: -20 },
    default: { rotate: 0 }
  }

  const armRightVariants: any = {
    idle: { rotate: 0 },
    wave: { rotate: 0 },
    celebrate: { rotate: 150, y: -10 },
    angry: { rotate: 30 },
    run: { rotate: [40, -40, 40], transition: { repeat: Infinity, duration: 0.4 } },
    tieRakhi: { rotate: 60, x: -5, y: -10 },
    receiveGift: { rotate: 40 },
    sit: { rotate: 20 },
    default: { rotate: 0 }
  }

  const headVariants: any = {
    idle: { rotate: [0, -2, 0], transition: { repeat: Infinity, duration: 3.5, ease: "easeInOut" } },
    laugh: { rotate: [5, -5, 5], transition: { repeat: Infinity, duration: 0.4 } },
    surprised: { y: -5 },
    angry: { rotate: -5 },
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
        
        {/* Legs (Dress/Salwar) */}
        <path d="M 30,120 L 45,180 L 55,180 L 70,120 Z" fill="#b91c1c" />
        
        {/* Left Arm (Behind Body) */}
        <motion.g variants={armLeftVariants} animate={state} style={{ transformOrigin: '40px 70px' }}>
          <rect x="30" y="65" width="8" height="55" rx="4" fill="#991b1b" />
          <circle cx="34" cy="120" r="4" fill="#fed7aa" />
        </motion.g>

        {/* Body/Dress (Crimson/Red) */}
        <path d="M 35,60 Q 50,50 65,60 L 75,130 Q 50,140 25,130 Z" fill="#dc2626" />
        {/* Scarf / Dupatta Details */}
        <path d="M 35,60 C 20,80 20,120 40,130 C 35,110 40,70 50,60 Z" fill="#fcd34d" opacity="0.9" />

        {/* Head & Neck */}
        <rect x="46" y="45" width="8" height="15" fill="#fed7aa" />
        <motion.g variants={headVariants} animate={state} style={{ transformOrigin: '50px 30px' }}>
          <circle cx="50" cy="30" r="18" fill="#fed7aa" />
          {/* Hair (Longer/Different style) */}
          <path d="M 32,30 C 20,-10 80,-10 68,30 C 75,60 80,80 65,90 C 70,60 65,30 50,20 C 35,30 30,60 35,90 C 20,80 25,60 32,30 Z" fill="#291204" />
          
          {/* Face (Simple expressions) */}
          {state === 'angry' ? (
            <>
              <line x1="39" y1="26" x2="44" y2="28" stroke="#291204" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="61" y1="26" x2="56" y2="28" stroke="#291204" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="42" cy="30" r="1.5" fill="#291204" />
              <circle cx="58" cy="30" r="1.5" fill="#291204" />
            </>
          ) : state === 'surprised' ? (
            <>
              <circle cx="42" cy="28" r="2.5" fill="#291204" />
              <circle cx="58" cy="28" r="2.5" fill="#291204" />
              <circle cx="50" cy="38" r="3" fill="#291204" />
            </>
          ) : state === 'laugh' ? (
            <>
              <path d="M 39,28 Q 42,26 44,28" fill="none" stroke="#291204" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 56,28 Q 58,26 61,28" fill="none" stroke="#291204" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 45,36 Q 50,42 55,36" fill="none" stroke="#291204" strokeWidth="1.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="42" cy="28" r="1.5" fill="#291204" />
              <circle cx="58" cy="28" r="1.5" fill="#291204" />
              <path d="M 47,36 Q 50,38 53,36" fill="none" stroke="#291204" strokeWidth="1" strokeLinecap="round" />
            </>
          )}
        </motion.g>

        {/* Right Arm (In front of Body) */}
        <motion.g variants={armRightVariants} animate={state} style={{ transformOrigin: '60px 70px' }}>
          <rect x="62" y="65" width="8" height="55" rx="4" fill="#dc2626" />
          <circle cx="66" cy="120" r="4" fill="#fed7aa" />
        </motion.g>
        
      </motion.svg>
    </motion.div>
  )
}
