'use client'

import { useState } from 'react'
import { Send, Dice5 } from 'lucide-react'

// Conversation starters array
const CONVERSATION_STARTERS = [
  // Romantic
  '我好像有點想你了...',
  '你覺得愛是什麼？',
  '可以抱抱我嗎？',
  '你喜歡什麼樣的人？',
  '我們在一起多久了？',
  
  // Playful
  '*突然捏你的臉*',
  '猜猜我現在在做什麼？',
  '如果不當總裁/醫生，你想做什麼？',
  '你今天看起來特別帥/美',
  '陪我玩個遊戲吧！',
  
  // Drama
  '我今天心情不太好...',
  '你有瞞著我什麼秘密嗎？',
  '*盯著你看*',
  '我們會不會有一天分開？',
  '如果有一天我消失了，你會找我嗎？',
  
  // Random
  '如果你能擁有一種超能力，你會選什麼？',
  '今晚想吃什麼？',
  '你最喜歡的季節是什麼？',
  '如果能回到過去，你想改變什麼？',
  '告訴我一個你從未告訴過任何人的秘密',
]

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  placeholder?: string
  disabled?: boolean
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  placeholder = '輸入訊息...',
  disabled = false,
}: ChatInputProps) {
  const [isRolling, setIsRolling] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Crucial fix for Chinese IME: don't send if user is still composing
      if (e.nativeEvent.isComposing) {
        return
      }
      e.preventDefault()
      onSend()
    }
  }

  const handleDiceRoll = () => {
    if (disabled) return
    
    // Start rolling animation
    setIsRolling(true)
    
    // Randomly select a conversation starter
    const randomStarter = CONVERSATION_STARTERS[
      Math.floor(Math.random() * CONVERSATION_STARTERS.length)
    ]
    
    // Set the input value to the selected starter
    onChange(randomStarter)
    
    // Stop rolling animation after a short delay
    setTimeout(() => {
      setIsRolling(false)
    }, 500)
  }

  return (
    <footer className="sticky bottom-0 z-50 bg-white/90 backdrop-blur-md border-t border-pink-200/50 shadow-lg px-4 py-4">
      <div className="flex gap-3 items-center">
        <button
          onClick={handleDiceRoll}
          disabled={disabled}
          className="p-2 text-gray-400 hover:text-pink-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="隨機話題"
          title="隨機話題"
        >
          <Dice5 
            className={`w-5 h-5 ${isRolling ? 'animate-spin' : ''}`}
          />
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-pink-50/50 border border-pink-200 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent text-gray-800 placeholder-gray-400 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          onClick={onSend}
          disabled={!value.trim() || disabled}
          className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shadow-md hover:shadow-lg"
          aria-label="傳送訊息"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </footer>
  )
}

