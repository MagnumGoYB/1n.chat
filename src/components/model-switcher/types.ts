import type { ModelFeature, ModelIconKey } from '@/types/model'
import type { OverlayPlacement } from '@heroui/aria-utils'

export interface ModelItem {
  id: string
  icon: ModelIconKey
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
  models: ModelItem[]
  defaultOpen?: boolean
  placement?: OverlayPlacement
  disabled?: boolean
  onSelectModel?: (id: ModelItem['id'], model: ModelItem) => void
}

export interface ModelSwitcherRef {
  open: () => void
  close: () => void
  getCurrentModel: () => ModelItem | null
}
