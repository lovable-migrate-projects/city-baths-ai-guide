import styled from "styled-components";
import { Header } from "./Header";
import { Footer } from "./Footer";
import type { ReactNode } from "react";

const Main = styled.main`
  min-height: calc(100vh - 200px);
`;

const Hero = styled.section`
  background:
    radial-gradient(800px 320px at 80% -10%, ${({ theme }) => theme.colors.accent}, transparent 60%),
    ${({ theme }) => theme.colors.bg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const HeroInner = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 48px 20px 32px;
  h1 {
    font-size: clamp(26px, 3.6vw, 38px);
    margin-bottom: 10px;
  }
  p {
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: 16px;
    max-width: 720px;
    margin: 0;
  }
`;

const Body = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 32px 20px 64px;
`;

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  fullWidth?: boolean;
};

export function PageShell({ title, subtitle, children, fullWidth }: Props) {
  return (
    <>
      <Header />
      <Main>
        <Hero>
          <HeroInner>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </HeroInner>
        </Hero>
        {fullWidth ? children : <Body>{children}</Body>}
      </Main>
      <Footer />
    </>
  );
}
