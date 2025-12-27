import { NextRequest, NextResponse } from 'next/server'
import { getCharacterById, type Character } from '../../utils/characters'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { characterId, messages, language = 'zh-TW' } = body

    // Get character data
    const character = getCharacterById(characterId)
    if (!character) {
      return NextResponse.json(
        { error: 'Character not found' },
        { status: 404 }
      )
    }

    // Format messages for LLM (convert to role-based format)
    const formattedMessages: ChatMessage[] = messages.map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text,
    }))

    // Get character's responses based on language (for fallback)
    const characterResponses = character.responses[language] || character.responses['zh-TW']

    // Try to get response from DeepSeek API
    let response: string
    try {
      response = await callDeepSeekAPI(
        formattedMessages,
        character,
        language
      )
    } catch (error) {
      console.error('DeepSeek API error:', error)
      // Fallback to contextual response if API fails
      response = generateContextualResponse(
        formattedMessages,
        characterResponses,
        character
      )
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Intelligent response generation based on conversation context
function generateContextualResponse(
  messages: ChatMessage[],
  responses: string[],
  character: Character
): string {
  // Get the last user message
  const lastUserMessage = messages
    .filter((msg) => msg.role === 'user')
    .slice(-1)[0]?.content.toLowerCase() || ''

  // Get full conversation context
  const conversationText = messages.map((m) => m.content).join(' ').toLowerCase()
  const conversationLength = messages.length

  // Analyze conversation context for better response selection
  // Check for emotional context
  const isPositive = lastUserMessage.includes('開心') || lastUserMessage.includes('高興') || 
                     lastUserMessage.includes('happy') || lastUserMessage.includes('love')
  const isNegative = lastUserMessage.includes('難過') || lastUserMessage.includes('傷心') || 
                     lastUserMessage.includes('sad') || lastUserMessage.includes('upset')
  const isQuestion = lastUserMessage.includes('?') || lastUserMessage.includes('？') ||
                     lastUserMessage.includes('什麼') || lastUserMessage.includes('what') ||
                     lastUserMessage.includes('如何') || lastUserMessage.includes('how')

  // Context-based response selection with conversation history
  if (lastUserMessage.includes('謝謝') || lastUserMessage.includes('thank')) {
    return responses.find((r) => 
      r.includes('不用') || r.includes('不謝') || r.includes("don't") || r.includes("wanted")
    ) || responses[Math.floor(Math.random() * responses.length)]
  }

  if (lastUserMessage.includes('對不起') || lastUserMessage.includes('sorry')) {
    return responses.find((r) => 
      r.includes('沒關係') || r.includes('沒事') || r.includes("it's okay") || r.includes("don't worry")
    ) || responses[Math.floor(Math.random() * responses.length)]
  }

  if (lastUserMessage.includes('想你') || lastUserMessage.includes('miss') || 
      conversationText.includes('miss') || conversationText.includes('想')) {
    return responses.find((r) => 
      r.includes('想') || r.includes('miss') || r.includes('think') || r.includes('waiting')
    ) || responses[Math.floor(Math.random() * responses.length)]
  }

  if (isPositive) {
    return responses.find((r) => 
      r.includes('開心') || r.includes('高興') || r.includes('happy') || r.includes('proud')
    ) || responses[Math.floor(Math.random() * responses.length)]
  }

  if (isNegative) {
    return responses.find((r) => 
      r.includes('擔心') || r.includes('陪伴') || r.includes('care') || r.includes('here')
    ) || responses[Math.floor(Math.random() * responses.length)]
  }

  if (isQuestion) {
    // For questions, return a response that seems to address the question
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // If conversation is long, vary responses to avoid repetition
  if (conversationLength > 10) {
    // Try to find a response that hasn't been used recently
    const recentResponses = messages
      .filter((m) => m.role === 'assistant')
      .slice(-5)
      .map((m) => m.content)
    
    const unusedResponses = responses.filter((r) => !recentResponses.includes(r))
    if (unusedResponses.length > 0) {
      return unusedResponses[Math.floor(Math.random() * unusedResponses.length)]
    }
  }

  // Default: return random response
  return responses[Math.floor(Math.random() * responses.length)]
}

// DeepSeek API integration
async function callDeepSeekAPI(
  messages: ChatMessage[],
  character: Character,
  language: string
): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    throw new Error('DeepSeek API key not configured')
  }

  // Get language name
  const langName = language === 'zh-TW' 
    ? '繁體中文' 
    : language === 'zh-CN' 
    ? '簡體中文' 
    : 'English'

  // Create system prompt based on character
  const systemPrompt = `你是${character.name}，${character.description}。
你的性格特點：${character.personality}。
請用${langName}回應，保持角色個性，根據對話歷史自然回應。
回應要簡潔（50-100字），符合角色的說話風格。
${character.personality === 'tsundere' ? '保持傲嬌的語氣，表面冷漠但實際關心。' : ''}
${character.personality === 'sweet' ? '保持熱情、積極、充滿正能量的語氣。' : ''}
${character.personality === 'intellectual' ? '使用理性、學術性的表達方式，可以引用理論或科學概念。' : ''}
${character.personality === 'rebellious' ? '保持隨性、不羈、有點痞的語氣。' : ''}
${character.personality === 'gentle' ? '保持溫柔、體貼、細心的語氣，像照顧人一樣。' : ''}`

  // Keep last 15 messages for context (to avoid token limit)
  const recentMessages = messages.slice(-15)

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
        ...recentMessages,
      ],
      temperature: 0.7,
      max_tokens: 200,
      stream: false,
    }),
  })

  if (!response.ok) {
    const errorData = await response.text()
    throw new Error(`DeepSeek API error: ${response.status} - ${errorData}`)
  }

  const data = await response.json()
  
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    throw new Error('Invalid response from DeepSeek API')
  }

  return data.choices[0].message.content.trim()
}

