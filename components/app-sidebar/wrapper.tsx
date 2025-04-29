import { TRANSITION_EASINGS } from '@heroui/framer-utils'
import { Drawer, DrawerBody, DrawerContent, cn } from '@heroui/react'
import { forwardRef, useMemo } from 'react'

import type { ModalProps } from '@heroui/react'
import type { CSSProperties } from 'react'

const Wrapper = forwardRef<
  HTMLDivElement,
  ModalProps & {
    sidebarWidth?: number
    sidebarPlacement?: 'left' | 'right'
  }
>(
  (
    {
      children,
      className,
      onOpenChange,
      isOpen,
      sidebarWidth = 200,
      classNames = {},
      sidebarPlacement = 'left',
      motionProps: drawerMotionProps,
      ...props
    },
    ref,
  ) => {
    const motionProps = useMemo(() => {
      if (!!drawerMotionProps && typeof drawerMotionProps === 'object') {
        return drawerMotionProps
      }

      return {
        variants: {
          enter: {
            x: 0,
            transition: {
              x: {
                duration: 0.3,
                ease: TRANSITION_EASINGS.easeOut,
              },
            },
          },
          exit: {
            x: sidebarPlacement === 'left' ? -sidebarWidth : sidebarWidth,
            transition: {
              x: {
                duration: 0.2,
                ease: TRANSITION_EASINGS.easeOut,
              },
            },
          },
        },
      }
    }, [sidebarWidth, sidebarPlacement, drawerMotionProps])

    return (
      <>
        <Drawer
          ref={ref}
          {...props}
          placement={sidebarPlacement}
          classNames={{
            ...classNames,
            wrapper: cn('!w-[var(--sidebar-width)]', classNames?.wrapper, {
              '!items-start !justify-start ': sidebarPlacement === 'left',
              '!items-end !justify-end': sidebarPlacement === 'right',
            }),
            base: cn(
              '!m-0 h-full max-h-full w-[var(--sidebar-width)] p-0',
              classNames?.base,
              className,
              {
                '!justify-start inset-y-0 left-0 max-h-[none] rounded-l-none':
                  sidebarPlacement === 'left',
                '!justify-end inset-y-0 right-0 max-h-[none] rounded-r-none':
                  sidebarPlacement === 'right',
              },
            ),
            body: cn('p-0', classNames?.body),
            closeButton: cn('z-50', classNames?.closeButton),
          }}
          isOpen={isOpen}
          motionProps={motionProps}
          radius="none"
          scrollBehavior="inside"
          style={{ '--sidebar-width': `${sidebarWidth}px` } as CSSProperties}
          onOpenChange={onOpenChange}
        >
          <DrawerContent>
            <DrawerBody>{children}</DrawerBody>
          </DrawerContent>
        </Drawer>
        <div
          className={cn(
            'hidden h-full w-[var(--sidebar-width)] sm:flex',
            className,
          )}
        >
          {children}
        </div>
      </>
    )
  },
)

Wrapper.displayName = 'Wrapper'

export default Wrapper
