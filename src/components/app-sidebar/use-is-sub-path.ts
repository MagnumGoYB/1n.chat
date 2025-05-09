import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

import { navConfig } from '@/config/nav'

export default function useIsSubPath(): [boolean, string?] {
  const pathname = usePathname()
  const [is, parent] = useMemo(() => {
    if (pathname === '/') return [false]

    const path = pathname.split('/')

    if (path.every((p) => p === '')) return [false]

    const current = navConfig.find((item) => item.key === path[1])

    if (current) {
      if (!current.children) return [false]

      const is = current.children.some(
        (item) => item.key === pathname || item.href === `/${path[1]}`,
      )

      if (is) {
        return [true, current.name]
      }

      return [false]
    }

    return [false]
  }, [pathname])

  return [is, parent]
}
