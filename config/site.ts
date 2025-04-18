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
      href: '/',
      icon: 'lucide:message-circle-more',
    },
    { key: 'settings', name: 'Settings', href: '/', icon: 'lucide:settings' },
    { key: 'feedback', name: 'Feedback', href: '/', icon: 'lucide:flag' },
  ],
}
