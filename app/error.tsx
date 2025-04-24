'use client'

import { title } from '@/components/primitives'
import { Button } from '@heroui/button'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <h2 className={title({ color: 'violet', className: '!leading-normal' })}>
        Something went wrong!
      </h2>
      <Button variant="ghost" color="secondary" onPress={() => reset()}>
        Try again
      </Button>
    </div>
  )
}
