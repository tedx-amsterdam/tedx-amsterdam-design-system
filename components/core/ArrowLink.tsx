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

/** Bold red text link with the trailing brand arrow. */
export function ArrowLink({ children, href = '#', color = 'red', style, className, ...rest }: ArrowLinkProps): React.ReactElement {
  return (
    <a
      href={href}
      className={cn(styles.link, styles[color], className)}
      style={style}
      {...rest}
    >
      {children}
      <svg width="18" height="9" viewBox="0 0 18 9" fill="none" aria-hidden="true">
        <path d="M0 4.5h15" stroke="currentColor" strokeWidth="1.6" />
        <path d="M11.5 1l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
      </svg>
    </a>
  );
}
