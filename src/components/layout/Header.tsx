import styled, { css } from 'styled-components'
import { Link as DefaultLink } from '@tanstack/react-router'
import {
  Flame,
  Menu,
  X,
  MapPin,
  MessageSquare,
  Star,
  Info,
  Building2,
  type LucideIcon,
} from 'lucide-react'
import {
  useCallback,
  useEffect,
  useState,
  type ComponentType,
  type ReactNode,
} from 'react'

type LinkLikeProps = {
  to: string
  className?: string
  children?: ReactNode
  onClick?: () => void
}

export type HeaderNavItem = {
  href: string
  label: string
  icon?: LucideIcon
}

export type HeaderProps = {
  /** Компонент-ссылка (по умолчанию — Link из @tanstack/react-router). */
  LinkComponent?: ComponentType<LinkLikeProps>
  /** Элементы навигации. */
  navItems?: ReadonlyArray<HeaderNavItem>
  /** Подпись бренда. */
  brandLabel?: ReactNode
  /** Адрес бренд-ссылки. */
  brandTo?: string
  /** Подпись CTA-кнопки. */
  ctaLabel?: ReactNode
  /** Адрес CTA. */
  ctaTo?: string
  /** Заголовок мобильного меню. */
  mobileMenuTitle?: ReactNode
  /** Подсказка под CTA в мобильном меню. */
  mobileCtaHint?: ReactNode
}

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: ${({ theme }) => {
    console.log('styled.header theme', theme)

    return theme.colors.bg
  }}cc;
  backdrop-filter: saturate(140%) blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Inner = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`

const Brand = styled(DefaultLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 800;
  font-size: 18px;
  &:hover {
    text-decoration: none;
  }
`

const Logo = styled.span`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.primaryGlow}
  );
  color: white;
  display: grid;
  place-items: center;
  box-shadow: ${({ theme }) => theme.shadows.glow};
`

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
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: none;
    }
  }
`

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const CTA = styled(DefaultLink)`
  display: none;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-weight: 600;
  font-size: 14px;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    text-decoration: none;
  }
  @media (min-width: ${({ theme }) => theme.bp.md}) {
    display: inline-flex;
  }
`

const Burger = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background 0.15s ease;
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
  @media (min-width: ${({ theme }) => theme.bp.md}) {
    display: none;
  }
`

const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(2px);
  z-index: 60;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.2s ease;
  @media (min-width: ${({ theme }) => theme.bp.md}) {
    display: none;
  }
`

const Drawer = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(86vw, 340px);
  background: ${({ theme }) => theme.colors.bg};
  z-index: 70;
  box-shadow: -10px 0 40px rgba(15, 23, 42, 0.18);
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform 0.28s cubic-bezier(0.32, 0.72, 0.24, 1);
  display: flex;
  flex-direction: column;
  @media (min-width: ${({ theme }) => theme.bp.md}) {
    display: none;
  }
`

const DrawerHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const DrawerTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 800;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`

const linkBase = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  font-size: 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  text-decoration: none;
  transition:
    background 0.15s ease,
    color 0.15s ease;
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
  svg {
    color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
  }
`

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px;
  flex: 1;
  overflow-y: auto;

  a {
    ${linkBase}
  }
`

const DrawerFoot = styled.div`
  padding: 16px 18px 22px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const DrawerCTA = styled(DefaultLink)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 13px 16px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-weight: 600;
  font-size: 15px;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    text-decoration: none;
  }
`

const Hint = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  margin: 0;
`

const IconBtn = styled.button`
  background: transparent;
  border: 0;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  display: grid;
  place-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSoft};
  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }
`

// eslint-disable-next-line react-refresh/only-export-components
export const DEFAULT_HEADER_NAV_ITEMS: ReadonlyArray<HeaderNavItem> = [
  { href: '/', label: 'Каталог', icon: Building2 },
  { href: '/map', label: 'Карта', icon: MapPin },
  { href: '/bani-otzivy', label: 'Отзывы', icon: MessageSquare },
  { href: '/ratings', label: 'Рейтинги', icon: Star },
  { href: '/about', label: 'О нас', icon: Info },
]

const DefaultLinkAsLike = DefaultLink as unknown as ComponentType<LinkLikeProps>

export function Header({
  LinkComponent = DefaultLinkAsLike,
  navItems = DEFAULT_HEADER_NAV_ITEMS,
  brandLabel = 'Городские бани',
  brandTo = '/',
  ctaLabel = 'Разместить заведение',
  ctaTo = '/companies/create',
  mobileMenuTitle = 'Меню',
  mobileCtaHint = 'Бесплатное размещение и продвижение',
}: HeaderProps = {}) {
  const [open, setOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setOpen((v) => !v)
  }, [])

  const closeMenu = useCallback(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <Bar>
        <Inner>
          <Brand as={LinkComponent} to={brandTo}>
            <Logo>
              <Flame size={20} />
            </Logo>
            {brandLabel}
          </Brand>
          <Nav>
            {navItems.map(({ href, label }) => (
              <LinkComponent key={href} to={href}>
                {label}
              </LinkComponent>
            ))}
          </Nav>
          <Right>
            <CTA as={LinkComponent} to={ctaTo}>
              {ctaLabel}
            </CTA>
            <Burger
              type="button"
              aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={toggleOpen}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </Burger>
          </Right>
        </Inner>
      </Bar>

      <Backdrop $open={open} onClick={closeMenu} aria-hidden="true" />

      <Drawer
        id="mobile-nav"
        $open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Главное меню"
      >
        <DrawerHead>
          <DrawerTitle>
            <Logo>
              <Flame size={18} />
            </Logo>
            {mobileMenuTitle}
          </DrawerTitle>
          <IconBtn type="button" aria-label="Закрыть меню" onClick={closeMenu}>
            <X size={20} />
          </IconBtn>
        </DrawerHead>

        <NavList>
          {navItems.map(({ href, label, icon: Icon }) => (
            <LinkComponent key={href} to={href} onClick={closeMenu}>
              {Icon ? <Icon size={18} /> : null}
              {label}
            </LinkComponent>
          ))}
        </NavList>

        <DrawerFoot>
          <DrawerCTA as={LinkComponent} to={ctaTo} onClick={closeMenu}>
            {ctaLabel}
          </DrawerCTA>
          <Hint>{mobileCtaHint}</Hint>
        </DrawerFoot>
      </Drawer>
    </>
  )
}
