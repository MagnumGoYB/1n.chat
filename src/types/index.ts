export type IconSvgProps = React.SVGProps<SVGSVGElement> & {
  size?: number
}

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined
}>
