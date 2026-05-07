import { createFileRoute } from '@tanstack/react-router'
import styled from 'styled-components'
import { useMemo, useState } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { AIChatPanel } from '../components/ai/AIChatPanel'
import { AIChatFloating } from '../components/ai/AIChatFloating'
import { CompanyCard } from '../components/catalog/CompanyCard'
import { OwnerCTA } from '../components/catalog/OwnerCTA'
import { ClientOnly } from '../components/ClientOnly'
import { CompaniesMap } from '../components/map/CompaniesMap'
import { companies as ALL } from '../data/companies'
import type { ChatMessage } from '../types'
import { List as ListIcon, MapIcon } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

const Hero = styled.section`
  background:
    radial-gradient(
      1000px 400px at 80% -10%,
      ${({ theme }) => theme.colors.accent},
      transparent 60%
    ),
    radial-gradient(
      800px 320px at -10% 10%,
      ${({ theme }) => theme.colors.accent},
      transparent 60%
    ),
    ${({ theme }) => theme.colors.bg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const HeroInner = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 56px 20px 40px;
  display: grid;
  gap: 28px;
  grid-template-columns: 1fr;
  @media (min-width: ${({ theme }) => theme.bp.lg}) {
    grid-template-columns: 1.05fr 1fr;
    align-items: center;
    padding: 72px 20px 56px;
  }
`

const HeroText = styled.div`
  h1 {
    font-size: clamp(28px, 4.2vw, 46px);
    line-height: 1.08;
    margin-bottom: 14px;
  }
  p {
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: 17px;
    max-width: 540px;
    margin-bottom: 18px;
  }
`

const Stats = styled.div`
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
  div {
    display: flex;
    flex-direction: column;
  }
  strong {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 22px;
    color: ${({ theme }) => theme.colors.text};
  }
  span {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.muted};
  }
`

const Section = styled.section`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 40px 20px 0;
`

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  h2 {
    font-size: 24px;
    margin: 0;
  }
  small {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 14px;
    margin-left: 6px;
    font-weight: 400;
  }
`

const Toggle = styled.div`
  display: inline-flex;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 4px;
  @media (min-width: ${({ theme }) => theme.bp.lg}) {
    display: none;
  }
`

const ToggleBtn = styled.button<{ $active: boolean }>`
  border: 0;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ $active }) => ($active ? 'white' : 'inherit')};
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-weight: 600;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`

const Layout = styled.div<{ $view: 'list' | 'map' }>`
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
  > .list {
    display: ${({ $view }) => ($view === 'list' ? 'grid' : 'none')};
  }
  > .map {
    display: ${({ $view }) => ($view === 'map' ? 'block' : 'none')};
    min-height: 480px;
  }
  @media (min-width: ${({ theme }) => theme.bp.lg}) {
    grid-template-columns: 1.1fr 1fr;
    > .list,
    > .map {
      display: block;
    }
    > .map {
      position: sticky;
      top: 80px;
      height: calc(100vh - 100px);
    }
  }
`

const ListGrid = styled.div`
  display: grid;
  gap: 14px;
`

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
    pool = pool.filter((c) => c.city.includes('Петербург'))
  if (lower.includes('екатеринбург'))
    pool = pool.filter((c) => c.city.includes('Екатеринбург'))
  if (lower.includes('москв')) pool = pool.filter((c) => c.city === 'Москва')
  if (pool.length === 0) pool = ALL
  const top = pool.sort((a, b) => b.rating - a.rating).slice(0, 4)
  return {
    id: crypto.randomUUID(),
    role: 'assistant',
    content: `Подобрал **${top.length}** заведений по запросу _«${q}»_. Это демо-ответ — подключите своего ИИ-агента к компоненту, чтобы выдавать настоящие результаты.`,
    companies: top,
  }
}

function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [view, setView] = useState<'list' | 'map'>('list')
  const [hovered, setHovered] = useState<string | null>(null)

  const handleSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: 'user', content: text },
    ])
    setTimeout(() => {
      setMessages((prev) => [...prev, demoAnswer(text)])
    }, 600)
  }

  const list = useMemo(() => ALL, [])

  return (
    <>
      <Header />

      <Hero>
        <HeroInner>
          <HeroText>
            <h1>Городские и общественные бани</h1>
            <p>
              Найдите идеальную баню или сауну: спросите ИИ-помощника на
              естественном языке или выберите на карте. Каталог проверенных
              заведений с 2012 года.
            </p>
            <Stats>
              <div>
                <strong>1 200+</strong>
                <span>заведений</span>
              </div>
              <div>
                <strong>85</strong>
                <span>городов</span>
              </div>
              <div>
                <strong>14k</strong>
                <span>отзывов</span>
              </div>
            </Stats>
          </HeroText>
          <AIChatPanel
            messages={messages}
            onSend={handleSend}
            suggestions={SUGGESTIONS}
          />
        </HeroInner>
      </Hero>

      <Section>
        <Toolbar>
          <h2>
            Все заведения <small>{list.length} в каталоге</small>
          </h2>
          <Toggle role="tablist">
            <ToggleBtn
              $active={view === 'list'}
              onClick={() => setView('list')}
            >
              <ListIcon size={14} /> Список
            </ToggleBtn>
            <ToggleBtn $active={view === 'map'} onClick={() => setView('map')}>
              <MapIcon size={14} /> Карта
            </ToggleBtn>
          </Toggle>
        </Toolbar>

        <Layout $view={view}>
          <ListGrid className="list">
            {list.map((c) => (
              <CompanyCard
                key={c.id}
                company={c}
                highlighted={hovered === c.id}
                onHover={setHovered}
              />
            ))}
          </ListGrid>
          <div className="map">
            <ClientOnly fallback={<div style={{ minHeight: 480 }} />}>
              <CompaniesMap companies={list} highlightedId={hovered} />
            </ClientOnly>
          </div>
        </Layout>

        <OwnerCTA />
      </Section>

      <Footer />

      <AIChatFloating
        messages={messages}
        onSend={handleSend}
        suggestions={SUGGESTIONS}
      />
    </>
  )
}
