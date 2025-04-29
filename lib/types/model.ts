export type ModelFeature =
  | 'vision'
  | 'pdf'
  | 'reasoning'
  | 'search'
  | 'fast'
  | 'effort-control'

export type Model = {
  id: string
  icon: string
  name: string
  tip?: string
  description: string
  features?: ModelFeature[]
  isExperimental?: boolean
  isSubscriberOnly?: boolean
  isPremiumOnly?: boolean
  isDefault?: boolean
}
