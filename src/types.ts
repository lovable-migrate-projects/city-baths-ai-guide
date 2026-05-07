export type Company = {
  id: string
  name: string
  priceFrom?: number // RUB
  tags: string[]
  lat: number
  lng: number
  address?: string
  image: string | null | undefined
  rating?: number // 0..5
  reviewsCount?: number
  hours?: string // e.g. "10:00 – 23:00"
  isOpenNow?: boolean
  city?: string
  slug?: string
  intro?: React.ReactNode
  href: string
}

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string // markdown
  companies?: Company[]
}
