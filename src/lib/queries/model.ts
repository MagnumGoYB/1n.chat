import { cache } from 'react'

import type { User } from '@/types/user'

import { modelsConfig } from '@/config/models'

export const getModels = (user: User | null) => {
  return modelsConfig.map((model) => {
    if (model.isSubscriberOnly || model.isPremiumOnly) {
      return { ...model, disabled: user ? user?.plan.value !== 'pro' : true }
    }
    return model
  })
}

export const getCachedModels = cache(getModels)
