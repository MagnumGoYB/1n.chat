import type { Model } from '@/types/model'

import { createGoogleGenerativeAI } from '@ai-sdk/google'

export type GeminiModelId =
  | 'gemini-2.0-flash'
  | 'gemini-2.0-flash-lite'
  | 'gemini-2.5-flash-preview-04-17'
  | 'gemini-2.5-pro-preview-05-06'

const gemini = createGoogleGenerativeAI({
  baseURL: process.env.GOOGLE_GENERATIVE_AI_API_URL,
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
})

const GeminiModels = new Map<Model['id'], Model & { id: GeminiModelId }>([
  [
    'gemini-2.0-flash',
    {
      pid: 'gemini',
      id: 'gemini-2.0-flash',
      icon: 'Gemini',
      name: 'Gemini 2.0 Flash',
      tip: "Google's latest stable model",
      description:
        "Google's flagship model, known for speed and accuracy (and also web search!). Not quite as smart as Claude 3.5 Sonnet, but WAY faster and cheaper. Also has an insanely large context window (it can handle a lot of data).",
      features: ['vision', 'pdf', 'search'],
      isExperimental: false,
      isSubscriberOnly: false,
      isPremiumOnly: false,
    },
  ],
  [
    'gemini-2.0-flash-lite',
    {
      pid: 'gemini',
      id: 'gemini-2.0-flash-lite',
      icon: 'Gemini',
      name: 'Gemini 2.0 Flash Lite',
      tip: 'Faster, less precise Gemini model',
      description:
        'Similar to 2.0 Flash, but even faster. Not as smart, but still good at most things.',
      features: ['vision', 'pdf'],
      isExperimental: true,
      isSubscriberOnly: false,
      isPremiumOnly: false,
    },
  ],
  [
    'gemini-2.5-flash',
    {
      pid: 'gemini',
      id: 'gemini-2.5-flash-preview-04-17',
      icon: 'Gemini',
      name: 'Gemini 2.5 Flash',
      tip: "Google's latest fast model",
      description:
        "Google's latest fast model, known for speed and accuracy (and also web search!). Not quite as smart as Claude 3.5 Sonnet, but WAY faster and cheaper. Also has an insanely large context window (it can handle a lot of data).",
      features: ['vision', 'pdf', 'search'],
      isExperimental: false,
      isSubscriberOnly: false,
      isPremiumOnly: false,
    },
  ],
  [
    'gemini-2.5-flash-thinking',
    {
      pid: 'gemini',
      id: 'gemini-2.5-flash-preview-04-17',
      icon: 'Gemini',
      name: 'Gemini 2.5 Flash (Thinking)',
      tip: "Google's latest fast model",
      description: "Google's latest fast model, but now it can think!",
      features: ['vision', 'pdf', 'search', 'effort-control', 'reasoning'],
      isSubscriberOnly: true,
      isPremiumOnly: false,
      isExperimental: false,
    },
  ],
  [
    'gemini-2.5-pro',
    {
      pid: 'gemini',
      id: 'gemini-2.5-pro-preview-05-06',
      icon: 'Gemini',
      name: 'Gemini 2.5 Pro',
      tip: "Google's newest experimental model",
      description:
        "Google's most advanced model, excelling at complex reasoning and problem-solving. Particularly strong at tackling difficult code challenges, mathematical proofs, and STEM problems. With its massive context window, it can deeply analyze large codebases, datasets and technical documents to provide comprehensive solutions.",
      features: ['vision', 'pdf', 'search', 'reasoning'],
      isExperimental: true,
      isSubscriberOnly: true,
      isPremiumOnly: false,
    },
  ],
])

export { GeminiModels }
export default gemini
