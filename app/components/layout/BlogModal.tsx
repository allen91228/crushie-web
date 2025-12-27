'use client'

import { useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

interface BlogModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
}

export default function BlogModal({ isOpen, onClose, title, content }: BlogModalProps) {
  const { translations } = useLanguage()
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Split content by newlines to render paragraphs
  const paragraphs = content.split('\n\n').filter(p => p.trim())

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-dark-gray rounded-2xl border border-purple-900/50 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-purple-900/50 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-white pr-4">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="prose prose-invert max-w-none">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-300 text-base md:text-lg leading-relaxed mb-4 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-purple-900/50 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
          >
            {translations.close}
          </button>
        </div>
      </div>
    </div>
  )
}
