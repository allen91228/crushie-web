'use client'

import Avatar from '../ui/Avatar'
import type { Character } from '../../lib/types/character'

interface ChatHeaderProps {
  character: Character
}

export default function ChatHeader({ character }: ChatHeaderProps) {
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
        />
        <div className="flex-1 min-w-0">
          <h1 className="font-bold text-lg text-gray-800 truncate">{character.name}</h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500">線上</span>
          </div>
        </div>
      </div>
    </header>
  )
}

