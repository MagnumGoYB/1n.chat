import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
  cn,
} from '@heroui/react'
import { Icon } from '@iconify/react'

import ThemeSwitcher from '@/components/theme-switcher'
import useAppSidebar from './use-app-sidebar'

type CurrentUserProps = {
  avatar?: string
  name: string
  email: string
}

export default function CurrentUser({ avatar, name, email }: CurrentUserProps) {
  const { isCollapsed } = useAppSidebar()

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          disableRipple
          data-hover={false}
          variant="light"
          color="default"
          className={cn(
            'flex w-full min-w-full items-center justify-start gap-0 border-none bg-transparent p-2 outline-none transition-transform',
            { 'justify-center': isCollapsed },
          )}
        >
          <Avatar className="h-6 w-6 text-tiny" name={name} src={avatar} />
          {!isCollapsed && (
            <span className="ml-3 text-left font-medium text-default-600 text-small leading-4">
              <p className="max-w-[120px] truncate">{name}</p>
            </span>
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="User menu">
        <DropdownItem key="profile" textValue="Profile">
          <User
            classNames={{
              name: 'text-default-600',
              description: 'text-default-500',
            }}
            avatarProps={{ size: 'sm', src: avatar }}
            description={email}
            name={name}
          />
        </DropdownItem>
        <DropdownItem
          key="settings"
          textValue="Settings"
          endContent={<Icon icon="lucide:settings" />}
        >
          Settings
        </DropdownItem>
        <DropdownItem
          key="theme"
          textValue="Theme"
          endContent={<ThemeSwitcher />}
          closeOnSelect={false}
        >
          Theme
        </DropdownItem>
        <DropdownItem
          key="logout"
          textValue="Logout"
          endContent={<Icon icon="lucide:log-out" />}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
