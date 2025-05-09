'use client'

import { Button } from '@heroui/button'
import Link from 'next/link'

import { Logo } from '@/components/icons'
import { useUserGuard } from '@/components/user-guard-provider'
import { cn } from '@heroui/react'

const NotSignInHeader = () => {
  const { withCheckLoggedIn, user } = useUserGuard()

  return (
    <header
      className={cn(
        '-translate-x-1/2 absolute top-0 left-1/2 flex h-12 w-full max-w-[1466px] items-center justify-between px-4 lg:h-20',
        user && 'hidden',
      )}
    >
      <Link href="/">
        <Logo className="size-10" />
      </Link>
      <div className="flex flex-nowrap items-center justify-end space-x-4">
        <Button
          size="sm"
          variant="solid"
          className="font-medium text-sm"
          radius="full"
          onPress={withCheckLoggedIn()}
        >
          Sign In
        </Button>
        <Button
          className="bg-gradient-to-r from-[#F7374F] from-[20%] via-[#88304E] to-[#2C2C2C] font-medium text-sm text-white shadow-lg"
          radius="full"
          size="sm"
          onPress={withCheckLoggedIn()}
        >
          Start for Free
        </Button>
      </div>
    </header>
  )
}

export default NotSignInHeader
