import React from 'react';
import { cn } from '../utils/cn';
import styles from './ArrowLink.module.css';

export interface ArrowLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href?: string;
  /** @default "red" */
  color?: 'red' | 'white';
  style?: React.CSSProperties;
}

/** Uppercase red text link with the trailing brand arrow. */
export function ArrowLink({ children, href = '#', color = 'red', style, className, ...rest }: ArrowLinkProps): React.ReactElement {
  return (
    <a
      href={href}
      className={cn(styles.link, styles[color], className)}
      style={style}
      {...rest}
    >
      {children}
      <svg width="29" height="8" viewBox="0 0 29 8" fill="none" aria-hidden="true">
        <path d="M0 4h22" stroke="currentColor" strokeWidth="2" />
        <path d="M21.5 0.7L29 4l-7.5 3.3z" fill="currentColor" />
      </svg>
    </a>
  );
}
