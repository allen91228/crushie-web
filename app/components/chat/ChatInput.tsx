'use client'

import { Send } from 'lucide-react'

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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <footer className="sticky bottom-0 z-50 bg-white/90 backdrop-blur-md border-t border-pink-200/50 shadow-lg px-4 py-4">
      <div className="flex gap-3 items-center">
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

