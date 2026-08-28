import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type SecretContextType = {
  discoveredCount: number
  discoverSecret: (id: string) => void
  hasDiscovered: (id: string) => boolean
  isSecretUnlocked: boolean
  totalSecrets: number
}

const SecretContext = createContext<SecretContextType | undefined>(undefined)

export function SecretProvider({ children }: { children: ReactNode }) {
  const [discovered, setDiscovered] = useState<Set<string>>(new Set())

  const discoverSecret = (id: string) => {
    setDiscovered(prev => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  const hasDiscovered = (id: string) => discovered.has(id)
  
  const totalSecrets = 4
  const isSecretUnlocked = discovered.size >= totalSecrets

  return (
    <SecretContext.Provider value={{
      discoveredCount: discovered.size,
      discoverSecret,
      hasDiscovered,
      isSecretUnlocked,
      totalSecrets
    }}>
      {children}
    </SecretContext.Provider>
  )
}

export function useSecret() {
  const context = useContext(SecretContext)
  if (context === undefined) {
    throw new Error('useSecret must be used within a SecretProvider')
  }
  return context
}
