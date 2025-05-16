import type { Message } from 'ai'
import { type NextRequest, NextResponse } from 'next/server'

import { streamText } from 'ai'

import type { Model } from '@/types/model'

import deepseek, { DeepSeekModels } from '@/lib/llm/deepseek'
import gemini, { GeminiModels } from '@/lib/llm/gemini'

export const maxDuration = 30

export async function POST(req: NextRequest) {
  const { messages, model } = (await req.json()) as {
    model: Pick<Model, 'id' | 'pid'>
    messages: Message[]
  }

  console.log('model', model)
  console.log('messages', messages)

  let client: typeof deepseek | typeof gemini

  switch (model.pid) {
    case 'deepseek':
      client = deepseek
      if (!DeepSeekModels.has(model.id)) {
        return NextResponse.json(
          { error: 'Unsupported model' },
          { status: 400 },
        )
      }
      break
    case 'gemini':
      client = gemini
      if (!GeminiModels.has(model.id)) {
        return NextResponse.json(
          { error: 'Unsupported model' },
          { status: 400 },
        )
      }
      break
    default:
      return NextResponse.json({ error: 'Unsupported model' }, { status: 400 })
  }

  const result = streamText({
    model: client(model.id),
    messages,
  })

  return result.toDataStreamResponse()
}
