import { motion, useScroll, useTransform } from 'framer-motion'

export default function GlobalThread() {
  const { scrollYProgress } = useScroll()
  
  // Transform scroll progress into path length and opacity
  const pathLength = useTransform(scrollYProgress, [0, 1], [0.05, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 0.5, 0.5, 0])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex justify-center">
      <motion.svg
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        className="w-full max-w-[2px] h-[150vh] absolute top-[-25vh]"
        style={{ opacity }}
      >
        <motion.path
          d="M 50 0 C 50 200, 50 400, 50 1000"
          stroke="var(--color-crimson)"
          strokeWidth="2"
          fill="none"
          style={{ pathLength }}
        />
      </motion.svg>
    </div>
  )
}
