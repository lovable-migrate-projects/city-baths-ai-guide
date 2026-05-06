import { createFileRoute, Link } from "@tanstack/react-router";
import styled from "styled-components";
import { useMemo, useState } from "react";
import { PageShell } from "../components/layout/PageShell";
import { companies as ALL } from "../data/companies";
import { Star, Trophy, MapPin } from "lucide-react";

export const Route = createFileRoute("/ratings")({
  head: () => ({
    meta: [
      { title: "Рейтинги бань и саун — Городские бани" },
      { name: "description", content: "Топ лучших бань и саун по рейтингу пользователей. Выбирайте проверенные заведения." },
    ],
  }),
  component: RatingsPage,
});

const Tabs = styled.div`
  display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;
`;

const Tab = styled.button<{ $active: boolean }>`
  border: 1px solid ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, $active }) => $active ? theme.colors.primary : "white"};
  color: ${({ $active }) => $active ? "white" : "inherit"};
  padding: 9px 18px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all .15s;
`;

const Table = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
`;

const Row = styled(Link)`
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  text-decoration: none;
  color: inherit;
  transition: background .15s;
  &:hover { background: ${({ theme }) => theme.colors.surface}; text-decoration: none; }
  &:last-child { border-bottom: 0; }
`;

const Rank = styled.div<{ $top: boolean }>`
  display: grid; place-items: center;
  width: 44px; height: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme, $top }) => $top ? theme.colors.accent : theme.colors.surface};
  color: ${({ theme, $top }) => $top ? theme.colors.primary : theme.colors.muted};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 800;
  font-size: 18px;
`;

const Info = styled.div`
  display: flex; flex-direction: column; gap: 4px;
  .name { font-weight: 700; font-size: 16px; font-family: ${({ theme }) => theme.fonts.heading}; }
  .meta { font-size: 13px; color: ${({ theme }) => theme.colors.muted}; display: flex; align-items: center; gap: 4px; }
`;

const RatingCell = styled.div`
  display: flex; align-items: center; gap: 6px;
  font-weight: 700; font-size: 16px;
  svg { color: ${({ theme }) => theme.colors.star}; fill: ${({ theme }) => theme.colors.star}; }
  small { font-weight: 400; color: ${({ theme }) => theme.colors.muted}; font-size: 12.5px; margin-left: 4px; }
`;

const CITIES = ["Все города", "Москва", "Санкт-Петербург", "Екатеринбург"];

function RatingsPage() {
  const [city, setCity] = useState("Все города");

  const ranked = useMemo(() => {
    const filtered = city === "Все города" ? ALL : ALL.filter((c) => c.city === city);
    return [...filtered].sort((a, b) => b.rating - a.rating);
  }, [city]);

  return (
    <PageShell
      title="Рейтинги бань и саун"
      subtitle="Лучшие заведения по оценкам пользователей. Обновляется ежедневно."
    >
      <Tabs>
        {CITIES.map((c) => (
          <Tab key={c} $active={city === c} onClick={() => setCity(c)}>{c}</Tab>
        ))}
      </Tabs>

      <Table>
        {ranked.map((c, i) => (
          <Row key={c.id} to={"/companies/$id" as string} params={{ id: c.id } as never}>
            <Rank $top={i < 3}>
              {i < 3 ? <Trophy size={18} /> : i + 1}
            </Rank>
            <Info>
              <div className="name">{c.name}</div>
              <div className="meta"><MapPin size={12} /> {c.city}, {c.address}</div>
            </Info>
            <RatingCell>
              <Star size={18} />
              {c.rating.toFixed(1)}
              <small>({c.reviewsCount})</small>
            </RatingCell>
          </Row>
        ))}
      </Table>
    </PageShell>
  );
}
