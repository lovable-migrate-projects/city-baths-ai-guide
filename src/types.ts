export type Company = {
  id: string
  slug: string
  name: string
  city: string
  address: string
  image: string
  rating: number // 0..5
  reviewsCount: number
  hours: string // e.g. "10:00 – 23:00"
  isOpenNow: boolean
  priceFrom?: number // RUB
  tags: string[]
  lat: number
  lng: number
}

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string // markdown
  companies?: Company[]
}
