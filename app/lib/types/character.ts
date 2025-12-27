export interface Character {
  id: string
  name: string
  description: string
  image: string // Large image for character selection
  avatar: string // Small avatar for chat messages
  personality: string
  initialMessage: Record<string, string[]> // Language -> messages array
  initialMessageAdult?: Record<string, string[]> // Language -> adult version messages array (optional)
  responses: Record<string, string[]> // Language -> responses array
}

