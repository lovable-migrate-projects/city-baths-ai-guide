import styled from "styled-components";
import { Link } from "@tanstack/react-router";

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

export function Footer() {
  return (
    <Wrap>
      <Inner>
        <About>
          <strong>Городские бани</strong>
          <p>
            Каталог общественных бань и саун с 2012 года. Помогаем находить места для отдыха и
            парения по всей России.
          </p>
        </About>
        <Col>
          <h4>Навигация</h4>
          <ul>
            <li>
              <Link to="/">Каталог</Link>
            </li>
            <li>
              <Link to="/map">Карта</Link>
            </li>
            <li>
              <Link to="/ratings">Рейтинги</Link>
            </li>
            <li>
              <Link to="/bani-otzivy">Отзывы</Link>
            </li>
          </ul>
        </Col>
        <Col>
          <h4>Владельцам</h4>
          <ul>
            <li>
              <Link to="/companies/create">Разместить заведение</Link>
            </li>
            <li>
              <Link to="/about">Тарифы</Link>
            </li>
          </ul>
        </Col>
        <Col>
          <h4>Информация</h4>
          <ul>
            <li>
              <Link to="/about">О проекте</Link>
            </li>
            <li>
              <Link to="/about">Контакты</Link>
            </li>
          </ul>
        </Col>
      </Inner>
      <Bottom>© 2012–{new Date().getFullYear()} Городские бани</Bottom>
    </Wrap>
  );
}
