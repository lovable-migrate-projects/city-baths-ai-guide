import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { AIChatFloating } from '../components/ai/AIChatFloating'
import { companies as ALL } from '../data/companies'
import type { ChatMessage } from '../types'
import { MainPageView } from '@/components/pages/MainPage/View/MainPageView'
import { ClientOnly } from '@/components/ClientOnly'
import { CompaniesMap } from '@/components/map/CompaniesMap'

export const Route = createFileRoute('/')({
  component: Home,
})

const SUGGESTIONS = [
  'Баня с бассейном в Москве',
  'Парная на дровах',
  'До 2000₽ за час',
  'Открыто сейчас',
  'Хамам и СПА',
]

function demoAnswer(q: string): ChatMessage {
  const lower = q.toLowerCase()
  let pool = ALL
  if (lower.includes('бассейн'))
    pool = pool.filter((c) => c.tags.some((t) => /бассейн/i.test(t)))
  if (lower.includes('дров'))
    pool = pool.filter((c) => c.tags.some((t) => /дров/i.test(t)))
  if (lower.includes('спб') || lower.includes('петербург'))
    pool = pool.filter((c) => c.city?.includes('Петербург'))
  if (lower.includes('екатеринбург'))
    pool = pool.filter((c) => c.city?.includes('Екатеринбург'))
  if (lower.includes('москв')) pool = pool.filter((c) => c.city === 'Москва')
  if (pool.length === 0) pool = ALL
  const top = pool.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 4)
  return {
    id: crypto.randomUUID(),
    role: 'assistant',
    content: `Подобрал **${top.length}** заведений по запросу _«${q}»_. Это демо-ответ — подключите своего ИИ-агента к компоненту, чтобы выдавать настоящие результаты.`,
    companies: top,
  }
}

function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const handleSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: 'user', content: text },
    ])
    setTimeout(() => {
      setMessages((prev) => [...prev, demoAnswer(text)])
    }, 600)
  }

  const companies = useMemo(() => ALL, [])

  const [hovered, setHovered] = useState<string | null>(null)

  const map = (
    <div className="map">
      <ClientOnly fallback={<div style={{ minHeight: 480 }} />}>
        <CompaniesMap companies={companies} highlightedId={hovered} />
      </ClientOnly>
    </div>
  )

  return (
    <>
      <Header />

      <MainPageView
        companies={companies}
        messages={messages}
        handleSend={handleSend}
        suggestions={SUGGESTIONS}
        map={map}
        hovered={hovered}
        setHovered={setHovered}
        total={1211}
        showStats={true}
      />

      <Footer />

      <AIChatFloating
        messages={messages}
        onSend={handleSend}
        suggestions={SUGGESTIONS}
      />
    </>
  )
}
