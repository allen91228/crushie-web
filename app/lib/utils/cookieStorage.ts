// Storage utilities for chat messages (localStorage + Cookie fallback)

import type { Message } from '../types/message'

export type { Message }

const STORAGE_KEY_PREFIX = 'crushie_chat_'
const COOKIE_NAME = 'crushie_chat_history'
const MAX_COOKIE_SIZE = 4000 // 4KB limit, leaving some buffer
const MAX_MESSAGES = 500 // Maximum number of messages to store (increased for localStorage)
const STORAGE_EXPIRY_DAYS = 365 // Keep history for 1 year

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

// Save messages to localStorage (primary) and cookie (fallback)
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
    const storageKey = `${STORAGE_KEY_PREFIX}${characterId}`
    
    // Primary: Save to localStorage (much larger capacity - 10MB)
    try {
      localStorage.setItem(storageKey, jsonString)
      // Also save expiry date
      const expiryDate = new Date()
      expiryDate.setTime(expiryDate.getTime() + STORAGE_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
      localStorage.setItem(`${storageKey}_expiry`, expiryDate.toISOString())
    } catch (localStorageError) {
      console.warn('localStorage save failed, using cookie fallback:', localStorageError)
      // Fallback to cookie if localStorage fails
      saveToCookieFallback(data, jsonString)
    }
    
    // Also save a summary to cookie for quick access (smaller data)
    const summaryData = {
      characterId,
      messageCount: messagesToSave.length,
      lastUpdated: new Date().toISOString(),
    }
    setCookie(`${COOKIE_NAME}_${characterId}`, JSON.stringify(summaryData), STORAGE_EXPIRY_DAYS)
    
  } catch (error) {
    console.error('Error saving messages:', error)
  }
}

// Fallback cookie save function
function saveToCookieFallback(data: any, jsonString: string) {
  // Check if data exceeds cookie size limit
  if (jsonString.length > MAX_COOKIE_SIZE) {
    // If too large, keep only the most recent messages
    let reducedMessages = data.messages
    while (JSON.stringify({
      characterId: data.characterId,
      messages: reducedMessages,
      lastUpdated: data.lastUpdated,
    }).length > MAX_COOKIE_SIZE && reducedMessages.length > 0) {
      reducedMessages = reducedMessages.slice(1) // Remove oldest message
    }
    
    const reducedData = {
      characterId: data.characterId,
      messages: reducedMessages,
      lastUpdated: data.lastUpdated,
    }
    
    setCookie(COOKIE_NAME, JSON.stringify(reducedData), STORAGE_EXPIRY_DAYS)
  } else {
    setCookie(COOKIE_NAME, jsonString, STORAGE_EXPIRY_DAYS)
  }
}

// Load messages from localStorage (primary) or cookie (fallback)
export const loadMessagesFromCookie = (characterId: string): Message[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const storageKey = `${STORAGE_KEY_PREFIX}${characterId}`
    
    // Primary: Try localStorage first
    try {
      const expiryStr = localStorage.getItem(`${storageKey}_expiry`)
      if (expiryStr) {
        const expiryDate = new Date(expiryStr)
        if (expiryDate < new Date()) {
          // Data expired, remove it
          localStorage.removeItem(storageKey)
          localStorage.removeItem(`${storageKey}_expiry`)
          return []
        }
      }
      
      const storedData = localStorage.getItem(storageKey)
      if (storedData) {
        const data = JSON.parse(storedData)
        if (data.characterId === characterId && data.messages) {
          return data.messages.map(deserializeMessage)
        }
      }
    } catch (localStorageError) {
      console.warn('localStorage load failed, trying cookie fallback:', localStorageError)
    }
    
    // Fallback: Try cookie
    const cookieValue = getCookie(COOKIE_NAME)
    if (cookieValue) {
      const data = JSON.parse(cookieValue)
      if (data.characterId === characterId && data.messages) {
        // Also migrate to localStorage if cookie data exists
        try {
          const storageKey = `${STORAGE_KEY_PREFIX}${characterId}`
          localStorage.setItem(storageKey, cookieValue)
          const expiryDate = new Date()
          expiryDate.setTime(expiryDate.getTime() + STORAGE_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
          localStorage.setItem(`${storageKey}_expiry`, expiryDate.toISOString())
        } catch (e) {
          // Ignore migration errors
        }
        return data.messages.map(deserializeMessage)
      }
    }
    
    return []
  } catch (error) {
    console.error('Error loading messages:', error)
    return []
  }
}

// Clear chat history for a specific character
export const clearChatHistory = (characterId?: string) => {
  if (typeof window === 'undefined') return
  
  try {
    if (characterId) {
      // Clear specific character's history
      const storageKey = `${STORAGE_KEY_PREFIX}${characterId}`
      localStorage.removeItem(storageKey)
      localStorage.removeItem(`${storageKey}_expiry`)
      setCookie(`${COOKIE_NAME}_${characterId}`, '', -1)
    } else {
      // Clear all chat history
      // Clear all localStorage entries
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith(STORAGE_KEY_PREFIX)) {
          localStorage.removeItem(key)
        }
      }
      // Clear cookie
      setCookie(COOKIE_NAME, '', -1)
    }
  } catch (error) {
    console.error('Error clearing chat history:', error)
  }
}

// Get all saved character IDs
export const getSavedCharacterIds = (): string[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const characterIds: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(STORAGE_KEY_PREFIX) && !key.endsWith('_expiry')) {
        const characterId = key.replace(STORAGE_KEY_PREFIX, '')
        if (characterId) {
          characterIds.push(characterId)
        }
      }
    }
    return characterIds
  } catch (error) {
    console.error('Error getting saved character IDs:', error)
    return []
  }
}

