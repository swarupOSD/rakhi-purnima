import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type Language = 'bn' | 'en'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (bnString: string, enString: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('bn') // Default Bengali

  useEffect(() => {
    const saved = localStorage.getItem('rakhi_language') as Language
    if (saved === 'bn' || saved === 'en') {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('rakhi_language', lang)
  }

  // Helper for inline translation
  const t = (bnString: string, enString: string) => {
    return language === 'bn' ? bnString : enString
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
