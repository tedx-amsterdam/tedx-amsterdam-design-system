import React from 'react';
import { cn } from '../utils/cn';
import styles from './SocialLink.module.css';

const ICONS: Record<string, string> = {
  linkedin: 'assets/icon-linkedin.svg',
  instagram: 'assets/icon-instagram.svg',
  youtube: 'assets/icon-youtube.svg',
};

export interface SocialLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  network: 'linkedin' | 'instagram' | 'youtube';
  label?: React.ReactNode;
  href?: string;
  /** Path prefix to the project's assets/ folder. @default "" */
  base?: string;
  style?: React.CSSProperties;
}

/** White social icon + label that reddens on hover. */
export function SocialLink({ network, label, href = '#', base = '', style, className, ...rest }: SocialLinkProps): React.ReactElement {
  const src = base + (ICONS[network] || ICONS.linkedin);
  return (
    <a
      href={href}
      className={cn(styles.link, className)}
      style={style}
      {...rest}
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className={styles.icon}
      />
      {label || network}
    </a>
  );
}
