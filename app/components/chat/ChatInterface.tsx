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

  // Save messages to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0 && character.id) {
      const storageKey = `chat_${character.id}`
      try {
        // Convert messages to serializable format
        const messagesToSave = messages.map((msg: Message) => ({
          id: msg.id,
          text: msg.text,
          sender: msg.sender,
          timestamp: msg.timestamp.toISOString(),
        }))
        localStorage.setItem(storageKey, JSON.stringify(messagesToSave))
      } catch (error) {
        console.error('Error saving messages to localStorage:', error)
      }
    }
  }, [messages, character.id])

  // Update character when characterId changes
  useEffect(() => {
    const selectedCharacter = characterId 
      ? (getCharacterById(characterId) || getDefaultCharacter())
      : getDefaultCharacter()
    
    setCharacter(selectedCharacter)
    
    // Try to load saved messages from localStorage
    if (typeof window !== 'undefined' && selectedCharacter.id) {
      const storageKey = `chat_${selectedCharacter.id}`
      try {
        const savedMessages = localStorage.getItem(storageKey)
        if (savedMessages) {
          const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }))
          
          // Only restore if we have saved messages
          if (parsedMessages.length > 0) {
            setMessages(parsedMessages)
            return // Don't set initial message if we have saved messages
          }
        }
      } catch (error) {
        console.error('Error loading messages from localStorage:', error)
      }
    }
    
    // Get initial message based on adult mode - randomly select from array
    const getRandomMessage = (messages: string[]) => {
      if (!messages || messages.length === 0) return ''
      return messages[Math.floor(Math.random() * messages.length)]
    }

    const initialMsgArray = isAdult && selectedCharacter.initialMessageAdult
      ? (selectedCharacter.initialMessageAdult['zh-TW'] || selectedCharacter.initialMessageAdult['en'] || selectedCharacter.initialMessage['zh-TW'] || selectedCharacter.initialMessage['en'])
      : (selectedCharacter.initialMessage['zh-TW'] || selectedCharacter.initialMessage['en'])
    
    const initialMsg = Array.isArray(initialMsgArray) 
      ? getRandomMessage(initialMsgArray)
      : initialMsgArray
    
    // Reset messages with new character's initial message
    setMessages([
    {
      id: '1',
        text: initialMsg,
      sender: 'character',
      timestamp: new Date(),
    },
  ])
  }, [characterId, isAdult])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Clear chat function
  const handleClearChat = () => {
    if (typeof window !== 'undefined' && character.id) {
      const storageKey = `chat_${character.id}`
      localStorage.removeItem(storageKey)
      
      // Reset to initial message
      const getRandomMessage = (messages: string[]) => {
        if (!messages || messages.length === 0) return ''
        return messages[Math.floor(Math.random() * messages.length)]
      }

      const initialMsgArray = isAdult && character.initialMessageAdult
        ? (character.initialMessageAdult['zh-TW'] || character.initialMessageAdult['en'] || character.initialMessage['zh-TW'] || character.initialMessage['en'])
        : (character.initialMessage['zh-TW'] || character.initialMessage['en'])
      
      const initialMsg = Array.isArray(initialMsgArray) 
        ? getRandomMessage(initialMsgArray)
        : initialMsgArray
      
      setMessages([
        {
          id: '1',
          text: initialMsg,
          sender: 'character',
          timestamp: new Date(),
        },
      ])
    }
  }

  // Generate screenshot of last 10 messages
  const handleScreenshot = async () => {
    try {
      // Dynamically import html2canvas
      const html2canvas = (await import('html2canvas')).default
      
      // Get last 10 messages
      const last10Messages = messages.slice(-10)
      
      if (last10Messages.length === 0) {
        alert('沒有對話內容可以截圖')
        return
      }

      // Create a temporary container for screenshot
      const tempContainer = document.createElement('div')
      tempContainer.style.position = 'absolute'
      tempContainer.style.left = '-9999px'
      tempContainer.style.width = '400px'
      tempContainer.style.backgroundColor = '#fdf2f8'
      tempContainer.style.padding = '24px'
      tempContainer.style.fontFamily = 'system-ui, -apple-system, sans-serif'
      
      // Add character header with avatar image
      const headerDiv = document.createElement('div')
      headerDiv.style.marginBottom = '16px'
      headerDiv.style.paddingBottom = '12px'
      headerDiv.style.borderBottom = '1px solid #fce7f3'
      
      const headerContentDiv = document.createElement('div')
      headerContentDiv.style.display = 'flex'
      headerContentDiv.style.alignItems = 'center'
      headerContentDiv.style.gap = '12px'
      
      // Create avatar image
      const avatarImg = document.createElement('img')
      // Convert relative path to absolute URL if needed
      const avatarSrc = character.avatar.startsWith('http') 
        ? character.avatar 
        : `${window.location.origin}${character.avatar}`
      avatarImg.src = avatarSrc
      avatarImg.alt = character.name
      avatarImg.style.width = '48px'
      avatarImg.style.height = '48px'
      avatarImg.style.borderRadius = '50%'
      avatarImg.style.objectFit = 'cover'
      avatarImg.style.border = '2px solid #fce7f3'
      avatarImg.crossOrigin = 'anonymous'
      
      // Wait for avatar image to load
      await new Promise<void>((resolve) => {
        if (avatarImg.complete) {
          resolve()
        } else {
          avatarImg.onload = () => resolve()
          avatarImg.onerror = () => resolve() // Continue even if image fails to load
        }
      })
      
      const characterInfoDiv = document.createElement('div')
      characterInfoDiv.innerHTML = `
        <div style="font-weight: bold; font-size: 18px; color: #1f2937;">${character.name}</div>
        <div style="font-size: 12px; color: #6b7280;">線上</div>
      `
      
      headerContentDiv.appendChild(avatarImg)
      headerContentDiv.appendChild(characterInfoDiv)
      headerDiv.appendChild(headerContentDiv)
      tempContainer.appendChild(headerDiv)

      // Add messages with avatars
      for (const message of last10Messages) {
        const messageDiv = document.createElement('div')
        messageDiv.style.marginBottom = '16px'
        messageDiv.style.display = 'flex'
        messageDiv.style.flexDirection = message.sender === 'user' ? 'row-reverse' : 'row'
        messageDiv.style.gap = '12px'
        messageDiv.style.alignItems = 'flex-start'

        // Add avatar for character messages only (user messages don't show avatar)
        if (message.sender === 'character') {
          const avatarImg = document.createElement('img')
          // Convert relative path to absolute URL if needed
          const avatarSrc = character.avatar.startsWith('http') 
            ? character.avatar 
            : `${window.location.origin}${character.avatar}`
          avatarImg.src = avatarSrc
          avatarImg.alt = character.name
          avatarImg.style.width = '40px'
          avatarImg.style.height = '40px'
          avatarImg.style.borderRadius = '50%'
          avatarImg.style.objectFit = 'cover'
          avatarImg.style.border = '2px solid #fce7f3'
          avatarImg.style.flexShrink = '0'
          avatarImg.crossOrigin = 'anonymous'
          
          // Wait for avatar to load
          await new Promise<void>((resolve) => {
            if (avatarImg.complete) {
              resolve()
            } else {
              avatarImg.onload = () => resolve()
              avatarImg.onerror = () => resolve()
            }
          })
          
          messageDiv.appendChild(avatarImg)
        }
        // User messages don't have avatars in screenshot

        const bubbleDiv = document.createElement('div')
        bubbleDiv.style.maxWidth = '75%'
        bubbleDiv.style.padding = '12px 16px'
        bubbleDiv.style.borderRadius = '16px'
        bubbleDiv.style.fontSize = '14px'
        bubbleDiv.style.lineHeight = '1.5'
        
        if (message.sender === 'user') {
          bubbleDiv.style.background = 'linear-gradient(135deg, #ec4899, #a855f7)'
          bubbleDiv.style.color = 'white'
        } else {
          bubbleDiv.style.backgroundColor = 'white'
          bubbleDiv.style.color = '#1f2937'
          bubbleDiv.style.border = '1px solid #fce7f3'
        }

        const textDiv = document.createElement('div')
        textDiv.textContent = message.text
        textDiv.style.whiteSpace = 'pre-wrap'
        textDiv.style.wordBreak = 'break-word'
        bubbleDiv.appendChild(textDiv)

        const timeDiv = document.createElement('div')
        timeDiv.textContent = message.timestamp.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
        timeDiv.style.fontSize = '11px'
        timeDiv.style.opacity = '0.7'
        timeDiv.style.marginTop = '4px'
        bubbleDiv.appendChild(timeDiv)

        messageDiv.appendChild(bubbleDiv)
        tempContainer.appendChild(messageDiv)
      }

      // Add watermark
      const watermarkDiv = document.createElement('div')
      watermarkDiv.style.marginTop = '24px'
      watermarkDiv.style.paddingTop = '16px'
      watermarkDiv.style.borderTop = '1px solid #fce7f3'
      watermarkDiv.style.textAlign = 'center'
      watermarkDiv.style.color = '#9ca3af'
      watermarkDiv.style.fontSize = '12px'
      watermarkDiv.textContent = 'asuna.world'
      tempContainer.appendChild(watermarkDiv)

      document.body.appendChild(tempContainer)

      // Generate canvas
      const canvas = await html2canvas(tempContainer, {
        backgroundColor: '#fdf2f8',
        scale: 2,
        logging: false,
        useCORS: true,
      })

      // Remove temp container
      document.body.removeChild(tempContainer)

      // Create image and download
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `chat-screenshot-${Date.now()}.png`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
        }
      }, 'image/png')
    } catch (error) {
      console.error('Error generating screenshot:', error)
      alert('截圖失敗，請確認已安裝 html2canvas 套件：npm install html2canvas')
    }
  }

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
      <ChatHeader character={character} onScreenshot={handleScreenshot} onClearChat={handleClearChat} />

      <main ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
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

