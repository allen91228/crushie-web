export interface Message {
  id: string
  text: string
  sender: 'user' | 'character'
  timestamp: Date
}

