'use client'

import type { ElementRef, Key } from 'react'

import {
  Button,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  cn,
  useDisclosure,
} from '@heroui/react'
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

import ModelFeatureIcon from '@/components/model-feature-icon'
import ModelIcon from '@/components/model-icon'
import ScrollArea from '@/components/scroll-area'

import type { ModelItem, ModelSwitcherProps, ModelSwitcherRef } from './types'

const ModelSwitcher = forwardRef<ModelSwitcherRef, ModelSwitcherProps>(
  (props, ref) => {
    const {
      defaultOpen,
      models,
      placement = 'top-start',
      disabled = true,
      onSelectModel,
    } = props

    const [modelId, setModalId] = useState<ModelItem['id']>()

    const currentModel = useMemo(
      () =>
        models.find((m) => m.id === modelId) ||
        models.find((m) => m.isDefault) ||
        models[0],
      [modelId, models],
    )

    const triggerRef = useRef<ElementRef<typeof Button>>(null)

    const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure({
      defaultOpen,
      onChange: (isOpen) => {
        if (isOpen) {
          document.body.style.setProperty('overflow-y', 'hidden')
        } else {
          document.body.style.removeProperty('overflow-y')
        }
      },
    })

    const { ref: contentRef } = useIntersectionObserver({
      onChange: (isIntersecting, entry) => {
        if (isIntersecting && triggerRef.current) {
          const target = entry.target as HTMLElement
          const { top, height } = triggerRef.current.getBoundingClientRect()
          target.style.setProperty(
            'height',
            `${Math.ceil(top) - Math.ceil(height)}px`,
          )
        }
      },
    })

    const handleSelectModel = (key: Key) => {
      const selectedModel = models.find((model) => model.id === key)
      if (selectedModel) {
        setModalId(selectedModel.id)
        onSelectModel?.(selectedModel.id, selectedModel)
      }
      onClose()
    }

    useImperativeHandle(ref, () => ({
      open: onOpen,
      close: onClose,
      getCurrentModel: () => currentModel,
    }))

    if (!currentModel) {
      console.error('Not model found: ', modelId)

      return null
    }

    return (
      <Popover
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        offset={5}
        placement={placement}
        triggerType="listbox"
      >
        <PopoverTrigger>
          <Button
            disableRipple
            variant="light"
            aria-label="Model Switcher"
            className={cn(
              'rounded-lg px-2 font-medium text-sm capitalize data-[disabled=true]:pointer-events-auto data-[disabled=true]:cursor-not-allowed',
              isOpen && 'bg-default/40',
            )}
            size="sm"
            startContent={<ModelIcon modelKey={currentModel.icon} />}
            endContent={
              <span
                className={cn(
                  'iconify tabler--chevron-down size-[16px] transform-gpu transition-transform',
                  isOpen && 'rotate-180',
                )}
              />
            }
            isDisabled={disabled}
            ref={triggerRef}
          >
            {currentModel.name}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="relative max-h-[100vh] rounded-lg p-1 pr-0 sm:min-w-[420px]">
          <ScrollArea
            classNames={{ root: 'pr-2', scrollbar: 'mr-0.5' }}
            ref={contentRef}
          >
            <Listbox
              className="p-1"
              variant="flat"
              aria-label="Model Switcher List"
              selectionMode="none"
              disabledKeys={models.filter((m) => m.disabled).map((m) => m.id)}
              onAction={handleSelectModel}
            >
              {models.map((m) => (
                <ListboxItem
                  key={m.id}
                  tabIndex={-1}
                  aria-label="Model Switcher Item"
                  onFocus={(e) => e.stopPropagation()}
                  classNames={{
                    base: 'p-3 data-[disabled=true]:pointer-events-auto data-[disabled=true]:cursor-not-allowed',
                    title:
                      'flex flex-nowrap items-center gap-2 font-medium text-sm',
                  }}
                  startContent={<ModelIcon modelKey={m.icon} />}
                  endContent={
                    m.features &&
                    m.features.length > 0 && (
                      <div className="ml-3.5 flex items-center space-x-2">
                        {m.features?.map((f) => (
                          <ModelFeatureIcon key={f} feature={f} hideLabel />
                        ))}
                      </div>
                    )
                  }
                >
                  <span className="whitespace-nowrap capitalize tracking-tight">
                    {m.name}
                  </span>
                  {(m.tip || m.isExperimental || m.isPremiumOnly) && (
                    <Tooltip
                      size="sm"
                      shadow="sm"
                      radius="none"
                      color="foreground"
                      classNames={{
                        content: 'rounded font-normal text-xs',
                      }}
                      closeDelay={0}
                      content={
                        <div className="flex items-center gap-1 font-light">
                          {m.isPremiumOnly && (
                            <>
                              <span className="iconify lucide--gem" />
                              <span>Premium</span>
                              <i className="mr-0.5 font-extrabold">·</i>
                            </>
                          )}
                          {m.isExperimental && (
                            <>
                              <span className="iconify lucide--flask-conical" />
                              <span>Experimental</span>
                              <i className="mr-0.5 font-extrabold">·</i>
                            </>
                          )}
                          <span>{m.tip}</span>
                        </div>
                      }
                    >
                      <span className="iconify lucide--circle-alert text-default-foreground/50" />
                    </Tooltip>
                  )}
                </ListboxItem>
              ))}
            </Listbox>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    )
  },
)

ModelSwitcher.displayName = 'ModelSwitcher'

export default ModelSwitcher
