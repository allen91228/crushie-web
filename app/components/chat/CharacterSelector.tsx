'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../contexts/LanguageContext'
import { characters } from '../../lib/data/characters'
import type { Character } from '../../lib/types/character'
import Image from 'next/image'

interface CharacterSelectorProps {
  onSelect?: (character: Character) => void
}

export default function CharacterSelector({ onSelect }: CharacterSelectorProps) {
  const router = useRouter()
  const { translations, language } = useLanguage()
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)

  const handleSelect = (character: Character) => {
    setSelectedCharacter(character)
    if (onSelect) {
      onSelect(character)
    } else {
      // Store selected character in sessionStorage and navigate
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('selectedCharacter', character.id)
      }
      router.push(`/chat?character=${character.id}`)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-purple-200">
        {translations.chooseYourCrush}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {characters.map((character) => (
          <div
            key={character.id}
            onClick={() => handleSelect(character)}
            className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
              selectedCharacter?.id === character.id ? 'ring-4 ring-neon-pink' : ''
            }`}
          >
            <div className="glass rounded-2xl overflow-hidden border border-purple-900/50 hover:border-neon-pink/50">
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  priority
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-gray/90 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">{character.name}</h3>
                <p className="text-sm text-purple-200 line-clamp-2">
                  {character.description}
                </p>
              </div>
            </div>
            {selectedCharacter?.id === character.id && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-neon-pink rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedCharacter && (
        <div className="mt-8 text-center">
          <button
            onClick={() => handleSelect(selectedCharacter)}
            className="px-8 py-4 bg-gradient-purple rounded-full text-white font-semibold text-lg shadow-2xl transform transition-all duration-300 hover:scale-105"
          >
            {translations.startChatting}
          </button>
        </div>
      )}
    </div>
  )
}

