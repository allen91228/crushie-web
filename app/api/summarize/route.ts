import { NextRequest, NextResponse } from 'next/server'
import { generateSummary } from '../../lib/utils/summarizer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, characterId, characterName } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid messages' },
        { status: 400 }
      )
    }

    if (!characterId || !characterName) {
      return NextResponse.json(
        { error: 'Character ID and name are required' },
        { status: 400 }
      )
    }

    const summary = await generateSummary(messages, characterId, characterName)

    return NextResponse.json({ summary })
  } catch (error) {
    console.error('Summarize API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

