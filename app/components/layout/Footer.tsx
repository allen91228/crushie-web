'use client'

import Link from 'next/link'
import { useLanguage } from '../../contexts/LanguageContext'

export default function Footer() {
  const { translations } = useLanguage()

  return (
    <footer className="bg-dark-gray border-t border-purple-900/50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} Crushie Web. {translations.allRightsReserved}
          </div>
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy-policy"
              className="text-purple-300 hover:text-neon-pink transition-colors"
            >
              {translations.privacyPolicy}
            </Link>
            <Link
              href="/terms-of-service"
              className="text-purple-300 hover:text-neon-pink transition-colors"
            >
              {translations.termsOfService}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

