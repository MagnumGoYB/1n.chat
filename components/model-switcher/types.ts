import type { OverlayPlacement } from '@heroui/aria-utils'

import type { ModelFeature } from '@/config/models'

export interface ModelItem {
  id: string
  icon: string
  name: string
  tip: string
  description?: string
  features?: ModelFeature[]
  disabled?: boolean
  isDefault?: boolean
  isExperimental?: boolean
  isSubscriberOnly?: boolean
  isPremiumOnly?: boolean
}

export interface ModelSwitcherProps {
  modelId?: ModelItem['id']
  models: ModelItem[]
  defaultOpen?: boolean
  placement?: OverlayPlacement
  onSelectModel?: (id: ModelItem['id'], model: ModelItem) => void
}
