'use client'

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
    <div>
      <h2>Something went wrong!</h2>
      <Button onPress={() => reset()}>Try again</Button>
    </div>
  )
}
