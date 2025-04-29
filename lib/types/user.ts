export type Plan = {
  value: 'free' | 'pro'
  expiredAt: number | null
}

export type Usage = {
  standard: {
    used: number
    limit: number
    refreshAt: number
  }
  premium: {
    used: number
    limit: number
    refreshAt: number | null
  }
}

export type User = {
  id: string
  name: string
  email: string
  avatar: string
  plan: Plan
  usage: Usage
}
