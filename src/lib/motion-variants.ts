import type { Variants } from 'motion/react'

export const SideBarMotionVariants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'tween',
      duration: 0.15,
    },
  },
  hidden: {
    opacity: 0,
    x: -10,
    transition: {
      type: 'tween',
      duration: 0.08,
    },
  },
} satisfies Variants
