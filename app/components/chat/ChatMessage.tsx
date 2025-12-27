'use client'

import Avatar from '../ui/Avatar'
import type { Message } from '../../lib/types/message'
import type { Character } from '../../lib/types/character'

interface ChatMessageProps {
  message: Message
  character: Character
}

export default function ChatMessage({ message, character }: ChatMessageProps) {
  const isUser = message.sender === 'user'

  return (
    <div
      className={`flex gap-3 ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isUser && (
        <Avatar
          src={character.avatar}
          alt={character.name}
          size={40}
          ring
          ringColor="ring-pink-300"
          className="shadow-md"
        />
      )}
      <div
        className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-4 py-3 shadow-md ${
          isUser
            ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white'
            : 'bg-white text-gray-800 border border-pink-100'
        }`}
      >
        <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
          {message.text}
        </p>
        <span className="text-xs opacity-70 mt-1 block">
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
      {isUser && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md ring-2 ring-pink-300">
          <span className="text-white text-sm font-semibold">你</span>
        </div>
      )}
    </div>
  )
}

