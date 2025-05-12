import { Tooltip, cn } from '@heroui/react'

import type { ModelFeature } from '@/types/model'

import { modelFeatureIcons } from '@/config/models'

export interface ModelFeatureIconProps {
  className?: string
  feature: ModelFeature
  hideLabel?: boolean
  disabledTooltip?: boolean
}

export default function ModelFeatureIcon({
  className,
  feature,
  hideLabel = false,
  disabledTooltip = false,
}: ModelFeatureIconProps) {
  return (
    <Tooltip
      size="sm"
      shadow="sm"
      radius="none"
      color="foreground"
      closeDelay={0}
      classNames={{ content: 'rounded font-light text-xs' }}
      content={modelFeatureIcons[feature].description}
      isDisabled={disabledTooltip}
    >
      <div
        className={cn(
          'flex size-6 items-center justify-center rounded',
          modelFeatureIcons[feature].color,
          className,
        )}
      >
        <span className={cn(modelFeatureIcons[feature].icon)} />
        {!hideLabel && <span>{modelFeatureIcons[feature].label}</span>}
      </div>
    </Tooltip>
  )
}
