// Cookie storage utilities for chat messages

export interface Message {
  id: string
  text: string
  sender: 'user' | 'character'
  timestamp: Date
}

const COOKIE_NAME = 'crushie_chat_history'
const MAX_COOKIE_SIZE = 4000 // 4KB limit, leaving some buffer
const MAX_MESSAGES = 100 // Maximum number of messages to store

// Convert Date to string for JSON serialization
const serializeMessage = (message: Message) => ({
  ...message,
  timestamp: message.timestamp.toISOString(),
})

// Convert string back to Date
const deserializeMessage = (message: any): Message => ({
  ...message,
  timestamp: new Date(message.timestamp),
})

// Set cookie with expiration (30 days)
export const setCookie = (name: string, value: string, days: number = 30) => {
  if (typeof window === 'undefined') return
  
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

// Get cookie value
export const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null
  
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length))
    }
  }
  return null
}

// Save messages to cookie
export const saveMessagesToCookie = (messages: Message[], characterId: string) => {
  if (typeof window === 'undefined') return
  
  try {
    // Keep only the last MAX_MESSAGES messages
    const messagesToSave = messages.slice(-MAX_MESSAGES)
    
    const data = {
      characterId,
      messages: messagesToSave.map(serializeMessage),
      lastUpdated: new Date().toISOString(),
    }
    
    const jsonString = JSON.stringify(data)
    
    // Check if data exceeds cookie size limit
    if (jsonString.length > MAX_COOKIE_SIZE) {
      // If too large, keep only the most recent messages
      let reducedMessages = messagesToSave
      while (JSON.stringify({
        characterId,
        messages: reducedMessages.map(serializeMessage),
        lastUpdated: new Date().toISOString(),
      }).length > MAX_COOKIE_SIZE && reducedMessages.length > 0) {
        reducedMessages = reducedMessages.slice(1) // Remove oldest message
      }
      
      const reducedData = {
        characterId,
        messages: reducedMessages.map(serializeMessage),
        lastUpdated: new Date().toISOString(),
      }
      
      setCookie(COOKIE_NAME, JSON.stringify(reducedData))
    } else {
      setCookie(COOKIE_NAME, jsonString)
    }
  } catch (error) {
    console.error('Error saving messages to cookie:', error)
  }
}

// Load messages from cookie
export const loadMessagesFromCookie = (characterId: string): Message[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const cookieValue = getCookie(COOKIE_NAME)
    if (!cookieValue) return []
    
    const data = JSON.parse(cookieValue)
    
    // Only return messages if they match the current character
    if (data.characterId === characterId && data.messages) {
      return data.messages.map(deserializeMessage)
    }
    
    return []
  } catch (error) {
    console.error('Error loading messages from cookie:', error)
    return []
  }
}

// Clear chat history from cookie
export const clearChatHistory = () => {
  if (typeof window === 'undefined') return
  
  setCookie(COOKIE_NAME, '', -1) // Set expiration to past date to delete
}

