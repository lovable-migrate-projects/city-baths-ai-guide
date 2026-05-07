import styled from 'styled-components'
import React, { useState } from 'react'
import { Sparkles, X } from 'lucide-react'
import { AIChatPanel } from './AIChatPanel'
import type { ChatMessage } from '../../types'

type Props = {
  messages: ChatMessage[]
  isStreaming?: boolean
  onSend: (text: string) => void
  suggestions?: string[]
}

const Fab = styled.button`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 60;
  border: 0;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.primaryGlow}
  );
  color: white;
  padding: 14px 18px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: ${({ theme }) => theme.shadows.glow};
  transition: transform 0.12s;
  &:hover {
    transform: translateY(-2px);
  }
`

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 70;
  background: rgba(15, 23, 42, 0.4);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0;
  @media (min-width: ${({ theme }) => theme.bp.md}) {
    align-items: center;
    padding: 20px;
  }
`

const Panel = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radii.xl}
    ${({ theme }) => theme.radii.xl} 0 0;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow: auto;
  padding: 18px;
  position: relative;
  @media (min-width: ${({ theme }) => theme.bp.md}) {
    border-radius: ${({ theme }) => theme.radii.xl};
  }
`

const Close = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  border: 0;
  background: ${({ theme }) => theme.colors.surface};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }
`

export function AIChatFloating(props: Props) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Fab onClick={() => setOpen(true)} aria-label="Открыть ИИ-чат">
        <Sparkles size={18} /> Спросить ИИ
      </Fab>
      {open && (
        <Backdrop onClick={() => setOpen(false)}>
          <Panel
            onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
          >
            <Close onClick={() => setOpen(false)} aria-label="Закрыть">
              <X size={18} />
            </Close>
            <AIChatPanel {...props} compact />
          </Panel>
        </Backdrop>
      )}
    </>
  )
}
