import React from 'react';
import { cn } from '../utils/cn';
import styles from './NavigationBar.module.css';

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavigationBarProps extends React.HTMLAttributes<HTMLElement> {
  links?: NavLink[];
  /** CTA button label. */
  ctaLabel?: string;
  /** CTA button destination. */
  ctaHref?: string;
  /** Logo link destination. @default "/" */
  logoHref?: string;
  /** Marks the matching link as active (`aria-current="page"`). */
  activePath?: string;
  /** Asset path prefix. Use `"../../"` from nested HTML files. @default "" */
  base?: string;
  /** href for the skip-to-content link. @default "#main-content" */
  skipTarget?: string;
}

/**
 * TEDxAmsterdam — NavigationBar
 * Sticky top bar: logo left, nav links centre, CTA button right.
 * Responsive layout via CSS Modules (no window.innerWidth, SSR-safe).
 * Includes skip-to-content link (WCAG 2.4.1).
 * Pass `base` to resolve asset paths from nested HTML files.
 * Pass `skipTarget` to override skip link destination (default "#main-content").
 */
export function NavigationBar({
  links = [],
  ctaLabel,
  ctaHref,
  logoHref = '/',
  activePath,
  base = '',
  skipTarget = '#main-content',
  className,
  style,
  ...rest
}: NavigationBarProps): React.ReactElement {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuId = `nav-mobile-menu-${React.useId()}`;
  const hamburgerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const logoSrc = base + 'assets/logo-tedxamsterdam-white.png';

  return (
    <header {...rest} className={cn(styles.header, className)} style={style}>
      <a href={skipTarget} className={styles.skipLink}>
        Skip to main content
      </a>

      <div className={styles.bar}>
        <a href={logoHref} className={styles.logoLink}>
          <img src={logoSrc} alt="TEDxAmsterdam" className={styles.logoImg} />
        </a>

        {/* Desktop nav — hidden on mobile via CSS Modules media query */}
        <div className={styles.desktopNav}>
          <nav aria-label="Main navigation" className={styles.navLinks}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={activePath === link.href ? 'page' : undefined}
                className={cn(styles.navLink, activePath === link.href && styles.active)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          {ctaHref && ctaLabel && (
            <a href={ctaHref} className={styles.ctaLink}>
              {ctaLabel}
            </a>
          )}
        </div>

        {/* Hamburger — hidden on desktop via CSS Modules media query */}
        <button
          ref={hamburgerRef}
          type="button"
          className={styles.hamburger}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg aria-hidden="true" width="24" height="18" viewBox="0 0 24 18" fill="none">
            {menuOpen ? (
              <>
                <line x1="2" y1="2" x2="22" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="22" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="0" y1="2" x2="24" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="0" y1="9" x2="24" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="0" y1="16" x2="24" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div id={menuId} className={styles.mobileMenu}>
          <nav aria-label="Mobile navigation">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={activePath === link.href ? 'page' : undefined}
                className={cn(styles.navLink, styles.mobileLink, activePath === link.href && styles.active)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          {ctaHref && ctaLabel && (
            <a
              href={ctaHref}
              onClick={() => setMenuOpen(false)}
              className={cn(styles.ctaLink, styles.mobileCta)}
            >
              {ctaLabel}
            </a>
          )}
        </div>
      )}
    </header>
  );
}
