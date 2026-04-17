import { useRef, ReactNode, HTMLAttributes } from 'react'
import { useSectionViewTracking } from '@/lib/analytics'

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  index: number
  as?: 'div' | 'section'
  children: ReactNode
}

export default function Section({ name, index, as = 'div', children, ...rest }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  useSectionViewTracking(ref, name, index)

  const Tag = as as 'div'
  return (
    <Tag ref={ref} data-section={name} {...rest}>
      {children}
    </Tag>
  )
}
