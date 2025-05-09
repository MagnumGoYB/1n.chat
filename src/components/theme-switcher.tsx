'use client'

import { RadioGroup, cn, useRadio } from '@heroui/react'
import { useIsSSR } from '@react-aria/ssr'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { useTheme } from 'next-themes'

import type { RadioProps } from '@heroui/react'

export default function ThemeSwitcher() {
  const isSSR = useIsSSR()
  const { theme, setTheme } = useTheme()

  return (
    <RadioGroup
      orientation="horizontal"
      classNames={{
        base: 'flex flex-row',
        wrapper: 'items-center gap-0 rounded-full border border-default-300',
      }}
      value={isSSR ? 'system' : theme}
      onValueChange={setTheme}
      aria-label="Switch theme"
    >
      <ThemeRadio value="system">
        <span className="iconify tabler--device-desktop" />
      </ThemeRadio>
      <ThemeRadio value="light">
        <span className="iconify tabler--sun-high" />
      </ThemeRadio>
      <ThemeRadio value="dark">
        <span className="iconify tabler--moon" />
      </ThemeRadio>
    </RadioGroup>
  )
}

function ThemeRadio(props: Omit<RadioProps, 'classNames'>) {
  const {
    Component,
    children,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getControlProps,
  } = useRadio(props)

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        'group tap-highlight-transparent relative inline-flex max-w-fit cursor-pointer select-none items-center justify-start',
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()} className="hidden">
        <span {...getControlProps()} />
      </span>
      <div
        {...getLabelProps()}
        className="pointer-events-none relative box-border inline-flex h-6 w-6 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-default border-medium border-none text-foreground outline-none ring-0 group-data-[focus-visible=true]:z-10 group-data-[hover-unselected=true]:bg-default-100 group-data-[selected=true]:bg-default-200 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background"
      >
        {children}
      </div>
    </Component>
  )
}
