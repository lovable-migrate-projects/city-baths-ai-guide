import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  body {
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.bg};
    line-height: 1.55;
    font-size: 16px;
  }
  h1, h2, h3, h4, h5 {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 .5em;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }
  p { margin: 0 0 1em; }
  a { color: ${({ theme }) => theme.colors.primary}; text-decoration: none; }
  a:hover { text-decoration: underline; }
  button { font-family: inherit; cursor: pointer; }
  img { max-width: 100%; display: block; }
  ul { padding: 0; margin: 0; list-style: none; }
`;
