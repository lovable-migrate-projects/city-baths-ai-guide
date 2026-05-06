import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import styled from "styled-components";
import { PageShell } from "../components/layout/PageShell";
import { ClientOnly } from "../components/ClientOnly";
import { CompaniesMap } from "../components/map/CompaniesMap";
import { companies as ALL } from "../data/companies";
import { reviews as ALL_REVIEWS } from "../data/reviews";
import { Star, MapPin, Clock, Phone, Globe, ChevronLeft, CalendarDays } from "lucide-react";

export const Route = createFileRoute("/companies/$id")({
  loader: ({ params }) => {
    const company = ALL.find((c) => c.id === params.id);
    if (!company) throw notFound();
    return { company };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.company.name} — отзывы, фото, цены` },
      { name: "description", content: `${loaderData.company.name} в городе ${loaderData.company.city}. Адрес: ${loaderData.company.address}. Рейтинг ${loaderData.company.rating.toFixed(1)} на основе ${loaderData.company.reviewsCount} отзывов.` },
    ] : [],
  }),
  component: CompanyPage,
  notFoundComponent: () => (
    <PageShell title="Заведение не найдено" subtitle="Возможно, оно было удалено или адрес ошибочен.">
      <Link to="/">← Вернуться в каталог</Link>
    </PageShell>
  ),
  errorComponent: ({ error }) => (
    <PageShell title="Ошибка загрузки" subtitle={error.message}>
      <Link to="/">← Вернуться в каталог</Link>
    </PageShell>
  ),
});

const Back = styled(Link)`
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 14px; font-weight: 600; margin-bottom: 16px;
`;

const Hero = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
  margin-bottom: 28px;
  @media (min-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: 1.3fr 1fr;
  }
`;

const Cover = styled.div<{ $src: string }>`
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  border-radius: ${({ theme }) => theme.radii.lg};
  min-height: 280px;
`;

const Info = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 24px;
  display: flex; flex-direction: column; gap: 12px;
  h1 { font-size: 26px; margin: 0; }
`;

const RatingBig = styled.div`
  display: inline-flex; align-items: baseline; gap: 6px;
  font-family: ${({ theme }) => theme.fonts.heading};
  strong { font-size: 32px; font-weight: 800; }
  svg { color: ${({ theme }) => theme.colors.star }; fill: ${({ theme }) => theme.colors.star}; align-self: center; }
  span { color: ${({ theme }) => theme.colors.muted}; font-size: 14px; font-weight: 400; font-family: ${({ theme }) => theme.fonts.body}; }
`;

const InfoRow = styled.div`
  display: flex; align-items: center; gap: 8px;
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: 14.5px;
  svg { color: ${({ theme }) => theme.colors.primary}; flex-shrink: 0; }
`;

const Tags = styled.div`
  display: flex; flex-wrap: wrap; gap: 6px;
`;

const Tag = styled.span`
  font-size: 12.5px;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.primaryDark};
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.radii.pill};
`;

const Btn = styled.a`
  margin-top: 6px;
  background: ${({ theme }) => theme.colors.primary};
  color: white !important;
  padding: 12px 20px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-weight: 600;
  text-align: center;
  &:hover { background: ${({ theme }) => theme.colors.primaryDark}; text-decoration: none; }
`;

const Section = styled.section`
  margin-bottom: 28px;
  h2 { font-size: 22px; margin-bottom: 14px; }
`;

const MapWrap = styled.div`
  height: 360px;
  .leaflet-container { height: 100% !important; min-height: 360px; }
`;

const ReviewCard = styled.article`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 18px;
  margin-bottom: 12px;
  display: flex; flex-direction: column; gap: 8px;
  .head { display: flex; justify-content: space-between; gap: 10px; }
  .who { font-weight: 600; }
  .meta { font-size: 12.5px; color: ${({ theme }) => theme.colors.muted}; display: flex; align-items: center; gap: 4px; }
  .stars { display: inline-flex; gap: 2px; color: ${({ theme }) => theme.colors.star}; }
  p { margin: 0; color: ${({ theme }) => theme.colors.textSoft}; font-size: 14.5px; }
`;

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

function CompanyPage() {
  const { company } = Route.useLoaderData();
  const companyReviews = ALL_REVIEWS.filter((r) => r.companyId === company.id);

  return (
    <PageShell title={company.name} subtitle={`${company.city}, ${company.address}`}>
      <Back to="/"><ChevronLeft size={16} /> К каталогу</Back>

      <Hero>
        <Cover $src={company.image} role="img" aria-label={company.name} />
        <Info>
          <h1>{company.name}</h1>
          <RatingBig>
            <Star size={22} />
            <strong>{company.rating.toFixed(1)}</strong>
            <span>({company.reviewsCount} отзывов)</span>
          </RatingBig>
          <InfoRow><MapPin size={16} /> {company.address}</InfoRow>
          <InfoRow><Clock size={16} /> {company.hours} · {company.isOpenNow ? "сейчас открыто" : "сейчас закрыто"}</InfoRow>
          <InfoRow><Phone size={16} /> +7 (495) 000-00-00</InfoRow>
          <InfoRow><Globe size={16} /> gorodskie-bani.ru</InfoRow>
          {company.priceFrom && (
            <InfoRow><strong style={{ color: "inherit", fontSize: 18 }}>от {company.priceFrom.toLocaleString("ru-RU")} ₽ / час</strong></InfoRow>
          )}
          <Tags>
            {company.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </Tags>
          <Btn href="tel:+74950000000">Позвонить и забронировать</Btn>
        </Info>
      </Hero>

      <Section>
        <h2>На карте</h2>
        <MapWrap>
          <ClientOnly fallback={<div style={{ height: "100%", background: "#f7f9fc", borderRadius: 16 }} />}>
            <CompaniesMap companies={[company]} />
          </ClientOnly>
        </MapWrap>
      </Section>

      <Section>
        <h2>Отзывы ({companyReviews.length})</h2>
        {companyReviews.length === 0 ? (
          <p style={{ color: "#64748b" }}>Пока нет отзывов. Будьте первым!</p>
        ) : (
          companyReviews.map((r) => (
            <ReviewCard key={r.id}>
              <div className="head">
                <div>
                  <div className="who">{r.author}</div>
                  <div className="meta"><CalendarDays size={12} /> {fmtDate(r.date)}</div>
                </div>
                <div className="stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} fill={i < r.rating ? "currentColor" : "none"} />
                  ))}
                </div>
              </div>
              <p>{r.text}</p>
            </ReviewCard>
          ))
        )}
      </Section>
    </PageShell>
  );
}
