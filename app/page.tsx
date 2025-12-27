'use client'

import { useEffect, useState } from 'react'
import AdBanner from './components/AdBanner'
import { useLanguage } from './contexts/LanguageContext'
import CharacterSelector from './components/CharacterSelector'

export default function Home() {
  const { translations } = useLanguage()
  const [showCharacterSelector, setShowCharacterSelector] = useState(false)
  const [isPulsing, setIsPulsing] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing((prev) => !prev)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://placehold.co/600x800/6B46C1/FFFFFF?text=Crushie"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-gray via-purple-900/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pb-32">
        {!showCharacterSelector ? (
          <div className="text-center space-y-6 max-w-md">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-neon-pink to-purple-400 bg-clip-text text-transparent">
              {translations.landingTitle}
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 font-medium">
              {translations.landingSubtitle}
            </p>
            <button
              onClick={() => setShowCharacterSelector(true)}
              className={`mt-8 px-8 py-4 bg-gradient-purple rounded-full text-white font-semibold text-lg shadow-2xl transform transition-all duration-300 hover:scale-105 ${
                isPulsing ? 'animate-pulse' : ''
              }`}
            >
              {translations.startChatting}
            </button>
          </div>
        ) : (
          <CharacterSelector />
        )}
      </div>

      {/* Ad Banner */}
      <AdBanner />
    </div>
  )
}

