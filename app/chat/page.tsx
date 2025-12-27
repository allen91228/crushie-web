'use client'

import { useEffect, useState } from 'react'
import ChatInterface from '../components/chat/ChatInterface'

export default function ChatPage() {
  const [characterId, setCharacterId] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setCharacterId(params.get('character') || undefined)
    }
  }, [])
  
  return <ChatInterface characterId={characterId} />
}
