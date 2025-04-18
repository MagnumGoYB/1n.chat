import { Link } from '@heroui/link'

import { subtitle, title } from '@/components/primitives'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <h2 className={title({ color: 'yellow' })}>Not Found</h2>
      <h4
        className={subtitle({
          className: 'text-center font-medium text-[#FFB457]',
        })}
      >
        Could not find requested resource
      </h4>
      <Link href="/" color="foreground">
        Return Home
      </Link>
    </div>
  )
}
