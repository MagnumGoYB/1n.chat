import { siteConfig } from './site'

export type AuthConfig = typeof authConfig

const version = siteConfig.version

export const authConfig = {
  sessionKey: `v${version}-session`,
}
