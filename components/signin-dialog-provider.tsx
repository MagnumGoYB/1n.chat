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

import type { User } from '@/lib/types/user'

import { Logo } from '@/components/icons'
import { siteConfig } from '@/config/site'
import { signIn } from '@/lib/actions/user'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type WithLoggedIn = <T extends (...args: any[]) => any>(
  next: T,
) => (user: User | null) => (...args: Parameters<T>) => ReturnType<T>

type Context = {
  withLoggedIn: WithLoggedIn
  close: () => void
  open: () => void
}

const Context = createContext<Context | null>(null)

export const SignInDialogProvider = ({ children }: PropsWithChildren) => {
  const { isOpen, onOpenChange, onOpen: open, onClose: close } = useDisclosure()

  const withLoggedIn: WithLoggedIn = (next) => {
    return (user) =>
      (...args) => {
        if (!user) {
          open()
          return
        }
        return next(...args)
      }
  }

  const handleSignIn = (_: string) => async () => {
    try {
      await signIn('cuid:clj1v0x2g0000qz6v4f8k3h5d')
      close()
    } catch (error) {
      console.error('Sign in error:', error)
    }
  }

  return (
    <Context.Provider value={{ withLoggedIn, open, close }}>
      {children}
      <Modal
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: 'bg-overlay/50',
          body: 'px-8 pb-12',
          header: 'px-8 pt-8',
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col items-center">
            <Logo className="size-16" />
            <h1 className="font-bold text-3xl">Start for Free</h1>
          </ModalHeader>
          <ModalBody className="items-center gap-4">
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

export const useSignInDialog = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error(
      'useSignInDialog must be used within a SignInDialogProvider',
    )
  }

  return context
}
