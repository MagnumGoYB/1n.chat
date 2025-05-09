'use client'

import { type PropsWithChildren, createContext, useContext } from 'react'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@heroui/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'

import type { User } from '@/lib/types/user'

import { Logo } from '@/components/icons'
import { siteConfig } from '@/config/site'
import { signIn, signOut } from '@/lib/actions/user'
import { getCurrentUser } from '@/lib/queries/user'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type WithCheckLoggedIn = <T extends (...args: any[]) => any>(
  next?: T,
) => (...args: Parameters<T>) => ReturnType<T>

type Context = {
  user: User | null
  isLoading: boolean
  isFetching: boolean
  isError: boolean
  withCheckLoggedIn: WithCheckLoggedIn
  logout: () => void
}

const Context = createContext<Context | null>(null)

export const UserGuardProvider = ({
  children,
  initialUser,
}: PropsWithChildren<{ initialUser: User | null }>) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const { isOpen, onOpenChange, onOpen: open, onClose: close } = useDisclosure()

  const redirect = searchParams.get('redirect')

  const {
    data: user,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    initialData: initialUser,
    queryKey: ['me', !!searchParams.get('unauthorized')],
    queryFn: getCurrentUser,
  })

  const withCheckLoggedIn: WithCheckLoggedIn = (next) => {
    return (...args) => {
      if (!user) {
        open()
        return
      }
      return next?.(...args)
    }
  }

  const handleSignIn = (_: string) => async () => {
    try {
      await signIn('cuid:clj1v0x2g0000qz6v4f8k3h5d')
      await queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey[0] === 'me',
      })
      router.replace(redirect ?? '/')
      close()
    } catch (error) {
      console.error('Sign in error:', error)
    }
  }

  const logout = async () => {
    try {
      await signOut()
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey[0] === 'me',
      })
      router.replace('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <Context.Provider
      value={{
        user,
        isLoading,
        isFetching,
        isError,
        withCheckLoggedIn,
        logout,
      }}
    >
      {children}
      <Modal
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: 'bg-overlay/50',
          body: 'items-center gap-4 px-8 py-0 pb-12',
          header: 'flex flex-col items-center px-8 pt-8',
        }}
      >
        <ModalContent>
          <ModalHeader>
            <Logo className="size-16" />
            <h1 className="font-bold text-3xl">Start for Free</h1>
          </ModalHeader>
          <ModalBody>
            <Button
              variant="flat"
              size="lg"
              radius="full"
              className="w-full bg-default-100 text-sm"
              startContent={
                <span className="iconify-color logos--google-icon size-5" />
              }
              onPress={handleSignIn('google')}
            >
              Continue with Google
            </Button>
            <Button
              variant="flat"
              size="lg"
              radius="full"
              className="w-full bg-default-100 text-sm"
              startContent={
                <span className="iconify-color logos--github-icon size-5" />
              }
              onPress={handleSignIn('github')}
            >
              Continue with Github
            </Button>
            <div className="text-default-400 text-xs">
              By continuing, you agree to {siteConfig.name}'s Terms and Privacy.
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Context.Provider>
  )
}

export const useUserGuard = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('useUserGuard must be used within a UserGuardProvider')
  }

  return context
}
