'use client'

import Avatar from '../ui/Avatar'
import type { Character } from '../../lib/types/character'

interface ChatHeaderProps {
  character: Character
  onScreenshot?: () => void
}

export default function ChatHeader({ character, onScreenshot }: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-200/50 shadow-sm px-4 py-3">
      <div className="flex items-center gap-3">
        <Avatar
          src={character.avatar}
          alt={character.name}
          size={48}
          ring
          ringColor="ring-pink-300"
          className="shadow-md"
          priority
        />
        <div className="flex-1 min-w-0">
          <h1 className="font-bold text-lg text-gray-800 truncate">{character.name}</h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500">線上</span>
          </div>
        </div>
        {onScreenshot && (
          <button
            onClick={onScreenshot}
            className="p-2 rounded-full hover:bg-pink-100 transition-colors text-gray-600 hover:text-pink-600"
            title="截圖對話"
            aria-label="截圖對話"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>
        )}
      </div>
    </header>
  )
}

