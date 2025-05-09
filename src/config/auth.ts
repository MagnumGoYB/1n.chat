import { siteConfig } from './site'

export type AuthConfig = typeof authConfig

const version = siteConfig.version

export const authConfig = {
  sessionKey: `v${version}-session`,
  // sessionDuration: 1000 * 15, // 15 seconds
  sessionDuration: 1000 * 60 * 60 * 24 * 7, // 7 days
  publicPaths: [],
}
