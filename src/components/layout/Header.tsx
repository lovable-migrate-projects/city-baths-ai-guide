import styled from "styled-components";
import { Link } from "@tanstack/react-router";
import { Flame } from "lucide-react";

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: ${({ theme }) => theme.colors.bg}cc;
  backdrop-filter: saturate(140%) blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 800;
  font-size: 18px;
  &:hover { text-decoration: none; }
`;

const Logo = styled.span`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryGlow});
  color: white;
  display: grid;
  place-items: center;
  box-shadow: ${({ theme }) => theme.shadows.glow};
`;

const Nav = styled.nav`
  display: none;
  gap: 24px;
  @media (min-width: ${({ theme }) => theme.bp.md}) {
    display: flex;
  }
  a {
    color: ${({ theme }) => theme.colors.textSoft};
    font-weight: 500;
    font-size: 15px;
    &:hover { color: ${({ theme }) => theme.colors.primary}; text-decoration: none; }
  }
`;

const CTA = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-weight: 600;
  font-size: 14px;
  &:hover { background: ${({ theme }) => theme.colors.primaryDark}; text-decoration: none; }
`;

export function Header() {
  return (
    <Bar>
      <Inner>
        <Brand to="/">
          <Logo><Flame size={20} /></Logo>
          Городские бани
        </Brand>
        <Nav>
          <Link to="/">Каталог</Link>
          <a href="/map/">Карта</a>
          <a href="/bani-otzivy/">Отзывы</a>
          <a href="/ratings/">Рейтинги</a>
          <a href="/about/">О нас</a>
        </Nav>
        <CTA to="/">Разместить заведение</CTA>
      </Inner>
    </Bar>
  );
}
