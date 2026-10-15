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
  /** `md` for the footer (20px text), `sm` under a speaker portrait (16px text). @default "md" */
  size?: 'md' | 'sm';
  /** Path prefix to the project's assets/ folder. @default "" */
  base?: string;
  style?: React.CSSProperties;
}

/** White social icon + label that reddens on hover. */
export function SocialLink({ network, label, href = '#', size = 'md', base = '', style, className, ...rest }: SocialLinkProps): React.ReactElement {
  const src = base + (ICONS[network] || ICONS.linkedin);
  return (
    <a
      href={href}
      className={cn(styles.link, styles[size], className)}
      style={style}
      {...rest}
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        width={24}
        height={24}
        className={styles.icon}
      />
      {label || network}
    </a>
  );
}
