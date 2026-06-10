import React from 'react';
import { cn } from '../utils/cn';
import styles from './Button.module.css';

export type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  arrow?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
} & (
  | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'disabled'>)
  | ({ href: string }    & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>,  'style' | 'href'>)
);

// Base backgrounds — must match what tests/Button.test.jsx asserts for non-hovered state
const BASE_BG: Record<string, string> = {
  primary:   'var(--tedx-red)',
  secondary: 'var(--tedx-white)',
  ghost:     'transparent',
};

// Hover backgrounds — must match what tests/Button.test.jsx asserts after mouseEnter
// jsdom normalises #eaeaea -> rgb(234, 234, 234)
// jsdom normalises rgba(255,255,255,0.08) -> rgba(255, 255, 255, 0.08)
const HOVER_BG: Record<string, string> = {
  primary:   'var(--accent-hover)',
  secondary: '#eaeaea',
  ghost:     'rgba(255,255,255,0.08)',
};

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  arrow = false,
  style,
  children,
  ...rest
}: ButtonProps): React.ReactElement {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const isHovered = hovered && !disabled;
  const isPressed = pressed && !disabled;

  const dynamicStyle: React.CSSProperties = {
    background: isHovered ? HOVER_BG[variant] : BASE_BG[variant],
    transform:  isPressed ? 'scale(0.97)' : 'scale(1)',
    cursor:     disabled ? 'not-allowed' : 'pointer',
    opacity:    disabled ? 0.45 : 1,
    ...style,
  };

  const Tag = (rest as { href?: string }).href ? 'a' : 'button';

  if (Tag === 'a') {
    const { href, ...anchorRest } = rest as { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        href={href}
        className={cn(styles.btn, styles[variant], styles[size])}
        style={dynamicStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        {...anchorRest}
      >
        {children}
        {arrow && <span className={styles.arrow} aria-hidden="true">→</span>}
      </a>
    );
  }

  const { ...buttonRest } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type="button"
      aria-disabled={disabled}
      className={cn(styles.btn, styles[variant], styles[size])}
      style={dynamicStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      {...buttonRest}
    >
      {children}
      {arrow && <span className={styles.arrow} aria-hidden="true">→</span>}
    </button>
  );
}
