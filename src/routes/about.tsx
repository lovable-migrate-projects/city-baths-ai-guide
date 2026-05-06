import { createFileRoute, Link } from "@tanstack/react-router";
import styled from "styled-components";
import { PageShell } from "../components/layout/PageShell";
import { Calendar, Users, Sparkles, Heart, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О проекте — Городские бани" },
      { name: "description", content: "Каталог общественных бань и саун России с 2012 года. Наша миссия и команда." },
    ],
  }),
  component: AboutPage,
});

const Lead = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 28px;
  margin-bottom: 28px;
  font-size: 17px;
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.65;
`;

const Grid = styled.div`
  display: grid; gap: 16px;
  grid-template-columns: 1fr;
  margin-bottom: 32px;
  @media (min-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${({ theme }) => theme.bp.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Stat = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent}, white);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 22px;
  .icon { width: 40px; height: 40px; border-radius: ${({ theme }) => theme.radii.md}; background: white; color: ${({ theme }) => theme.colors.primary}; display: grid; place-items: center; margin-bottom: 12px; }
  strong { display: block; font-family: ${({ theme }) => theme.fonts.heading}; font-size: 28px; color: ${({ theme }) => theme.colors.text}; }
  span { font-size: 14px; color: ${({ theme }) => theme.colors.muted}; }
`;

const Section = styled.section`
  margin-bottom: 32px;
  h2 { font-size: 24px; margin-bottom: 14px; }
  p { color: ${({ theme }) => theme.colors.textSoft}; line-height: 1.65; }
`;

const Values = styled.div`
  display: grid; gap: 14px;
  grid-template-columns: 1fr;
  @media (min-width: ${({ theme }) => theme.bp.md}) { grid-template-columns: repeat(3, 1fr); }
`;

const Value = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 22px;
  svg { color: ${({ theme }) => theme.colors.primary}; margin-bottom: 10px; }
  h3 { font-size: 17px; margin-bottom: 6px; }
  p { font-size: 14px; color: ${({ theme }) => theme.colors.textSoft}; margin: 0; }
`;

const CTA = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 32px;
  display: flex; flex-direction: column; gap: 14px; align-items: flex-start;
  h3 { color: white; font-size: 22px; margin: 0; }
  p { color: rgba(255,255,255,.85); margin: 0; }
  a {
    display: inline-flex; align-items: center; gap: 8px;
    background: white; color: ${({ theme }) => theme.colors.primary};
    padding: 12px 20px; border-radius: ${({ theme }) => theme.radii.pill};
    font-weight: 600; text-decoration: none;
    &:hover { text-decoration: none; opacity: .92; }
  }
`;

function AboutPage() {
  return (
    <PageShell
      title="О проекте «Городские бани»"
      subtitle="Помогаем людям находить настоящие бани с 2012 года."
    >
      <Lead>
        Портал «Городские бани» — это крупнейший в России каталог общественных бань и саун. Мы собираем информацию о заведениях, проверяем её, публикуем отзывы реальных посетителей и помогаем людям делать осознанный выбор. С 2024 года в каталоге работает ИИ-помощник, который подбирает баню под ваш запрос на естественном языке.
      </Lead>

      <Grid>
        <Stat>
          <div className="icon"><Calendar size={20} /></div>
          <strong>14 лет</strong>
          <span>в работе</span>
        </Stat>
        <Stat>
          <div className="icon"><Users size={20} /></div>
          <strong>500k+</strong>
          <span>посетителей в месяц</span>
        </Stat>
        <Stat>
          <div className="icon"><Sparkles size={20} /></div>
          <strong>1 200+</strong>
          <span>заведений</span>
        </Stat>
        <Stat>
          <div className="icon"><Heart size={20} /></div>
          <strong>14 000</strong>
          <span>отзывов</span>
        </Stat>
      </Grid>

      <Section>
        <h2>Наша миссия</h2>
        <p>
          Сохранять и развивать культуру русской бани. Делать поиск качественного заведения простым и быстрым — будь то историческая баня в центре города или новая частная сауна на окраине. Мы независимы от рекламодателей, поэтому отзывы и рейтинги остаются честными.
        </p>
      </Section>

      <Section>
        <h2>Наши принципы</h2>
        <Values>
          <Value>
            <Heart size={24} />
            <h3>Честность</h3>
            <p>Не удаляем негативные отзывы и не торгуем местами в рейтинге.</p>
          </Value>
          <Value>
            <Sparkles size={24} />
            <h3>Технологии</h3>
            <p>Используем ИИ для точного подбора заведений и интерактивные карты.</p>
          </Value>
          <Value>
            <Users size={24} />
            <h3>Сообщество</h3>
            <p>Любители бань пишут отзывы и делятся опытом друг с другом.</p>
          </Value>
        </Values>
      </Section>

      <CTA>
        <h3>Это ваше заведение?</h3>
        <p>Разместите его в каталоге бесплатно и получайте новых клиентов.</p>
        <Link to="/companies/create">Разместить заведение <ArrowRight size={16} /></Link>
      </CTA>
    </PageShell>
  );
}
