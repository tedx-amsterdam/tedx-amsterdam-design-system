import React from 'react';
import { cn } from '../utils/cn';
import styles from './Button.module.css';

export type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  arrow?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
} & (
  | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>)
  | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)
);

/**
 * Brand button. All visual states (hover, active, disabled) live in CSS via tokens.
 * Disabled uses `aria-disabled` and gates clicks; a disabled link drops its href.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  arrow = false,
  className,
  style,
  children,
  ...rest
}: ButtonProps): React.ReactElement {
  const classes = cn(styles.btn, styles[variant], styles[size], disabled && styles.disabled, className);

  const handleClick: React.MouseEventHandler<HTMLElement> = (e) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    (rest as { onClick?: React.MouseEventHandler<HTMLElement> }).onClick?.(e);
  };

  const content = (
    <>
      {children}
      {arrow && <span className={styles.arrow} aria-hidden="true">→</span>}
    </>
  );

  if ((rest as { href?: string }).href !== undefined) {
    const { href, ...anchorRest } = rest as { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        {...anchorRest}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        className={classes}
        style={style}
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      {...buttonRest}
      type={buttonRest.type ?? 'button'}
      aria-disabled={disabled || undefined}
      className={classes}
      style={style}
      onClick={handleClick}
    >
      {content}
    </button>
  );
}
