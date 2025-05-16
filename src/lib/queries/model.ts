'use server'

import { unstable_noStore as noStore } from 'next/cache'

import { cache } from 'react'

import { allModels } from '@/lib/llm'

import { getCachedUser } from './user'

export const getModels = async () => {
  noStore()

  const user = await getCachedUser()

  await new Promise((resolve) => setTimeout(resolve, 1000))

  return allModels.map((model) => {
    if (model.isSubscriberOnly || model.isPremiumOnly) {
      return { ...model, disabled: user ? user?.plan.value !== 'pro' : true }
    }
    return { ...model, disabled: false }
  })
}

export const getCachedModels = cache(getModels)
