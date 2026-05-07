import styled from "styled-components";
import { Link as DefaultLink } from "@tanstack/react-router";
import type { ComponentType, ReactNode } from "react";

type LinkLikeProps = {
  to: string;
  className?: string;
  children?: ReactNode;
};

export type FooterLink = {
  to: string;
  label: ReactNode;
};

export type FooterSection = {
  title: ReactNode;
  links: ReadonlyArray<FooterLink>;
};

export type FooterProps = {
  /** Компонент-ссылка (по умолчанию — Link из @tanstack/react-router). */
  LinkComponent?: ComponentType<LinkLikeProps>;
  /** Блок «О проекте» слева. */
  aboutTitle?: ReactNode;
  aboutText?: ReactNode;
  /** Колонки со ссылками. */
  sections?: ReadonlyArray<FooterSection>;
  /** Нижняя строка (по умолчанию — копирайт). */
  bottomText?: ReactNode;
};

const Wrap = styled.footer`
  margin-top: 80px;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr;
  @media (min-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
`;

const Col = styled.div`
  h4 {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.colors.muted};
    margin-bottom: 12px;
  }
  ul li {
    margin-bottom: 8px;
  }
  a {
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: 14px;
  }
`;

const About = styled.div`
  p {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 14px;
    max-width: 360px;
  }
  strong {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 18px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Bottom = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 16px 20px;
  text-align: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
`;

// eslint-disable-next-line react-refresh/only-export-components
export const DEFAULT_FOOTER_SECTIONS: ReadonlyArray<FooterSection> = [
  {
    title: "Навигация",
    links: [
      { to: "/", label: "Каталог" },
      { to: "/map", label: "Карта" },
      { to: "/ratings", label: "Рейтинги" },
      { to: "/bani-otzivy", label: "Отзывы" },
    ],
  },
  {
    title: "Владельцам",
    links: [
      { to: "/companies/create", label: "Разместить заведение" },
      { to: "/about", label: "Тарифы" },
    ],
  },
  {
    title: "Информация",
    links: [
      { to: "/about", label: "О проекте" },
      { to: "/about", label: "Контакты" },
    ],
  },
];

const DefaultLinkAsLike = DefaultLink as unknown as ComponentType<LinkLikeProps>;

export function Footer({
  LinkComponent = DefaultLinkAsLike,
  aboutTitle = "Городские бани",
  aboutText = "Каталог общественных бань и саун с 2012 года. Помогаем находить места для отдыха и парения по всей России.",
  sections = DEFAULT_FOOTER_SECTIONS,
  bottomText = `© 2012–${new Date().getFullYear()} Городские бани`,
}: FooterProps = {}) {
  return (
    <Wrap>
      <Inner>
        <About>
          <strong>{aboutTitle}</strong>
          <p>{aboutText}</p>
        </About>
        {sections.map((section, i) => (
          <Col key={i}>
            <h4>{section.title}</h4>
            <ul>
              {section.links.map((link, j) => (
                <li key={j}>
                  <LinkComponent to={link.to}>{link.label}</LinkComponent>
                </li>
              ))}
            </ul>
          </Col>
        ))}
      </Inner>
      <Bottom>{bottomText}</Bottom>
    </Wrap>
  );
}
