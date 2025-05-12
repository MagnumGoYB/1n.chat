import type { User } from '@/types/user'

export const Users: User[] = [
  {
    id: 'cuid:clj1v0x2g0000qz6v4f8k3h5d',
    name: 'Admin',
    email: 'admin@example.com',
    avatar: 'https://avatars.githubusercontent.com/u/22886057?v=4',
    plan: {
      value: 'free',
      expiredAt: null,
    },
    usage: {
      standard: {
        used: 0,
        limit: 100,
        refreshAt: 1756569600000,
      },
      premium: {
        used: 0,
        limit: 0,
        refreshAt: null,
      },
    },
  },
]
