import pkg from '~/package.json'

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  defaultTheme: 'system',
  name: '1n.chat',
  description:
    '1n.chat is a AI assistants chat platform that allows you to create and manage multiple AI assistants in one place.',
  url: 'https://1n.chat',
  version: pkg.version,
}
