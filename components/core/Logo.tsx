import React from 'react';
import { cn } from '../utils/cn';
import styles from './Logo.module.css';

// Height over width of each file, so the image gets explicit dimensions
// and the browser reserves its space before it loads.
const SOURCES = {
  'dark-on-light': { file: 'assets/logo-tedxamsterdam.svg', ratio: 24 / 245 },
  'light-on-dark': { file: 'assets/logo-tedxamsterdam-white.png', ratio: 77 / 783 },
} as const;

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
  const { file, ratio } = SOURCES[tone];
  const img = (
    <img
      src={base + file}
      alt="TEDxAmsterdam"
      width={width}
      height={Math.round(width * ratio)}
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
