'use client'

import { useState, useRef, useEffect } from 'react'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import type { Character } from '../../lib/types/character'
import type { Message } from '../../lib/types/message'
import { getCharacterById, getDefaultCharacter } from '../../lib/data/characters'

interface ChatInterfaceProps {
  characterId?: string
}

export default function ChatInterface({ characterId }: ChatInterfaceProps) {
  const [character, setCharacter] = useState<Character>(getDefaultCharacter())
  const [messages, setMessages] = useState<Message[]>([])
  const [isAdult, setIsAdult] = useState(false)

  // Read isAdult from sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedIsAdult = sessionStorage.getItem('isAdult')
      setIsAdult(storedIsAdult === 'true')
    }
  }, [])

  // Update character when characterId changes
  useEffect(() => {
    const selectedCharacter = characterId 
      ? (getCharacterById(characterId) || getDefaultCharacter())
      : getDefaultCharacter()
    
    setCharacter(selectedCharacter)
    
    // Reset messages with new character's initial message
    setMessages([
      {
        id: '1',
        text: selectedCharacter.initialMessage['zh-TW'] || selectedCharacter.initialMessage['en'],
        sender: 'character',
        timestamp: new Date(),
      },
    ])
  }, [characterId])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev: Message[]) => [...prev, userMessage])
    setInputValue('')

    // Call API to get character response
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characterId: character.id,
          messages: [...messages, userMessage].map(msg => ({
            text: msg.text,
            sender: msg.sender,
          })),
          language: 'zh-TW',
          isAdult: isAdult,
        }),
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()
      const characterMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || '我收到你的訊息了，讓我好好思考一下...',
        sender: 'character',
        timestamp: new Date(),
      }
      setMessages((prev: Message[]) => [...prev, characterMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      // Fallback message on error
      const characterMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '我收到你的訊息了，讓我好好思考一下...',
        sender: 'character',
        timestamp: new Date(),
      }
      setMessages((prev: Message[]) => [...prev, characterMessage])
    }
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

