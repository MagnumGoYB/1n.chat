import type { Model, ModelFeature } from '@/lib/types/model'

export type ModelsConfig = typeof modelsConfig

export const modelFeatureIcons = {
  vision: {
    icon: 'iconify lucide--eye',
    label: 'Vision',
    description: 'Supports image uploads and analysis',
    color: 'bg-green-200/30 text-green-500',
  },
  pdf: {
    icon: 'iconify lucide--file-text',
    label: 'PDFs',
    description: 'Supports PDF uploads and analysis',
    color: 'bg-cyan-200/30 text-cyan-500',
  },
  reasoning: {
    icon: 'iconify lucide--brain',
    label: 'Reasoning',
    description: 'Has reasoning capabilities',
    color: 'bg-purple-200/30 text-purple-500',
  },
  fast: {
    icon: 'iconify lucide--zap',
    label: 'Fast',
    description: 'Very fast model',
    color: 'bg-yellow-200/30 text-yellow-500',
  },
  search: {
    icon: 'iconify lucide--globe',
    label: 'Search',
    description: 'Uses search to answer questions',
    color: 'bg-blue-200/30 text-blue-500',
  },
  'effort-control': {
    icon: 'iconify lucide--settings-2',
    label: 'Effort Control',
    description: "Customize the model's reasoning effort level",
    color: 'bg-pink-200/30 text-pink-500',
  },
} satisfies Record<
  ModelFeature,
  { icon: string; label: string; description: string; color: string }
>

export const modelsConfig = [
  {
    id: 'gemini-2.0-flash',
    icon: 'Gemini',
    name: 'Gemini 2.0 Flash',
    tip: "Google's latest stable model",
    description:
      "Google's flagship model, known for speed and accuracy (and also web search!). Not quite as smart as Claude 3.5 Sonnet, but WAY faster and cheaper. Also has an insanely large context window (it can handle a lot of data).",
    features: ['vision', 'pdf', 'search'],
  },
  {
    id: 'gemini-2.0-flash-lite',
    icon: 'Gemini',
    name: 'Gemini 2.0 Flash Lite',
    tip: 'Faster, less precise Gemini model',
    description:
      'Similar to 2.0 Flash, but even faster. Not as smart, but still good at most things.',
    features: ['vision', 'pdf'],
    isExperimental: true,
  },
  {
    id: 'gemini-2.5-flash',
    icon: 'Gemini',
    name: 'Gemini 2.5 Flash',
    tip: "Google's latest fast model",
    description:
      "Google's latest fast model, known for speed and accuracy (and also web search!). Not quite as smart as Claude 3.5 Sonnet, but WAY faster and cheaper. Also has an insanely large context window (it can handle a lot of data).",
    features: ['vision', 'pdf', 'search'],
    isDefault: true,
  },
  {
    id: 'gemini-2.5-flash-thinking',
    icon: 'Gemini',
    name: 'Gemini 2.5 Flash (Thinking)',
    tip: "Google's latest fast model",
    description: "Google's latest fast model, but now it can think!",
    features: ['vision', 'pdf', 'search', 'effort-control', 'reasoning'],
    isSubscriberOnly: true,
  },
  {
    id: 'gemini-2.5-pro',
    icon: 'Gemini',
    name: 'Gemini 2.5 Pro',
    tip: "Google's newest experimental model",
    description:
      "Google's most advanced model, excelling at complex reasoning and problem-solving. Particularly strong at tackling difficult code challenges, mathematical proofs, and STEM problems. With its massive context window, it can deeply analyze large codebases, datasets and technical documents to provide comprehensive solutions.",
    features: ['vision', 'pdf', 'search', 'reasoning'],
    isExperimental: true,
    isSubscriberOnly: true,
  },
  {
    id: 'gpt-4o-mini',
    icon: 'GPT',
    name: 'GPT-4o-mini',
    tip: 'Faster, less precise version of GPT-4o',
    description:
      "Like gpt-4o, but faster. This model sacrifices some of the original GPT-4o's precision for significantly reduced latency. It accepts both text and image inputs.",
    features: ['vision'],
  },
  {
    id: 'gpt-4o',
    icon: 'GPT',
    name: 'GPT-4o',
    tip: "OpenAI's flagship; versatile and intelligent",
    description:
      "OpenAI's flagship non-reasoning model. Works with text and images. Relatively smart. Good at most things.",
    features: ['vision'],
    isSubscriberOnly: true,
  },
  {
    id: 'o3-mini',
    icon: 'GPT',
    name: 'o3-mini',
    tip: "OpenAI's previous small reasoning model",
    description:
      "A small, fast, super smart reasoning model. OpenAI clearly didn't want DeepSeek to be getting all the attention. Good at science, math, and coding, even if it's not as good at CSS.",
    features: ['reasoning', 'effort-control'],
    isSubscriberOnly: true,
  },
  {
    id: 'claude-3.5-sonnet',
    icon: 'Claude',
    name: 'Claude 3.5 Sonnet',
    tip: "Anthropic's flagship model",
    description:
      'Smart model for complex problems. Known for being good at code and math. Also kind of slow and expensive.',
    features: ['vision', 'pdf'],
    isPremiumOnly: true,
  },
  {
    id: 'claude-3.7-sonnet',
    icon: 'Claude',
    name: 'Claude 3.7 Sonnet',
    tip: "Anthropic's flagship model",
    description:
      'The latest and greatest from Anthropic. Better at code, math, and more. Also kind of slow and expensive.',
    features: ['vision', 'pdf'],
    isPremiumOnly: true,
  },
  {
    id: 'claude-3.7-sonnet-reasoning',
    icon: 'Claude',
    name: 'Claude 3.7 Sonnet (Reasoning)',
    tip: "Anthropic's flagship model",
    description:
      'The latest and greatest from Anthropic (but you can make it think). Better at code, math, and more. Also kind of slow and expensive.',
    features: ['vision', 'pdf', 'reasoning', 'effort-control'],
    isPremiumOnly: true,
  },
  {
    id: 'grok-3',
    icon: 'Grok',
    name: 'Grok 3',
    tip: "xAI's latest and greatest model",
    description:
      "xAI's flagship model that excels at data extraction, coding, and text summarization. Possesses deep domain knowledge in finance, healthcare, law, and science.",
    isExperimental: true,
    isPremiumOnly: true,
  },
  {
    id: 'grok-3-mini',
    icon: 'Grok',
    name: 'Grok 3 Mini',
    tip: 'Faster, less precise version of Grok 3 from xAI',
    description:
      'A lightweight model that thinks before responding. Great for simple or logic-based tasks that do not require deep domain knowledge.',
    isExperimental: true,
    isSubscriberOnly: true,
  },
] satisfies Model[]
