export interface Character {
  id: string
  name: string
  description: string
  image: string // Large image for character selection
  avatar: string // Small avatar for chat messages
  personality: string
  initialMessage: Record<string, string> // Language -> message
  responses: Record<string, string[]> // Language -> responses array
}

