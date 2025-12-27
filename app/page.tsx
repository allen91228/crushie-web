'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import AdBanner from './components/AdBanner'
import Footer from './components/Footer'
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
    <div className="relative min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://placehold.co/600x800/6B46C1/FFFFFF?text=Crushie"
            alt="Background"
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
            onError={(e) => {
              console.error('Background image load error')
            }}
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
      </div>

      {/* Features Section */}
      <section className="relative z-10 bg-dark-gray py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-neon-pink to-purple-400 bg-clip-text text-transparent">
            {translations.featuresTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass rounded-2xl p-6 border border-purple-900/50 hover:border-neon-pink/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-purple rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{translations.feature1Title}</h3>
              <p className="text-gray-300">{translations.feature1Desc}</p>
            </div>
            <div className="glass rounded-2xl p-6 border border-purple-900/50 hover:border-neon-pink/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-purple rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{translations.feature2Title}</h3>
              <p className="text-gray-300">{translations.feature2Desc}</p>
            </div>
            <div className="glass rounded-2xl p-6 border border-purple-900/50 hover:border-neon-pink/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-purple rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{translations.feature3Title}</h3>
              <p className="text-gray-300">{translations.feature3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 bg-dark-gray/95 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-neon-pink to-purple-400 bg-clip-text text-transparent">
            {translations.faqTitle}
          </h2>
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 border border-purple-900/50">
              <h3 className="text-xl font-semibold text-white mb-2">{translations.faq1Question}</h3>
              <p className="text-gray-300">{translations.faq1Answer}</p>
            </div>
            <div className="glass rounded-2xl p-6 border border-purple-900/50">
              <h3 className="text-xl font-semibold text-white mb-2">{translations.faq2Question}</h3>
              <p className="text-gray-300">{translations.faq2Answer}</p>
            </div>
            <div className="glass rounded-2xl p-6 border border-purple-900/50">
              <h3 className="text-xl font-semibold text-white mb-2">{translations.faq3Question}</h3>
              <p className="text-gray-300">{translations.faq3Answer}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Ad Banner */}
      <AdBanner />
    </div>
  )
}

