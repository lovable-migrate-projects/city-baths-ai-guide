import styled from 'styled-components'

import { List as ListIcon, MapIcon } from 'lucide-react'
import { AIChatPanel } from '@/components/ai/AIChatPanel'
import React, { useState } from 'react'
import { ChatMessage, Company } from '@/types'
import { CompanyCard } from '@/components/catalog/CompanyCard'
import { OwnerCTA } from '@/components/catalog/OwnerCTA'

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

type MainPageViewProps = {
  companies: Company[]
  messages: ChatMessage[]
  handleSend: ((text: string) => void) | undefined
  suggestions: string[]
  map: React.ReactNode
  hovered: string | null | undefined
  setHovered: React.Dispatch<React.SetStateAction<string | null>> | undefined
  total: number | undefined
  showStats: boolean
}

export const MainPageView: React.FC<MainPageViewProps> = ({
  companies: list,
  messages,
  handleSend,
  suggestions,
  map,
  hovered,
  setHovered,
  total,
  showStats,
}) => {
  const [view, setView] = useState<'list' | 'map'>('list')

  return (
    <>
      <Hero>
        <HeroInner>
          <HeroText>
            <h1>Городские и общественные бани</h1>
            <p>
              Найдите идеальную баню или сауну: спросите ИИ-помощника на
              естественном языке или выберите на карте. Каталог проверенных
              заведений с 2012 года.
            </p>
            {showStats && (
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
            )}
          </HeroText>
          <AIChatPanel
            messages={messages}
            onSend={handleSend}
            suggestions={suggestions}
          />
        </HeroInner>
      </Hero>

      <Section>
        <Toolbar>
          <h2>Все заведения {!!total && <small>{total} в каталоге</small>}</h2>
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
          <ListGrid>
            {list.map((c) => (
              <CompanyCard
                key={c.id}
                company={c}
                highlighted={hovered === c.id}
                onHover={setHovered}
              />
            ))}
          </ListGrid>

          {map}
        </Layout>

        <OwnerCTA />
      </Section>
    </>
  )
}
