'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { detectBrowserLanguage, getTranslations, type Language, type Translations } from '../utils/language'

interface LanguageContextType {
  language: Language
  translations: Translations
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [translations, setTranslations] = useState<Translations>(getTranslations('en'))

  useEffect(() => {
    const detectedLang = detectBrowserLanguage()
    setLanguageState(detectedLang)
    setTranslations(getTranslations(detectedLang))
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    setTranslations(getTranslations(lang))
  }

  return (
    <LanguageContext.Provider value={{ language, translations, setLanguage }}>
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

