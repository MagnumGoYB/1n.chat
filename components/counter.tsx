'use client'

import { Button, addToast } from '@heroui/react'
import { useState } from 'react'

export const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <Button
      radius="full"
      onPress={() => {
        setCount(count + 1)
        addToast({
          variant: 'solid',
          color: 'danger',
          title: 'Toast title',
          description: 'Toast displayed successfully',
        })
      }}
    >
      Count is {count}
    </Button>
  )
}
