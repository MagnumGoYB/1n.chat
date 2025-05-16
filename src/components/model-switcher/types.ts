import type { Model } from '@/types/model'
import type { OverlayPlacement } from '@heroui/aria-utils'

export interface ModelSwitcherProps {
  defaultOpen?: boolean
  placement?: OverlayPlacement
  disabled?: boolean
  onSelectModel?: (id: Model['id'], model: Model) => void
}

export interface ModelSwitcherRef {
  open: () => void
  close: () => void
  getCurrentModel: () => Model | null
}
