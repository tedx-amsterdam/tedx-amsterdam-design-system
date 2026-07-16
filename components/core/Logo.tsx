import React from 'react';
import { cn } from '../utils/cn';
import styles from './Logo.module.css';

export interface LogoProps extends React.HTMLAttributes<HTMLElement> {
  /** Wordmark colour context. @default "light-on-dark" */
  tone?: 'light-on-dark' | 'dark-on-light';
  /** Rendered width in px. @default 230 */
  width?: number;
  /** Path prefix to the project's assets/ folder. @default "" */
  base?: string;
  href?: string;
}

/** Locked-up red TEDx + Amsterdam wordmark. */
export function Logo({ tone = 'light-on-dark', width = 230, base = '', href, className, style, ...rest }: LogoProps): React.ReactElement {
  const src =
    tone === 'dark-on-light'
      ? base + 'assets/logo-tedxamsterdam.svg'
      : base + 'assets/logo-tedxamsterdam-white.png';
  const img = (
    <img
      src={src}
      alt="TEDxAmsterdam"
      className={styles.img}
      style={{ width }}
    />
  );
  return href ? (
    <a href={href} className={cn(styles.wrap, className)} style={style} {...rest}>{img}</a>
  ) : (
    <span className={cn(styles.wrap, className)} style={style} {...rest}>{img}</span>
  );
}
