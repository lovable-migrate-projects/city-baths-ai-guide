import styled, { keyframes } from "styled-components";
import { Send, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import type { ChatMessage, Company } from "../../types";

type Props = {
  messages: ChatMessage[];
  isStreaming?: boolean;
  onSend: (text: string) => void;
  suggestions?: string[];
  compact?: boolean;
};

const Card = styled.div<{ $compact?: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ $compact }) => ($compact ? "16px" : "20px")};
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  &::before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryGlow}, transparent 60%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    pointer-events: none;
    opacity: .9;
  }
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  svg { color: ${({ theme }) => theme.colors.primary}; }
`;

const Hint = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 14px;
`;

const Messages = styled.div`
  max-height: 360px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 6px 2px;
  margin-bottom: 12px;
  &:empty { display: none; }
`;

const Bubble = styled.div<{ $role: "user" | "assistant" }>`
  align-self: ${({ $role }) => ($role === "user" ? "flex-end" : "flex-start")};
  max-width: 85%;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radii.lg};
  font-size: 14.5px;
  line-height: 1.5;
  background: ${({ $role, theme }) => ($role === "user" ? theme.colors.primary : theme.colors.accent)};
  color: ${({ $role, theme }) => ($role === "user" ? "white" : theme.colors.text)};
  p { margin: 0 0 .5em; &:last-child { margin: 0; } }
  ul, ol { padding-left: 18px; margin: .25em 0; }
`;

const ResultsRow = styled.div`
  display: grid;
  gap: 8px;
  margin-top: 8px;
  grid-template-columns: 1fr;
  @media (min-width: ${({ theme }) => theme.bp.sm}) { grid-template-columns: 1fr 1fr; }
`;

const Result = styled.a`
  display: flex;
  gap: 10px;
  padding: 8px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  &:hover { border-color: ${({ theme }) => theme.colors.primary}; text-decoration: none; }
  img { width: 56px; height: 56px; object-fit: cover; border-radius: 8px; }
  strong { font-size: 14px; display: block; }
  span { font-size: 12px; color: ${({ theme }) => theme.colors.muted}; }
`;

const InputRow = styled.form`
  display: flex;
  gap: 8px;
  align-items: stretch;
`;

const Input = styled.input`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 12px 18px;
  font-size: 15px;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  transition: border-color .15s, background .15s;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background: white;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.accent};
  }
`;

const SendBtn = styled.button`
  border: 0;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 0 20px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background .15s, transform .05s;
  &:hover { background: ${({ theme }) => theme.colors.primaryDark}; }
  &:active { transform: translateY(1px); }
  &:disabled { opacity: .6; cursor: not-allowed; }
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const Chip = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: white;
  color: ${({ theme }) => theme.colors.textSoft};
  padding: 7px 12px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 13px;
  transition: all .15s;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const blink = keyframes`
  0%, 80%, 100% { opacity: .25; }
  40% { opacity: 1; }
`;

const Typing = styled.div`
  display: inline-flex;
  gap: 4px;
  align-self: flex-start;
  padding: 12px 14px;
  background: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.lg};
  span {
    width: 6px; height: 6px; border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    animation: ${blink} 1.2s infinite;
  }
  span:nth-child(2) { animation-delay: .15s; }
  span:nth-child(3) { animation-delay: .3s; }
`;

function ResultCards({ companies }: { companies: Company[] }) {
  return (
    <ResultsRow>
      {companies.slice(0, 4).map((c) => (
        <Result key={c.id} href={`/companies/${c.id}/`}>
          <img src={c.image} alt={c.name} loading="lazy" />
          <div>
            <strong>{c.name}</strong>
            <span>{c.city} • ★ {c.rating.toFixed(1)}</span>
          </div>
        </Result>
      ))}
    </ResultsRow>
  );
}

export function AIChatPanel({
  messages,
  isStreaming,
  onSend,
  suggestions = [],
  compact,
}: Props) {
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9e9, behavior: "smooth" });
  }, [messages, isStreaming]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    onSend(t);
    setText("");
  };

  return (
    <Card $compact={compact}>
      <Head>
        <Sparkles size={20} />
        ИИ-помощник по баням
      </Head>
      <Hint>Опишите, что ищете — найду подходящие заведения</Hint>

      <Messages ref={scrollRef}>
        {messages.map((m) => (
          <Bubble key={m.id} $role={m.role}>
            <ReactMarkdown>{m.content}</ReactMarkdown>
            {m.companies && m.companies.length > 0 && (
              <ResultCards companies={m.companies} />
            )}
          </Bubble>
        ))}
        {isStreaming && <Typing><span /><span /><span /></Typing>}
      </Messages>

      <InputRow onSubmit={submit}>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Например: «баня с бассейном в Москве до 2500₽»"
          aria-label="Сообщение ИИ-помощнику"
        />
        <SendBtn type="submit" disabled={!text.trim() || isStreaming}>
          <Send size={16} /> Отправить
        </SendBtn>
      </InputRow>

      {suggestions.length > 0 && (
        <Chips>
          {suggestions.map((s) => (
            <Chip key={s} type="button" onClick={() => onSend(s)}>{s}</Chip>
          ))}
        </Chips>
      )}
    </Card>
  );
}
