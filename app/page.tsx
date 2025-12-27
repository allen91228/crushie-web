'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AdBanner from './components/layout/AdBanner'
import Footer from './components/layout/Footer'
import { useLanguage } from './contexts/LanguageContext'
import CharacterSelector from './components/chat/CharacterSelector'

export default function Home() {
  const { translations, language } = useLanguage()
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
          <div 
            className="w-full h-full bg-gradient-to-br from-romantic-purple via-purple-900 to-dark-gray"
            style={{
              backgroundImage: 'url(https://placehold.co/600x800/6B46C1/FFFFFF?text=Crushie)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
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

      {/* Meet the Characters Section */}
      <section className="relative z-10 bg-dark-gray py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-neon-pink to-purple-400 bg-clip-text text-transparent">
            {translations.meetCharactersTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Character 1: 顧承澤 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-900/50 hover:border-neon-pink/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <Image
                  src="/characters/GuCheng-ze.png"
                  alt={translations.character1Name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-gray/90 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-6 bg-dark-gray/50">
                <div className="mb-3">
                  <h3 className="text-2xl font-bold text-white mb-1">{translations.character1Name}</h3>
                  <span className="text-sm text-purple-300 font-medium">{translations.character1Tag}</span>
                </div>
                <p className="text-gray-300 italic mb-6 text-sm leading-relaxed">
                  &ldquo;{translations.character1Quote}&rdquo;
                </p>
                <Link
                  href="/chat?character=gu-chengze"
                  className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full text-center transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {translations.chatNow}
                </Link>
              </div>
            </div>

            {/* Character 2: 蘇墨 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-900/50 hover:border-neon-pink/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-purple-900/50">
                <Image
                  src="/characters/SuMo.png"
                  alt={translations.character2Name}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-gray/90 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-6 bg-dark-gray/50">
                <div className="mb-3">
                  <h3 className="text-2xl font-bold text-white mb-1">{translations.character2Name}</h3>
                  <span className="text-sm text-purple-300 font-medium">{translations.character2Tag}</span>
                </div>
                <p className="text-gray-300 italic mb-6 text-sm leading-relaxed">
                  &ldquo;{translations.character2Quote}&rdquo;
                </p>
                <Link
                  href="/chat?character=su-mo"
                  className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full text-center transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {translations.chatNow}
                </Link>
              </div>
            </div>

            {/* Character 3: 雷杰 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-900/50 hover:border-neon-pink/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <Image
                  src="/characters/Ray.png"
                  alt={translations.character3Name}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-gray/90 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-6 bg-dark-gray/50">
                <div className="mb-3">
                  <h3 className="text-2xl font-bold text-white mb-1">{translations.character3Name}</h3>
                  <span className="text-sm text-purple-300 font-medium">{translations.character3Tag}</span>
                </div>
                <p className="text-gray-300 italic mb-6 text-sm leading-relaxed">
                  &ldquo;{translations.character3Quote}&rdquo;
                </p>
                <Link
                  href="/chat?character=ray"
                  className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full text-center transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {translations.chatNow}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Love Stories / Blog Section */}
      <section className="relative z-10 bg-dark-gray py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-neon-pink to-purple-400 bg-clip-text text-transparent">
            {translations.loveStoriesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <article className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-900/50 hover:border-neon-pink/50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-purple-900 to-pink-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/30 text-4xl font-bold">Blog 1</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">The Secret Side of Gu Chengze</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  Behind the cold exterior of the CEO lies a heart that beats only for you. Discover how this dominant character shows his affection in ways that will make your heart race...
                </p>
                <Link
                  href="#"
                  className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-sm rounded-full transition-all duration-300"
                >
                  {translations.readMore}
                </Link>
              </div>
            </article>

            {/* Blog Post 2 */}
            <article className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-900/50 hover:border-neon-pink/50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-purple-900 to-pink-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/30 text-4xl font-bold">Blog 2</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Understanding Ray's Wild Heart</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  The bad boy with a golden heart. Learn how Ray's rebellious nature hides deep emotions and how he expresses love in his own unique way that will leave you breathless...
                </p>
                <Link
                  href="#"
                  className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-sm rounded-full transition-all duration-300"
                >
                  {translations.readMore}
                </Link>
              </div>
            </article>

            {/* Blog Post 3 */}
            <article className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-900/50 hover:border-neon-pink/50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-purple-900 to-pink-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/30 text-4xl font-bold">Blog 3</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Su Mo's Intellectual Romance</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  When logic meets emotion. Explore how the intellectual character expresses love through scientific concepts and philosophical thoughts, creating a romance that's both deep and intriguing...
                </p>
                <Link
                  href="#"
                  className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-sm rounded-full transition-all duration-300"
                >
                  {translations.readMore}
                </Link>
              </div>
            </article>
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

