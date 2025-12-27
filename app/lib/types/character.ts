export interface Character {
  id: string
  name: string
  description: string
  image: string // Large image for character selection
  avatar: string // Small avatar for chat messages
  personality: string
  initialMessage: Record<string, string> // Language -> message
  initialMessageAdult?: Record<string, string> // Language -> adult version message (optional)
  responses: Record<string, string[]> // Language -> responses array
}

