'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import AdBanner from '../components/AdBanner'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ethan'
  timestamp: Date
}

// Mock AI response generator
const getEthanResponse = (userMessage: string): string => {
  const responses = [
    "Why are you bothering me at this hour?",
    "Fine, come here.",
    "You're being annoying, but I can't help but respond...",
    "What do you want now?",
    "I'm busy, but I suppose I can spare a moment for you.",
    "Don't think I care, but I'm listening.",
    "You're persistent, I'll give you that.",
    "Fine, you got my attention. What is it?",
    "I was just thinking about you... not that it matters.",
    "You're lucky I'm responding at all.",
  ]
  
  // Simple logic: return a random response for now
  return responses[Math.floor(Math.random() * responses.length)]
}

export default function ChatPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "You messaged me. What do you want?",
      sender: 'ethan',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate API delay (1-2 seconds)
    const delay = Math.random() * 1000 + 1000
    await new Promise((resolve) => setTimeout(resolve, delay))

    const ethanResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getEthanResponse(userMessage.text),
      sender: 'ethan',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, ethanResponse])
    setIsLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-dark-gray">
      {/* Header */}
      <div className="glass border-b border-purple-900/50 px-4 py-3 flex items-center gap-3 z-40">
        <button
          onClick={() => router.push('/')}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-neon-pink">
          <Image
            src="https://placehold.co/100x100/6B46C1/FFFFFF?text=E"
            alt="Ethan"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-lg">Ethan</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">Online</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 pb-32">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender === 'ethan' && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-neon-pink flex-shrink-0">
                <Image
                  src="https://placehold.co/100x100/6B46C1/FFFFFF?text=E"
                  alt="Ethan"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            )}
            <div
              className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-gradient-purple text-white'
                  : 'bg-gray-800 text-gray-100'
              }`}
            >
              <p className="text-sm md:text-base">{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            {message.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gradient-purple flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">Y</span>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-neon-pink flex-shrink-0">
              <Image
                src="https://placehold.co/100x100/6B46C1/FFFFFF?text=E"
                alt="Ethan"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="bg-gray-800 rounded-2xl px-4 py-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Above Ad Banner */}
      <div className="glass border-t border-purple-900/50 px-4 py-3 z-40 pb-20">
        <div className="flex gap-3 items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-white/10 border border-purple-900/50 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-pink text-white placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="p-3 bg-gradient-purple rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Ad Banner - Fixed at bottom */}
      <AdBanner />
    </div>
  )
}

