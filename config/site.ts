export type SiteConfig = typeof siteConfig

export const siteConfig = {
  defaultTheme: 'system',
  name: '1n.chat',
  description: '1n.chat is a AI assistant that can chat with you.',
  url: 'https://1n.chat',
  nav: [
    {
      key: 'chats',
      name: 'Chats',
      href: '/chats',
      icon: 'lucide--message-circle-more',
    },
    {
      key: 'settings',
      name: 'Settings',
      href: '/settings',
      icon: 'lucide--settings',
      children: [
        {
          key: 'profile',
          name: 'Profile',
          href: '/settings',
          icon: 'lucide--user-round',
        },
        {
          key: 'plans',
          name: 'Plans',
          href: '/settings/plans',
          icon: 'lucide--rocket',
        },
        {
          key: 'billing',
          name: 'Billing',
          href: '/settings/billing',
          icon: 'lucide--fuel',
        },
      ],
    },
    {
      key: 'feedback',
      name: 'Feedback',
      href: '/feedback',
      icon: 'lucide--flag',
    },
  ],
}
