import { DeepSeekModels } from './deepseek'
import { GeminiModels } from './gemini'

import type { DeepSeekChatModelId } from './deepseek'
import type { GeminiModelId } from './gemini'

export type ModelId = DeepSeekChatModelId | GeminiModelId

export const allModels = [
  ...Array.from(DeepSeekModels.values()),
  ...Array.from(GeminiModels.values()),
]
