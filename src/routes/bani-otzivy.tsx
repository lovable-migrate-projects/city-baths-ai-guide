import { createFileRoute, Link } from "@tanstack/react-router";
import styled from "styled-components";
import { PageShell } from "../components/layout/PageShell";
import { reviews } from "../data/reviews";
import { Star, MapPin, CalendarDays } from "lucide-react";

export const Route = createFileRoute("/bani-otzivy")({
  head: () => ({
    meta: [
      { title: "Отзывы о банях и саунах — Городские бани" },
      { name: "description", content: "Свежие отзывы посетителей бань и саун. Реальные впечатления и оценки." },
    ],
  }),
  component: ReviewsPage,
});

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  @media (min-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Card = styled.article`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 20px;
  display: flex; flex-direction: column; gap: 10px;
  transition: box-shadow .15s, transform .15s;
  &:hover { box-shadow: ${({ theme }) => theme.shadows.card}; transform: translateY(-2px); }
`;

const Top = styled.div`
  display: flex; justify-content: space-between; align-items: flex-start; gap: 10px;
`;

const Author = styled.div`
  display: flex; align-items: center; gap: 10px;
  .avatar {
    width: 40px; height: 40px; border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.primary};
    display: grid; place-items: center;
    font-weight: 700; font-size: 15px;
  }
  .name { font-weight: 600; }
  .meta { font-size: 12.5px; color: ${({ theme }) => theme.colors.muted}; display: flex; align-items: center; gap: 4px; }
`;

const Stars = styled.div`
  display: inline-flex; gap: 2px;
  svg { color: ${({ theme }) => theme.colors.star}; }
`;

const Text = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: 14.5px;
  line-height: 1.55;
`;

const CompanyLink = styled(Link)`
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13.5px; font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: auto;
`;

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

function ReviewsPage() {
  return (
    <PageShell
      title="Отзывы о банях и саунах"
      subtitle="Свежие впечатления реальных посетителей. Делитесь и вы — помогите другим выбрать заведение."
    >
      <Grid>
        {reviews.map((r) => (
          <Card key={r.id}>
            <Top>
              <Author>
                <div className="avatar">{r.author.charAt(0)}</div>
                <div>
                  <div className="name">{r.author}</div>
                  <div className="meta"><CalendarDays size={12} /> {fmtDate(r.date)}</div>
                </div>
              </Author>
              <Stars>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill={i < r.rating ? "currentColor" : "none"} />
                ))}
              </Stars>
            </Top>
            <Text>{r.text}</Text>
            <CompanyLink to="/companies/$id" params={{ id: r.companyId }}>
              <MapPin size={14} /> {r.companyName} · {r.companyCity}
            </CompanyLink>
          </Card>
        ))}
      </Grid>
    </PageShell>
  );
}
