// Conversation summarization utilities

import { type Message } from './cookieStorage'

export interface ConversationSummary {
  characterId: string
  summary: string
  lastMessageId: string
  messageCount: number
  createdAt: string
  updatedAt: string
}

const SUMMARY_STORAGE_PREFIX = 'crushie_summary_'
const SUMMARY_THRESHOLD = 20 // Generate summary after 20 messages

// Generate summary using DeepSeek API (server-side only)
export async function generateSummary(
  messages: Message[],
  characterId: string,
  characterName: string
): Promise<string> {
  // This function should only be called server-side
  if (typeof window !== 'undefined') {
    // Client-side: call API route
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          characterId,
          characterName,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate summary')
      }

      const data = await response.json()
      return data.summary
    } catch (error) {
      console.error('Error generating summary:', error)
      return createSimpleSummary(messages, characterName)
    }
  }

  // Server-side: use DeepSeek API directly
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return createSimpleSummary(messages, characterName)
  }

  try {
    // Get recent messages for summarization (last 30 messages)
    const recentMessages = messages.slice(-30)
    
    // Format messages for API
    const formattedMessages = recentMessages.map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text,
    }))

    const systemPrompt = `請為以下對話生成一個簡短的摘要（50字以內）。
角色：${characterName}
摘要應該包含：
1. 對話的主要話題
2. 用戶和角色的關係發展
3. 重要的情感或事件

只返回摘要內容，不要其他說明。`

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          ...formattedMessages,
          { role: 'user', content: '請生成對話摘要' },
        ],
        temperature: 0.3,
        max_tokens: 100,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to generate summary')
    }

    const data = await response.json()
    return data.choices[0].message.content.trim()
  } catch (error) {
    console.error('Error generating summary:', error)
    return createSimpleSummary(messages, characterName)
  }
}

// Simple summary fallback
function createSimpleSummary(messages: Message[], characterName: string): string {
  const userMessages = messages.filter((m) => m.sender === 'user')
  const topics = userMessages.slice(-5).map((m) => m.text.substring(0, 20))
  return `與${characterName}的對話，主要話題：${topics.join('、')}...`
}

// Save summary to localStorage
export function saveSummary(characterId: string, summary: ConversationSummary) {
  if (typeof window === 'undefined') return

  try {
    const key = `${SUMMARY_STORAGE_PREFIX}${characterId}`
    localStorage.setItem(key, JSON.stringify(summary))
  } catch (error) {
    console.error('Error saving summary:', error)
  }
}

// Clear summary from localStorage
export function clearSummary(characterId: string) {
  if (typeof window === 'undefined') return

  try {
    const key = `${SUMMARY_STORAGE_PREFIX}${characterId}`
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error clearing summary:', error)
  }
}

// Load summary from localStorage
export function loadSummary(characterId: string): ConversationSummary | null {
  if (typeof window === 'undefined') return null

  try {
    const key = `${SUMMARY_STORAGE_PREFIX}${characterId}`
    const data = localStorage.getItem(key)
    if (!data) return null
    return JSON.parse(data) as ConversationSummary
  } catch (error) {
    console.error('Error loading summary:', error)
    return null
  }
}

// Check if summary should be generated
export function shouldGenerateSummary(messages: Message[], summary: ConversationSummary | null): boolean {
  // Generate summary if:
  // 1. No summary exists and messages exceed threshold
  // 2. Summary exists but messages have grown significantly since last summary
  if (!summary) {
    return messages.length >= SUMMARY_THRESHOLD
  }

  const newMessageCount = messages.length - summary.messageCount
  return newMessageCount >= SUMMARY_THRESHOLD
}

// Update summary with new messages
export async function updateSummary(
  messages: Message[],
  characterId: string,
  characterName: string,
  existingSummary: ConversationSummary | null
): Promise<ConversationSummary> {
  // Get messages since last summary
  const messagesSinceSummary = existingSummary
    ? messages.filter((m) => m.id > existingSummary.lastMessageId)
    : messages

  if (messagesSinceSummary.length === 0) {
    return existingSummary!
  }

  // Generate new summary including old summary context
  const summaryText = existingSummary
    ? `之前的對話摘要：${existingSummary.summary}\n\n新的對話內容：`
    : ''

  const fullContext = existingSummary
    ? [
        ...messages.filter((m) => m.id <= existingSummary.lastMessageId).slice(-10),
        ...messagesSinceSummary,
      ]
    : messagesSinceSummary

  const newSummaryText = await generateSummary(fullContext, characterId, characterName)

  // Combine summaries if updating
  const combinedSummary = existingSummary
    ? `${existingSummary.summary} | ${newSummaryText}`
    : newSummaryText

  return {
    characterId,
    summary: combinedSummary,
    lastMessageId: messages[messages.length - 1].id,
    messageCount: messages.length,
    createdAt: existingSummary?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

