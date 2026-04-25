import { NextResponse } from 'next/server'
import { buildSystemPrompt } from '../../../lib/claudeAPI'
import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export async function POST(request: Request) {
  try {
    const { symptoms, patientContext } = await request.json()

    if (!symptoms || !symptoms.trim()) {
      return NextResponse.json(
        { message: 'Symptoms are required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { message: 'API key not configured. Uncomment and add GOOGLE_GENERATIVE_AI_API_KEY to .env.local' },
        { status: 500 }
      )
    }

    // Build conversation history if provided
    const conversationHistory = patientContext?.conversationHistory || []
    const recentMessages = conversationHistory
      .filter((m: any) => m.role !== 'system')
      .slice(-6)
      .map((m: any) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
      }))

    // Add current user message
    const messages = [
      ...recentMessages,
      { role: 'user', content: symptoms },
    ]

    // Patient context prefix for the system prompt
    const patientInfo = patientContext?.patientName
      ? `\n\nCurrent patient: ${patientContext.patientName}`
      : ''

    // Call Google Gemini API
    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      system: buildSystemPrompt() + patientInfo,
      messages: messages as any,
    })

    // Parse the JSON response from Gemini
    let parsed
    try {
      const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/)
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[1])
      } else {
        // Fallback: try parsing directly in case there are no backticks
        parsed = JSON.parse(text)
      }
    } catch {
      // If Gemini didn't return valid JSON, wrap it gracefully
      parsed = {
        message: text,
        severity: 'LOW',
        summary: 'Assessment provided above',
        nextSteps: ['Follow up with a health professional'],
        referralNeeded: false,
        referralReason: null,
      }
    }

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Chat route error:', err)
    return NextResponse.json(
      { message: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}
