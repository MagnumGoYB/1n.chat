import type { FC } from 'react'

import { cn } from '@heroui/react'

import * as ModelsIcon from '@/components/icons/model-icons'

interface ModelIconProps {
  className?: string
  modelKey: keyof typeof ModelsIcon
}

const ModelIcon: FC<ModelIconProps> = ({ modelKey, className }) => {
  if (modelKey in ModelsIcon) {
    const Icon = ModelsIcon[modelKey]
    return <Icon className={cn('size-4', className)} />
  }
  return null
}

export default ModelIcon
