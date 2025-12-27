'use client'

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import Image from 'next/image'
import { getDefaultCharacter, type Character } from '../utils/characters'

interface Message {
  id: string
  text: string
  sender: 'user' | 'character'
  timestamp: Date
}

export default function ChatPage() {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 overflow-hidden">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-200/50 shadow-sm px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-pink-300 shadow-md flex-shrink-0">
            <Image
              src={character.avatar}
              alt={character.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-lg text-gray-800 truncate">{character.name}</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">線上</span>
            </div>
          </div>
        </div>
      </header>

      {/* Scrollable Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender === 'character' && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-pink-300 shadow-md flex-shrink-0">
                <Image
                  src={character.avatar}
                  alt={character.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
            )}
            <div
              className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-4 py-3 shadow-md ${
                message.sender === 'user'
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
            {message.sender === 'user' && (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md ring-2 ring-pink-300">
                <span className="text-white text-sm font-semibold">你</span>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      {/* Sticky Input Area */}
      <footer className="sticky bottom-0 z-50 bg-white/90 backdrop-blur-md border-t border-pink-200/50 shadow-lg px-4 py-4">
        <div className="flex gap-3 items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="輸入訊息..."
            className="flex-1 bg-pink-50/50 border border-pink-200 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent text-gray-800 placeholder-gray-400 shadow-sm"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shadow-md hover:shadow-lg"
            aria-label="傳送訊息"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </footer>
    </div>
  )
}
