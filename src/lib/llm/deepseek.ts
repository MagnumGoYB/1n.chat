import { createDeepSeek } from '@ai-sdk/deepseek'

import type { Model } from '@/types/model'

export type DeepSeekChatModelId = 'deepseek-chat'

const deepseek = createDeepSeek({
  baseURL: process.env.DEEPSEEK_API_URL,
  apiKey: process.env.DEEPSEEK_API_KEY,
})

const DeepSeekModels = new Map<
  Model['id'],
  Model & { id: DeepSeekChatModelId }
>([
  [
    'deepseek-v3',
    {
      pid: 'deepseek',
      id: 'deepseek-chat',
      icon: 'DeepSeek',
      name: 'DeepSeek v3 (0324)',
      tip: "Latest update to DeepSeek's chat model",
      description:
        'DeepSeek V3, a 685B-parameter, mixture-of-experts model, is the latest iteration of the flagship chat model family from the DeepSeek team. It succeeds the DeepSeek V3 model and performs really well on a variety of tasks.',
      isDefault: true,
      isExperimental: false,
      isSubscriberOnly: false,
      isPremiumOnly: false,
    },
  ],
])

export { DeepSeekModels }
export default deepseek
