'use client'

import { useState, useRef, useEffect } from 'react'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import type { Character } from '../../lib/types/character'
import type { Message } from '../../lib/types/message'
import { getDefaultCharacter } from '../../lib/data/characters'

interface ChatInterfaceProps {
  characterId?: string
}

export default function ChatInterface({ characterId }: ChatInterfaceProps) {
  const [character] = useState<Character>(getDefaultCharacter())
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: character.initialMessage['zh-TW'] || character.initialMessage['en'],
      sender: 'character',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev: Message[]) => [...prev, userMessage])
    setInputValue('')

    // Simple auto-reply (can be replaced with API call later)
    setTimeout(() => {
      const characterMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '我收到你的訊息了，讓我好好思考一下...',
        sender: 'character',
        timestamp: new Date(),
      }
      setMessages((prev: Message[]) => [...prev, characterMessage])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 overflow-hidden">
      <ChatHeader character={character} />

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} character={character} />
        ))}
        <div ref={messagesEndRef} />
      </main>

      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
      />
    </div>
  )
}

