import styled from "styled-components";
import { Star, MapPin, Clock } from "lucide-react";
import type { Company } from "../../types";

const Card = styled.article<{ $highlighted?: boolean }>`
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 14px;
  background: white;
  border: 1px solid
    ${({ theme, $highlighted }) => ($highlighted ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  transition:
    border-color 0.15s,
    transform 0.15s,
    box-shadow 0.15s;
  cursor: pointer;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.card};
    transform: translateY(-2px);
  }
  @media (min-width: ${({ theme }) => theme.bp.sm}) {
    grid-template-columns: 180px 1fr;
  }
`;

const Img = styled.div<{ $src: string }>`
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  min-height: 130px;
`;

const Body = styled.div`
  padding: 14px 14px 14px 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.muted};
  svg {
    flex-shrink: 0;
  }
`;

const Rating = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  svg {
    color: ${({ theme }) => theme.colors.star};
    fill: ${({ theme }) => theme.colors.star};
  }
  small {
    font-weight: 400;
    color: ${({ theme }) => theme.colors.muted};
    margin-left: 4px;
  }
`;

const Status = styled.span<{ $open: boolean }>`
  font-size: 12.5px;
  font-weight: 600;
  color: ${({ $open, theme }) => ($open ? theme.colors.success : theme.colors.danger)};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
`;

const Tag = styled.span`
  font-size: 12px;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.primaryDark};
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.radii.pill};
`;

const TopLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

type Props = {
  company: Company;
  highlighted?: boolean;
  onHover?: (id: string | null) => void;
};

export function CompanyCard({ company, highlighted, onHover }: Props) {
  return (
    <Card
      $highlighted={highlighted}
      onMouseEnter={() => onHover?.(company.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      <Img $src={company.image} role="img" aria-label={company.name} />
      <Body>
        <TopLine>
          <Title href={`/companies/${company.id}/`}>{company.name}</Title>
          <Rating>
            <Star size={15} />
            {company.rating.toFixed(1)}
            <small>({company.reviewsCount})</small>
          </Rating>
        </TopLine>
        <Row>
          <MapPin size={14} /> {company.city}, {company.address}
        </Row>
        <Row>
          <Clock size={14} /> {company.hours}
          <span style={{ marginLeft: 8 }}>
            <Status $open={company.isOpenNow}>{company.isOpenNow ? "Открыто" : "Закрыто"}</Status>
          </span>
        </Row>
        {company.priceFrom && (
          <Row style={{ color: "inherit" }}>
            <strong>от {company.priceFrom.toLocaleString("ru-RU")} ₽</strong>
          </Row>
        )}
        <Tags>
          {company.tags.slice(0, 3).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </Tags>
      </Body>
    </Card>
  );
}
