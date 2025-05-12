import type * as ModelsIcon from '@/components/icons/model-icons'

export type ModelFeature =
  | 'vision'
  | 'pdf'
  | 'reasoning'
  | 'search'
  | 'fast'
  | 'effort-control'

export type ModelIconKey = keyof typeof ModelsIcon

export type Model = {
  id: string
  icon: ModelIconKey
  name: string
  tip?: string
  description: string
  features?: ModelFeature[]
  isExperimental?: boolean
  isSubscriberOnly?: boolean
  isPremiumOnly?: boolean
  isDefault?: boolean
}
