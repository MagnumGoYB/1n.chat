import type { Variants } from 'motion/react'

export const SideBarMotionVariants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.15,
      ease: 'easeInOut',
    },
  },
  hidden: {
    opacity: 0,
    x: -5,
    transition: {
      duration: 0.15,
      ease: 'easeInOut',
    },
  },
} satisfies Variants
